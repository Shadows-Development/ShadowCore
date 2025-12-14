import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../command";

export interface ICommandMiddleware {
    name: string;
    beforeExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<boolean>;
    afterExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<void>;
}

export class CommandMiddleware {
    name: string;
    beforeExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<boolean>;
    afterExecution: (interaction: ChatInputCommandInteraction, command: Command) => Promise<void>;

    constructor(options: ICommandMiddleware) {
        this.name = options.name;
        this.beforeExecution = options.beforeExecution;
        this.afterExecution = options.afterExecution;
    }
}

