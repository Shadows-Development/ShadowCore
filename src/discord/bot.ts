import {
  Client,
  ClientEvents,
  GatewayIntentBits,
} from "discord.js";
import { CommandManager } from "./command/commandManager";
import { EventManager } from "./event/eventManager";
import { ButtonManager } from "./button/buttonManager";
import { MenuManager } from "./menu/menuManager";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import { Command } from "./command";
import { Event } from "./event";
import { Button } from "./button";
import { Menu } from "./menu";
import { importFile } from "./util";

export class Bot {
  private client: Client;
  private debug: boolean;
  private commandManager: CommandManager;
  private eventManager: EventManager;
  private buttonManager: ButtonManager;
  private menuManager: MenuManager;

  constructor(token: string, intents: GatewayIntentBits[], debug = false) {
    this.client = new Client({
      intents,
    });
    this.debug = debug;
    this.commandManager = new CommandManager(this.client);
    this.eventManager = new EventManager(this.client);
    this.buttonManager = new ButtonManager(this.client);
    this.menuManager = new MenuManager(this.client);
    this.registerEvents().then(() => {
      this.client.login(token).then(async () => {
        await this.registerModules();
        ButtonManager.LogAllButtons();
      });
    });
  }
  
  private async registerModules() {
    if (this.debug) console.log("🔍 Registering modules...");

    await this.registerCommands();
    await this.registerButtons();
    await this.registerMenus();

    if (this.debug) console.log("✅ All modules registered.");
  }

  private async registerCommands() {
    if (this.debug) console.log("🔍 Scanning for commands...");

    const baseDir = process.cwd();

    // Detect if running from `src/commands` (development) or `dist/commands` (production)
    const isDev = fs.existsSync(path.join(baseDir, "src/commands"));
    const commandsDir = isDev ? "src/commands" : "dist/commands";

    if (this.debug) console.log("🟢 Using commands directory:", commandsDir);

    // Automatically use `.ts` in dev, `.js` in production
    const ext = isDev ? "ts" : "js";
    const commandFiles = await glob(`**/*.${ext}`, {
      cwd: path.join(baseDir, commandsDir),
      absolute: true,
    });

    if (this.debug) console.log("🔍 Found command files:", commandFiles);

    if (commandFiles.length === 0) {
      console.warn("⚠️ No command files found. Check your folder structure.");
    }

    // Use forEach with async handling
    commandFiles.forEach(async (filePath) => {
      try {
        const command: Command = await importFile(filePath);
        if (!command?.name) return;

        this.commandManager.registerCommand(command);

        if (this.debug) console.log(`✅ Registered command: ${command.name}`);
      } catch (err) {
        console.error(`❌ Error loading command at ${filePath}:`, err);
      }
    });

    if (this.debug) {
      console.log(
        `✅ Successfully loaded ${
          CommandManager.getAllCommands().size
        } commands.`
      );
    }
  }

  private async registerEvents() {
    if (this.debug) console.log("🔍 Scanning for events...");

    const baseDir = process.cwd();

    // Detect if running from `src/events` (development) or `dist/events` (production)
    const isDev = fs.existsSync(path.join(baseDir, "src/events"));
    const eventsDir = isDev ? "src/events" : "dist/events";

    if (this.debug) console.log("🟢 Using Events directory:", eventsDir);

    // Automatically use `.ts` in dev, `.js` in production
    const ext = isDev ? "ts" : "js";
    const eventFiles = await glob(`**/*.${ext}`, {
      cwd: path.join(baseDir, eventsDir),
      absolute: true,
    });

    for (const filePath of eventFiles) {
      try {
        const event: Event<keyof ClientEvents> = await importFile(
          filePath
        );
        if (!event || !event.event || typeof event.run !== "function") {
          console.warn(`⚠️ Skipping invalid event file: ${filePath}`);
          continue;
        }

        if (event.once) {
          this.client.once(event.event, (...args) => {
            event.run(...args);
          });
        } else {
          this.client.on(event.event, (...args) => event.run(...args));
        }
      } catch (err) {
        console.error(`❌ Error loading event at ${filePath}:`, err);
      }
    }

    if (this.debug) console.log("✅ Events registered.");
  }

  private async registerButtons() {
    if (this.debug) console.log("🔍 Scanning for buttons...");
    const baseDir = process.cwd();

    // Detect if running from `src/commands` (development) or `dist/commands` (production)
    const isDev = fs.existsSync(path.join(baseDir, "src/buttons"));
    const buttonsDir = isDev ? "src/buttons" : "dist/buttons";
    const ext = isDev ? "ts" : "js";
    const buttonFiles = await glob(`**/*.${ext}`, {
      cwd: path.join(baseDir, buttonsDir),
      absolute: true,
    });
    for (const filePath of buttonFiles) {
      try {
        const button: Button = await importFile(filePath);
        console.log(button);
        this.buttonManager.registerButton(button);
      } catch (err) {
        console.error(`❌ Error loading button at ${filePath}:`, err);
      }
    }

    if (this.debug) console.log("✅ Buttons registered.");
  }

  private async registerMenus() {
    if (this.debug) console.log("🔍 Scanning for select menus...");
    const baseDir = process.cwd();

    // Detect if running from `src/commands` (development) or `dist/commands` (production)
    const isDev = fs.existsSync(path.join(baseDir, "src/menus"));
    const menuDir = isDev ? "src/menus" : "dist/menus";

    if (this.debug) console.log("🟢 Using menus directory:", menuDir);

    // Automatically use `.ts` in dev, `.js` in production
    const ext = isDev ? "ts" : "js";
    const menuFiles = await glob(`**/*.${ext}`, {
      cwd: path.join(baseDir, menuDir),
      absolute: true,
    });
    for (const filePath of menuFiles) {
      try {
        const menu: Menu = await importFile(filePath);
        this.menuManager.registerMenu(menu);
      } catch (err) {
        console.error(`❌ Error loading menu at ${filePath}:`, err);
      }
    }

    if (this.debug) console.log("✅ Select menus registered.");
  }

  getCommandManager() {
    return this.commandManager;
  }
  getEventManager() {
    return this.eventManager;
  }
  getButtonManager() {
    return this.buttonManager;
  }
  getMenuManager() {
    return this.menuManager;
  }
  getClient() {
    return this.client;
  }
}
