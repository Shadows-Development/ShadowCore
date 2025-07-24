import { Client, ApplicationCommandDataResolvable } from "discord.js";
import { Command } from "./command";

export class CommandManager {
    private client: Client;
    private static commands: Map<string, Command> = new Map(); // Store commands globally

    constructor(client: Client) {
        this.client = client;
    }

    async registerCommand(command: Command) {
        CommandManager.commands.set(command.name, command);
    }

    getCommand(commandName: string): Command | undefined {
        return CommandManager.commands.get(commandName);
    }

    async registerCommands(guildId?: string) {
        const commandsArray: ApplicationCommandDataResolvable[] = Array.from(CommandManager.commands.values());

        if (commandsArray.length === 0) {
            console.log("⚠️ No commands have been registered.");
            return;
        }

        const commandNames = commandsArray.map(cmd => (cmd as { name: string }).name);
        // console.log("🔍 Registering commands:", commandNames);

        if (guildId) {
            const guild = this.client.guilds.cache.get(guildId);
            if (guild) {
                await guild.commands.set(commandsArray);
                console.log(`✅ Commands registered for Guild: ${guildId}`);
            } else {
                console.log(`⚠️ Guild ${guildId} not found.`);
            }
        } else {
            await this.client.application?.commands.set(commandsArray);
            console.log("✅ Commands registered globally.");
        }
    }

    static getAllCommands(): Map<string, Command> {
        return CommandManager.commands; // Provide a method to access all commands if needed
    }
}
