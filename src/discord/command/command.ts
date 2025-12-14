import {
  ChatInputCommandInteraction,
  Client,
  RoleResolvable,
  PermissionsBitField,
  CommandInteractionOptionResolver,
  MessageFlags,
  ChatInputApplicationCommandData
} from "discord.js";
import { checkCooldown, isBotOwner } from "../util";

export type CommandOptions = {
  name: string;
  description: string;
  roles?: RoleResolvable[];
  permissions?: PermissionsBitField[];
  ownerOnly?: boolean;
  run: (
    interaction: ChatInputCommandInteraction,
    client: Client,
    args: CommandInteractionOptionResolver
  ) => Promise<void>;
} & ChatInputApplicationCommandData

export class Command {
  name: string;
  description: string;
  roles?: RoleResolvable[];
  permissions?: PermissionsBitField[];
  options?: ChatInputApplicationCommandData["options"];
  ownerOnly?: boolean;
  run: (
    interaction: ChatInputCommandInteraction,
    client: Client,
    args: CommandInteractionOptionResolver
  ) => Promise<void>;

  constructor(options: CommandOptions) {
    // Object.assign(this, options)
    this.name = options.name;
    this.description = options.description;
    this.run = options.run;
    this.options = options.options;
    if (options.roles) {
      this.roles = options.roles;
    }
    if (options.permissions) {
      this.permissions = options.permissions;
    }
    if (options.ownerOnly) {
      this.ownerOnly = options.ownerOnly;
    }
  }

  async middleware(
    interaction: ChatInputCommandInteraction,
    client: Client,
    args: CommandInteractionOptionResolver,
    command: Command
  ) {
    const guild = client.guilds.cache.find(
      (guild) => guild.id == interaction.guildId
    );

    const userCooldown = checkCooldown(interaction.user.id, command.name, 3000);

    if (command.ownerOnly) {
      if(!isBotOwner(interaction.user.id, guild?.ownerId ?? "")) {
        return interaction.reply({
          content: "You do not have permission to run this command.",
          flags: [MessageFlags.Ephemeral],
        });
      }
      if (!userCooldown) {
        return interaction.reply({
          content: "Please wait to use this command again.",
          flags: [MessageFlags.Ephemeral],
        });
      }
      command.run(interaction, client, args);
    } else if (command.roles) {
      // eslint-disable-next-line
      let roles = Array<RoleResolvable>();

      command.roles.forEach((role) => {
        const foundRole = guild?.roles.cache.find(
          (findRole) => findRole.name == role
        );

        if (!foundRole) {
          return interaction.reply({
            content:
              "It seems I could not find the roles required for this command.",
            flags: [MessageFlags.Ephemeral],
          });
        }
        roles.push(foundRole);
      });

      let hasRoles = false;
      const member = guild?.members.cache.get(interaction.user.id);

      member?.roles.cache.forEach((role) => {
        roles.forEach((requiredRole) => {
          if (role == requiredRole) {
            hasRoles = true;
          }
        });
      });
      if (!hasRoles) {
        return interaction.reply({
          content: "You do not have permission to run this command.",
          flags: [MessageFlags.Ephemeral],
        });
      }

      command.run(interaction, client, args);
    } else if (command.permissions) {
      if (!interaction.memberPermissions?.has(command.permissions)) {
        return interaction.reply({
          content: "You do not have permission to run this command.",
          flags: [MessageFlags.Ephemeral],
        });
      }
      if (!userCooldown) {
        return interaction.reply({
          content: "Please wait to use this command again.",
          flags: [MessageFlags.Ephemeral],
        });
      }
      command.run(interaction, client, args);
    } else {
      if (!userCooldown) {
        return interaction.reply({
          content: "Please wait to use this command again.",
          flags: [MessageFlags.Ephemeral],
        });
      }
      command.run(interaction, client, args);
    }
  }
}
