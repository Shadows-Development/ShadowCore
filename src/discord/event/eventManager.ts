import { Client, CommandInteractionOptionResolver, Interaction } from "discord.js";
import { Event } from "./event";
import { CommandManager } from "../command/commandManager";
import { ButtonManager } from "../button/buttonManager";
import { MenuManager } from "../menu/menuManager";

export class EventManager {
    private client: Client;
    private buttonManager: ButtonManager;
    private menuManager: MenuManager;

    constructor(client: Client) {
        this.client = client;
        this.buttonManager = new ButtonManager(client);
        this.menuManager = new MenuManager(client);

        this.client.on("interactionCreate", async (interaction: Interaction) => {
            if (interaction.isChatInputCommand()) {
                console.log(`🔍 Received command: ${interaction.commandName}`);
                console.log("📋 Currently registered commands:", Array.from(CommandManager.getAllCommands().keys()));

                const command = CommandManager.getAllCommands().get(interaction.commandName);

                if (!command) {
                    console.log(`❌ Command "${interaction.commandName}" not found in command manager.`);
                    return await interaction.reply({ content: "Command not found!", ephemeral: true });
                }

                try {
                    await command.middleware(interaction, this.client, interaction.options as CommandInteractionOptionResolver, command)
                } catch (error) {
                    console.error(`❌ Error executing command "${interaction.commandName}":`, error);
                    await interaction.reply({ content: "An error occurred while executing this command.", ephemeral: true });
                }
            } 
            else if (interaction.isButton()) {
                await this.buttonManager.handleInteraction(interaction);
            } 
            else if (interaction.isStringSelectMenu()) {
                await this.menuManager.handleInteraction(interaction);
            }
        });
    }

    registerEvent(event: Event<any>) {
        this.client.on(event.event, event.run);
    }
}
