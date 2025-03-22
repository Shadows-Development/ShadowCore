# ShadowCore  

ShadowCore is a **modular core framework** for Discord bot development. It provides a streamlined system for **commands, events, buttons, menus, middleware execution, API requests, and more**, making bot development faster and more efficient.

![GitHub issues](https://img.shields.io/github/issues/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub forks](https://img.shields.io/github/forks/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub stars](https://img.shields.io/github/stars/Shadows-Development/ShadowCore?style=flat-square)  
![GitHub license](https://img.shields.io/github/license/Shadows-Development/ShadowCore?style=flat-square)  
![npm version](https://img.shields.io/npm/v/shadow-core?style=flat-square)  

## 🌟 Features
- 🚀 **Modular Command System** - Auto-loads commands from categorized folders.
- 🎛 **Dynamic Button & Menu Handling** - Supports dynamic custom IDs (`feature:action:{id}`). 
- 🛠 **Middleware Support** - Allows pre/post-execution logic for commands.
- ⏳ **Rate Limiting & Cooldowns** - Prevents spam and abuse.
- 🌐 **API Utility with Axios** - Simplifies external API requests.
- 📜 **Logging with Loki** - Built-in structured logging.
- ⏰ **Task Scheduler** - Run background tasks automatically.

## 📦 Installation
```bash
npm install shadow-core
```

## 🚀 Usage

### **Setting Up ShadowCore**
Create a bot that uses the **ShadowCore framework**.

```ts
import { Bot } from "shadow-core";
import { GatewayIntentBits } from "discord.js";

// Replace with your bot's token
const token = "YOUR_BOT_TOKEN";

// Initialize the bot
export const bot = new Bot(
  token,
  [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  false // Debug mode disabled
);

// Log when the bot is ready
bot.getClient().once("ready", () => {
    console.log(`✅ Logged in as ${bot.getClient().user?.tag}`);
    bot.getCommandManager().registerCommands("GUILD_ID");
});
```

### **Registering Commands**
Commands are automatically loaded from the `/commands/{category}/` folder.  
Each command file must export a command object.

#### **Example Command Structure:**
```
/commands/general/ping.ts
/commands/admin/ban.ts
/commands/moderation/kick.ts
```

#### **Command Example: `/commands/general/ping.ts`**
```ts
import { Command } from "shadow-core";

export default new Command({
    name: "ping",
    description: "Replies with Pong!",
    run: async (interaction) => {
        await interaction.reply("🏓 Pong!");
    },
});
```

### **Handling Dynamic Buttons** **W.I.P.**
```ts
import { Button, splitSpecialId } from "shadow-core";

export default new Button({
    customId: "ticket:open:{id}",
    run: async (interaction) => {
        const { id } = splitSpecialId(interaction.customId);
        interaction.reply(`Opened ticket #${id}`);
    }
});
```

## 📜 License
This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/Shadows-Development/ShadowCore.git
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature-new-functionality
   ```
4. **Make changes** and commit them:
   ```bash
   git commit -m "Added new feature"
   ```
5. **Push the branch** and create a pull request:
   ```bash
   git push origin feature-new-functionality
   ```
6. **Submit a pull request** on GitHub and wait for review.

## 🌎 Community & Support
- **GitHub Issues** - Report bugs & request features.
