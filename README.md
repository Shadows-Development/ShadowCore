# ShadowCore  
![GitHub package.json version](https://img.shields.io/github/package-json/v/GreyDevOps/shadow-core?style=flat-square)  
![GitHub issues](https://img.shields.io/github/issues/GreyDevOps/shadow-core?style=flat-square)  
![GitHub forks](https://img.shields.io/github/forks/GreyDevOps/shadow-core?style=flat-square)  
![GitHub stars](https://img.shields.io/github/stars/GreyDevOps/shadow-core?style=flat-square)  
![GitHub license](https://img.shields.io/github/license/GreyDevOps/shadow-core?style=flat-square)  

ShadowCore is a **modular core framework** for Discord bot development. It provides a streamlined system for **commands, events, buttons, menus, middleware execution, API requests, and more**, making bot development faster and more efficient.

## 🌟 Features
- 🚀 **Modular Command System** - Auto-loads commands from files.
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

const bot = new Bot("YOUR_BOT_TOKEN");

bot.getClient().once("ready", () => {
    console.log(`✅ Logged in as ${bot.getClient().user?.tag}`);
});
```

### **Registering Commands**
Commands are automatically loaded from the `/commands/` folder.

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

### **Handling Dynamic Buttons**
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

## 🛠 Configuration
ShadowCore allows configuration through an environment file (`.env`):

```
BOT_TOKEN=your-bot-token
DATABASE_URL=your-database-url
LOGGING_LEVEL=info
```

## 📜 License
This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/GreyDevOps/shadow-core.git
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
- **Discord Server** - Join the development discussion.

---

### **Next Steps**
- [ ] Set up **GitHub Actions** for automated testing.
- [ ] Improve **middleware support** for commands.
- [ ] Expand **unit tests** for better stability.
