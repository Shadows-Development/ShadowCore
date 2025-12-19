import {
  Client,
  ClientEvents,
  GatewayIntentsString,
} from "discord.js";
import { CommandManager } from "./command";
import { EventManager } from "./event";
import { ButtonManager } from "./button";
import { MenuManager } from "./menu";
import { Command } from "./command";
import { Event } from "./event";
import { Button } from "./button";
import { Menu } from "./menu";
import { PluginLoader } from "./plugin";
import {registerModule} from "./util";

export class Bot {
  public client: Client;
  public debug: boolean;
  private readonly commandManager: CommandManager;
  private eventManager: EventManager;
  private buttonManager: ButtonManager;
  private menuManager: MenuManager;
  private pluginLoader: PluginLoader;

  private guildId?: string;

  constructor(token: string, intents: GatewayIntentsString[], debug = false, guildId?: string) {
    this.client = new Client({
      intents,
    });
    this.debug = debug;
    this.commandManager = new CommandManager(this.client, this);
    this.eventManager = new EventManager(this.client);
    this.buttonManager = new ButtonManager(this.client);
    this.menuManager = new MenuManager(this.client);
    this.pluginLoader = new PluginLoader(this);
    this.guildId = guildId;
    registerModule<Event<keyof ClientEvents>>("events", this.eventManager, this.client, this.debug).then(() => {
        this.client.login(token).then(async () => {
            await this.registerModules();
        });
    });
  }
  
  private async registerModules() {
    if (this.debug) console.log("🔍 Registering modules...");

    await this.pluginLoader.registerPlugins();
    await registerModule<Command>("commands", this.commandManager, this.client, this.debug);
    await registerModule<Button>("buttons", this.buttonManager, this.client, this.debug);
    await registerModule<Menu>("menus", this.menuManager, this.client, this.debug);

    await this.commandManager.registerCommands(this.guildId);
    console.log(`✅ Successfully loaded ${CommandManager.getAllCommands().size} commands, ${ButtonManager.getAllButtons().size} buttons, ${MenuManager.getAllMenus().size} menus.`)

    if (this.debug) console.log("✅ All modules registered.");
  }

    getCommandManager() {
        return this.commandManager;
    }
    getEventManager() {
        return this.eventManager;
    }
    getButtonManager() {
        return this.buttonManager;
    }
    getMenuManager() {
        return this.menuManager;
    }
    getClient() {
        return this.client;
    }
}