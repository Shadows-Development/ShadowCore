import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../command";

export interface CommandMiddleware {
    beforeExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<boolean>;
    afterExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<void>;
}