import { Client, StringSelectMenuInteraction } from "discord.js";
import { Menu } from "./menu";
import { splitSpecialId } from "../util";

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
    // const menu = MenuManager.menus.get(interaction.customId);
    let menu: Menu | undefined;
    if (interaction.customId.includes(":")) {
      const parsedId = splitSpecialId(interaction.customId);
      const newId = `${parsedId.feature}:${parsedId.action}:{id}`;
      menu = MenuManager.menus.get(newId);
    } else {
      menu = MenuManager.menus.get(interaction.customId);
    }
    if (menu) {
      await menu.run(interaction, this.client);
    }
  }
    static getAllMenus(): Map<string, Menu> {
        return MenuManager.menus; // Provide a method to access all commands if needed
    }
}
