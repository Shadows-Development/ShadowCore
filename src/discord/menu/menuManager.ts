import { Client, StringSelectMenuInteraction } from "discord.js";
import { Menu } from "./menu";

export class MenuManager {
    private client: Client;
    private menus: Map<string, Menu>;

    constructor(client: Client) {
        this.client = client;
        this.menus = new Map();
    }

    registerMenu(menu: Menu) {
        this.menus.set(menu.customId, menu);
    }

    async handleInteraction(interaction: StringSelectMenuInteraction) {
        const menu = this.menus.get(interaction.customId);
        if (menu) {
            await menu.run(interaction, this.client);
        }
    }
}
