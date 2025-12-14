import fs from "fs";
import path from "path";
import { glob } from "glob";
import {importFile, registerModule} from "../util";
import { Bot } from "../bot";
import { Plugin, metadata } from "./plugin";
import {Command} from "../command";
import {Button} from "../button";
import {Menu} from "../menu";

export class PluginLoader {
  private baseDir: string;
  private pluginDir: string;
  private ext: "ts" | "js";
  private debug: boolean;
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
    this.baseDir = process.cwd();
    this.debug = bot.debug;
    const isDev = fs.existsSync(path.join(this.baseDir, "src/plugins"));
    this.pluginDir = isDev ? "src/plugins" : "dist/plugins";
    this.ext = isDev ? "ts" : "js";

    if (this.debug) {
      console.log("🟢 PluginLoader initialized.");
      console.log("🗂 Plugin directory:", this.pluginDir);
    }
  }

  public async registerPlugins() {
    if (this.debug) console.log("🔍 Scanning for plugins...");

    const pluginFiles = await glob(`*/index.${this.ext}`, {
      cwd: path.join(this.baseDir, this.pluginDir),
      absolute: true,
    });

    for (const filePath of pluginFiles) {
      const pluginDirPath = path.dirname(filePath);
      const pluginJsonPath = path.join(pluginDirPath, "plugin.json");

      let meta: metadata = {} as metadata;

      if (fs.existsSync(pluginJsonPath)) {
        try {
          const raw = fs.readFileSync(pluginJsonPath, "utf-8");
          meta = JSON.parse(raw);
        } catch (err) {
          console.warn(`⚠️ Failed to parse plugin.json in ${pluginDirPath}`, err);
        }
      }

      try {
        const pluginModule: Plugin = await importFile(filePath);

        if (pluginModule?.register) {
          pluginModule.metadata = meta;
          await registerModule<Command>(`plugins/${filePath}/commands`, this.bot.getCommandManager(), this.bot.client, this.bot.debug);
          await registerModule<Button>(`plugins/${filePath}/buttons`, this.bot.getButtonManager(), this.bot.client, this.bot.debug);
          await registerModule<Menu>(`plugins/${filePath}/menus`, this.bot.getMenuManager(), this.bot.client, this.bot.debug);
          pluginModule.register(this.bot.client);

          if (this.debug) {
            console.log(`✅ Loaded plugin: ${meta.name ?? filePath}`);
          }
        } else {
          console.warn(`⚠️ Skipped plugin at ${filePath} — no register() found`);
        }
      } catch (err) {
        console.error(`❌ Error loading plugin at ${filePath}:`, err);
      }
    }

    if (this.debug) console.log("✅ Plugin registration complete.");
  }
}
