import { Client, ButtonInteraction } from "discord.js";
import { Button } from "./button";
import { splitSpecialId } from "../util";

export class ButtonManager {
  private client: Client;
  private static buttons: Map<string, Button> = new Map();

  constructor(client: Client) {
    this.client = client;
  }

  registerButton(button: Button) {
    ButtonManager.buttons.set(button.customId, button);
  }

  async handleInteraction(interaction: ButtonInteraction) {
    let button: Button | undefined;
    if (interaction.customId.includes(":")) {
      const parsedId = splitSpecialId(interaction.customId);
      const newId = `${parsedId.feature}:${parsedId.action}:{id}`;
      button = ButtonManager.buttons.get(newId);
    } else {
      button = ButtonManager.buttons.get(interaction.customId);
    }
    if (button) {
      await button.run(interaction, this.client);
    }
  }

  static getAllButtons(): Map<string, Button> {
      return ButtonManager.buttons;
  }
}
