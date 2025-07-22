import fs from "fs";
import path from "path";
import {glob} from "glob";
import { importFile } from "./";
import {Client} from "discord.js";


export async function registerModule<T>(directory: string, manager: any, client: undefined): Promise<void> {
    if (this.debug) console.log(`🔍 Scanning for ${directory}...`);

    const baseDir = process.cwd();

    const isDev = fs.existsSync(path.join(baseDir, `src/${directory}`));
    const dir = isDev ? `src/${directory}` : `dist/${directory}`;

    if (this.debug) console.log(`🟢 Using ${directory} directory:`, dir);

    const ext = isDev ? "ts" : "js";
    const files = await glob(`**/*.${ext}`, {
        cwd: path.join(baseDir, dir),
        absolute: true,
    });

    if (this.debug) console.log(`🔍 Found ${directory} files:`, files);

    if (files.length === 0) {
        console.warn(`⚠️ No ${directory} files found. Check your folder structure.`);
    }

    for (const filePath of files) {
        try {
            const module: T = await importFile(filePath);
            if(!module.name || !module.event || !module.customId) return;

            if(module.name) {
               manager.registerCommand(module);
               if (this.debug) console.log(`✅ Registered command: ${module.name}`);
            } else if (module.event) {
                if (!module || !module.event || typeof module.run !== "function") {
                    return console.warn(`⚠️ Skipping invalid event file: ${filePath}`);
                }
                if (module.once) {
                    client.once(module.event, (...args) => {
                        module.run(...args);
                    });
                } else {
                    client.on(module.event, (...args) => module.run(...args));
                }
            } else if (module.customId) {
                if (directory == "buttons") {
                    manager.registerButton(module);
                } else if (directory == "menus") {
                    manager.registerMenu(module);
                }
            }

        } catch (error) {

        }
    }
}