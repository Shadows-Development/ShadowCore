import { StringSelectMenuInteraction, Client } from "discord.js";

export interface MenuOptions {
    customId: string;
    run: (interaction: StringSelectMenuInteraction, client: Client) => Promise<void>;
}

export class Menu {
    customId: string;
    run: (interaction: StringSelectMenuInteraction, client: Client) => Promise<void>;

    constructor(options: MenuOptions) {
        this.customId = options.customId;
        this.run = options.run;
    }
}
