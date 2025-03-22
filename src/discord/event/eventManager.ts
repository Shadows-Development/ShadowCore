import { Client, CommandInteractionOptionResolver, Interaction, MessageFlags } from "discord.js";
import { Event } from "./event";
import { CommandManager } from "../command/commandManager";
import { ButtonManager } from "../button/buttonManager";
import { MenuManager } from "../menu/menuManager";
import { Middleware } from "../middleware";

export class EventManager {
    private client: Client;
    private buttonManager: ButtonManager;
    private menuManager: MenuManager;
    private customInteractionHandler?: (interaction: Interaction) => Promise<void>;

    constructor(client: Client) {
        this.client = client;
        this.buttonManager = new ButtonManager(client);
        this.menuManager = new MenuManager(client);

        this.client.on("interactionCreate", async (interaction: Interaction) => {
            const middleware = await Middleware.loadAllMiddleware();
            if (interaction.isChatInputCommand()) {

                const command = CommandManager.getAllCommands().get(interaction.commandName);

                if (!command) {
                    console.log(`❌ Command "${interaction.commandName}" not found in command manager.`);
                    return await interaction.reply({ content: "Command not found!", flags: [MessageFlags.Ephemeral] });
                }

                const commandName = interaction.commandName;
                const commandMiddleware = middleware.commandMiddleware;
                try {
                    const globalMiddleware = commandMiddleware.get('global');
                    if(globalMiddleware) {
                        const proceed = await globalMiddleware.beforeExecution(interaction, command);
                        if(!proceed) return;
                    }

                    const specificMiddleware = commandMiddleware.get(commandName);
                    if (specificMiddleware) {
                        const proceed = await specificMiddleware.beforeExecution(interaction, command);
                        if(!proceed) return;
                    }
                    await command.middleware(interaction, this.client, interaction.options as CommandInteractionOptionResolver, command)

                    if(specificMiddleware) {
                        await specificMiddleware.afterExecution(interaction, command);
                    }

                    if(globalMiddleware) {
                        await globalMiddleware.afterExecution(interaction, command);
                    }
                } catch (error) {
                    console.error(`❌ Error executing command "${interaction.commandName}":`, error);
                    await interaction.reply({ content: "An error occurred while executing this command.", flags: [MessageFlags.Ephemeral] });
                }
            } 
            else if (interaction.isButton()) {
                await this.buttonManager.handleInteraction(interaction);
            } 
            else if (interaction.isStringSelectMenu()) {
                await this.menuManager.handleInteraction(interaction);
            }

            if (this.customInteractionHandler) {
                await this.customInteractionHandler(interaction);
            }
        });
    }

    public setCustomInteractionHandler(handler: (interaction: Interaction) => Promise<void>) {
        this.customInteractionHandler = handler;
    }
}
