import path from "node:path";
import fs from "fs";
import { glob } from "glob";
import { CommandMiddleware } from "./interface";
import { importFile } from "../util";

export class Middleware {
    private static commandSpecificMiddleware: Map<string, CommandMiddleware> = new Map();
  
    // Public method to load all middleware
    public static async loadAllMiddleware() {
      // Load middleware if not loaded yet
      if (this.commandSpecificMiddleware.size === 0) {
        await this.loadCommandMiddleware();
      }
      return { commandMiddleware: this.commandSpecificMiddleware };
    }
  
    private static async loadCommandMiddleware() {
      const baseDir = process.cwd();
      const isDev = fs.existsSync(path.join(baseDir, "src", "middleware", "command"));
      const commandMiddlewareFolder = isDev
        ? path.join(baseDir, "src", "middleware", "command")
        : path.join(baseDir, "dist", "middleware", "command");
  
      console.log("BASE DIR: " + commandMiddlewareFolder);
  
      const ext = isDev ? "ts" : "js";
      const commandFiles = await glob(`**/*.${ext}`, {
        cwd: commandMiddlewareFolder,
        absolute: true,
      });
  
      console.log("🔍 Found command middleware files:", commandFiles);
  
      // Handle global middleware
      await this.loadGlobalMiddleware(commandMiddlewareFolder, ext);
  
      // Process each middleware file
      await Promise.all(
        commandFiles.map(async (file) => {
          try {
            console.log(`Importing middleware from: ${file}`);
            const middleware = await importFile(file);
            if (middleware) {
              const commandName = path.basename(file, `.${ext}`);
              this.commandSpecificMiddleware.set(commandName, middleware);
              console.log(`✅ Registered middleware: ${commandName}`);
            }
          } catch (err) {
            console.error(`❌ Error importing file: ${file}`, err);
          }
        })
      );
  
      console.log("✅ Loaded all command middleware.");
    }
  
    private static async loadGlobalMiddleware(commandMiddlewareFolder: string, ext: string) {
      const globalMiddlewarePath = path.join(commandMiddlewareFolder, `global.${ext}`);
      if (fs.existsSync(globalMiddlewarePath)) {
        const globalMiddleware = await importFile(globalMiddlewarePath);
        const instance = new globalMiddleware.default();
        console.log("Global Middleware Imported:", globalMiddleware.beforeExecution);
        if (globalMiddleware) {
          this.commandSpecificMiddleware.set("global", instance);
        }
      }
    }
  }
