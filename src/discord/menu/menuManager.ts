import { Client, StringSelectMenuInteraction } from "discord.js";
import { Menu } from "./menu";

export class MenuManager {
    private client: Client;
    private static menus: Map<string, Menu> = new Map();

    constructor(client: Client) {
        this.client = client;
    }

    registerMenu(menu: Menu) {
        MenuManager.menus.set(menu.customId, menu);
    }

    async handleInteraction(interaction: StringSelectMenuInteraction) {
        const menu = MenuManager.menus.get(interaction.customId);
        if (menu) {
            await menu.run(interaction, this.client);
        }
    }
}
