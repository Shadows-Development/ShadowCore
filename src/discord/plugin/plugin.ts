import { Client } from "discord.js";

export interface Plugin {
  metadata: metadata;
  register: (client: Client) => void;
}

export interface metadata {
  name: string;
  version: string;
  description: string;
  author?: string;
}