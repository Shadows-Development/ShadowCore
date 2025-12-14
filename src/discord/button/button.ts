import { ButtonInteraction, Client } from "discord.js";

export interface ButtonOptions {
    customId: string;
    run: (interaction: ButtonInteraction, client: Client) => Promise<void>;
}

export class Button {
    customId: string;
    run: (interaction: ButtonInteraction, client: Client) => Promise<void>;

    constructor(options: ButtonOptions) {
        this.customId = options.customId;
        this.run = options.run;
    }
}
