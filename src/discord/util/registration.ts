import fs from "fs";
import path from "path";
import {glob} from "glob";
import { importFile } from "./";
import {Client} from "discord.js";

type BaseModule = Partial<{
    name: string;
    description: string;
    event: string;
    once: boolean;
    customId: string;
    run: (...args: any[]) => void;
}>

export async function registerModule<T extends BaseModule>(directory: string, manager: any, client: Client, debug: boolean): Promise<void> {
    if (debug) console.log(`🔍 Scanning for ${directory}...`);

    const baseDir = process.cwd();

    const isDev = fs.existsSync(path.join(baseDir, `src/${directory}`));
    const dir = isDev ? `src/${directory}` : `dist/${directory}`;

    if (debug) console.log(`🟢 Using ${directory} directory:`, dir);

    const ext = isDev ? "ts" : "js";
    const files = await glob(`**/*.${ext}`, {
        cwd: path.join(baseDir, dir),
        absolute: true,
    });

    if (debug) console.log(`🔍 Found ${directory} files:`, files);

    if (files.length === 0) {
        console.warn(`⚠️ No ${directory} files found. Check your folder structure.`);
    }

    for (const filePath of files) {
        try {
            const module: T = await importFile(filePath);
            if (!module.name && !module.event && !module.customId) {
                if (debug) console.warn(`⚠️ Skipping unknown module: ${filePath}`);
                continue;
            }
            if(module.name) {
               await manager.registerCommand(module);
               if (debug) console.log(`✅ Registered command: ${module.name}`);
            } else if (module.event) {
                if (!module.event || typeof module.run !== "function") {
                    console.warn(`⚠️ Skipping invalid event module: ${filePath}`);
                    continue;
                }

                const runHandler = module.run;
                const eventName = module.event;

                if (module.once) {
                    client.once(eventName, (...args) => {
                        runHandler(...args);
                    });
                } else {
                    client.on(eventName, (...args) => runHandler(...args));
                }
            } else if (module.customId) {
                if (directory == "buttons") {
                    manager.registerButton(module);
                } else if (directory == "menus") {
                    manager.registerMenu(module);
                }
            }

        } catch (error) {
            console.error(`❌ Error loading ${filePath}:`, error instanceof Error ? error.message : error);
            if (debug) console.error(error);
        }
    }
}