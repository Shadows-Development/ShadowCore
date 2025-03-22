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

    const ext = isDev ? "ts" : "js";
    const commandFiles = await glob(`**/*.${ext}`, {
      cwd: commandMiddlewareFolder,
      absolute: true,
    });


    // Handle global middleware
    await this.loadGlobalMiddleware(commandMiddlewareFolder, ext);

    // Process each middleware file
    await Promise.all(
      commandFiles.map(async (file) => {
        try {
          const middleware = await importFile(file); // Import the middleware instance directly
          if (middleware) {
            const commandName = path.basename(file, `.${ext}`);
            this.commandSpecificMiddleware.set(commandName, middleware); // Store the instance
          }
        } catch (err) {
          console.error(`❌ Error importing file: ${file}`, err);
        }
      })
    );

  }

  private static async loadGlobalMiddleware(commandMiddlewareFolder: string, ext: string) {
    const globalMiddlewarePath = path.join(commandMiddlewareFolder, `global.${ext}`);

    // Check if the global middleware file exists
    if (fs.existsSync(globalMiddlewarePath)) {
      const globalMiddlewareInstance = await importFile(globalMiddlewarePath); // Import the instance directly
      if (globalMiddlewareInstance) {
        // Store the instance in the middleware map
        this.commandSpecificMiddleware.set("global", globalMiddlewareInstance);
      }
    }
  }
}

