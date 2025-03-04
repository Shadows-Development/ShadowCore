import { Client, ButtonInteraction } from "discord.js";
import { Button } from "./button";
import { splitSpecialId } from "../util";

export class ButtonManager {
  private client: Client;
  private buttons: Map<string, Button>;

  constructor(client: Client) {
    this.client = client;
    this.buttons = new Map();
  }

  registerButton(button: Button) {
    this.buttons.set(button.customId, button);
  }

  async handleInteraction(interaction: ButtonInteraction) {
    let button: Button | undefined;
    if (interaction.customId.includes(":")) {
      const parsedId = splitSpecialId(interaction.customId);
      const newId = `${parsedId.feature}:${parsedId.action}:{id}`;
      button = this.buttons.get(newId);
    } else {
      button = this.buttons.get(interaction.customId);
    }
    if (button) {
      await button.run(interaction, this.client);
    }
  }
}
