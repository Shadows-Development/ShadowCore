import { Client, IntentsBitField } from "discord.js";
import { CommandManager } from "./command/commandManager";
import { EventManager } from "./event/eventManager";
import { ButtonManager } from "./button/buttonManager";
import { MenuManager } from "./menu/menuManager";
import { LokiLogger } from "../utils";
import { LokiConfig } from "../types/logger";

export class Bot {
    private client: Client;
    private logger: LokiLogger
    private commandManager: CommandManager;
    private eventManager: EventManager;
    private buttonManager: ButtonManager;
    private menuManager: MenuManager;

    constructor(token: string, logConfig: LokiConfig) {
        this.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent
            ],
        });

        this.logger = new LokiLogger(logConfig);
        this.commandManager = new CommandManager(this.client);
        this.eventManager = new EventManager(this.client);
        this.buttonManager = new ButtonManager(this.client);
        this.menuManager = new MenuManager(this.client);
        this.client.login(token);
    }

    getCommandManager() { return this.commandManager; }
    getEventManager() { return this.eventManager; }
    getButtonManager() { return this.buttonManager; }
    getMenuManager() { return this.menuManager; }
    getLogger() { return this.logger; }
    getClient() { return this.client; }
}
