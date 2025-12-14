import { execSync } from "child_process";
import { promises as fs } from "fs";
import * as path from "path";

export async function generateProject(
  projectName: string,
  packageManager: string,
  tools: string[],
  examples: string[]
) {
  console.log(`Generating project: ${projectName}`);
  // Here you would typically create the project directory and initialize it with the selected package manager

  const projectPath = path.join(process.cwd(), projectName);

  try {
    await fs.access(projectPath);
    console.error(`Error: Directory "${projectName}" already exists.`);
    return;
  } catch {
    await fs.mkdir(projectPath, { recursive: true });
    console.log(`Created directory: ${projectName}`);
  }

  console.log(`Generating project with ${packageManager}...`);

  execSync(`${packageManager} init -y`, { cwd: projectPath, stdio: "inherit" });

  // Install required dependencies for the base project
  const baseDependencies = ["@shadow-dev/core", "discord.js"];
  execSync(`${packageManager} add ${baseDependencies.join(" ")}`, {
    cwd: projectPath,
    stdio: "inherit",
  });

  // Setup basic project structure

  const indexts = `import { Bot } from '@shadow-dev/core';
import { GatewayIntentBits } from 'discord.js';

// Replace with your bot's token
const token = 'YOUR_BOT_TOKEN'; // Replace with your Bot's token
const GUILD_ID = 'YOUR_GUILD_ID'; // Replace with your server's ID

// Initialize the bot
export const bot = new Bot(
  token,
  [
    'Guilds',
    'GuildMessages',
    'MessageContent'
  ],
  false // Debug mode disabled
);

// Log when the bot is ready
bot.getClient().once('ready', () => {
  console.log(\`✅ Logged in as \${bot.getClient().user?.tag}\`);
  bot.getCommandManager().registerCommands(GUILD_ID);
});
`;

  const srcPath = path.join(projectPath, "src");
  await fs.mkdir(srcPath, { recursive: true });
  await fs.mkdir(path.join(srcPath, "commands"), { recursive: true });
  await fs.mkdir(path.join(srcPath, "events"), { recursive: true });
  await fs.mkdir(path.join(srcPath, "middleware"), { recursive: true });
  await fs.mkdir(path.join(srcPath, "buttons"), { recursive: true });
  await fs.mkdir(path.join(srcPath, "menus"), { recursive: true });
  await fs.writeFile(
    path.join(srcPath, "index.ts"),
    `// Entry point for your project\n\n${indexts}`,
    "utf-8"
  );

  console.log(`Selected tools: ${tools.join(", ")}`);

  // Install selected tools
  if (tools.length > 0) {
    for (const tool of tools) {
      if (tool === "typescript") {
        execSync(`${packageManager} add -D typescript @types/node ts-node`, {
          cwd: projectPath,
          stdio: "inherit",
        });
        await fs.writeFile(
          path.join(projectPath, "tsconfig.json"),
          `{
                        "compilerOptions": {
                            "target": "ES6",
                            "module": "commonjs",
                            "strict": true,
                            "esModuleInterop": true,
                            "skipLibCheck": true,
                            "forceConsistentCasingInFileNames": true
                        },
                        "include": ["src/**/*"],
                        "exclude": ["node_modules", "**/*.spec.ts"]
                    }`,
          "utf-8"
        );
      }
    }

    // Special handling if both Prettier and ESLint are selected
    if (tools.includes("eslint") && tools.includes("prettier")) {
      if (packageManager === "npm") {
        execSync(`npm init @eslint/config@latest`, {
          cwd: projectPath,
          stdio: "inherit",
        });
      } else {
        execSync(`${packageManager} create @eslint/config@latest`, {
          cwd: projectPath,
          stdio: "inherit",
        });
      }

      const eslintConfigPath = path.join(projectPath, "eslint.config.mjs");
      const eslintConfigJsPath = path.join(projectPath, "eslint.config.js");
      const eslintConfigCjsPath = path.join(projectPath, "eslint.config.cjs");

      const eslintConfigExists =
        (await fs.stat(eslintConfigPath).catch(() => false)) ||
        (await fs.stat(eslintConfigJsPath).catch(() => false)) ||
        (await fs.stat(eslintConfigCjsPath).catch(() => false));

      if (eslintConfigExists) {
        const eslintConfig = `import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended', prettier],
  },
  { rules: { 'prettier/prettier': 'error' } },
  tseslint.configs.recommended,
]);
`;

        if (eslintConfigPath) {
          await fs.writeFile(eslintConfigPath, eslintConfig, "utf-8");
        } else if (eslintConfigJsPath) {
          await fs.writeFile(eslintConfigJsPath, eslintConfig, "utf-8");
        } else if (eslintConfigCjsPath) {
          await fs.writeFile(eslintConfigCjsPath, eslintConfig, "utf-8");
        } else {
          console.error(
            "Error: No valid ESLint configuration file path found."
          );
        }
      }

      execSync(
        `${packageManager} add --save-dev prettier eslint-config-prettier eslint-plugin-prettier`,
        {
          cwd: projectPath,
          stdio: "inherit",
        }
      );

      const prettierConfigPath = path.join(projectPath, ".prettierrc");
      const prettierConfig = `{
        "semi": true,
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": "es5"
      }`;
      await fs.writeFile(prettierConfigPath, prettierConfig, "utf-8");
    } else {
      for (const tool of tools) {
        if (tool === "eslint") {
          if (packageManager === "npm") {
            execSync(`npm init @eslint/config@latest`, {
              cwd: projectPath,
              stdio: "inherit",
            });
          } else {
            execSync(`${packageManager} create @eslint/config@latest`, {
              cwd: projectPath,
              stdio: "inherit",
            });
          }
        }

        if (tool === "prettier") {
          execSync(`${packageManager} add -D prettier`, {
            cwd: projectPath,
            stdio: "inherit",
          });
          await fs.writeFile(
            path.join(projectPath, ".prettierrc"),
            `{
                            "semi": true,
                            "singleQuote": true,
                            "tabWidth": 2,
                            "trailingComma": "es5"
                        }`,
            "utf-8"
          );
        }
      }
    }
  }

  console.log(`Selected examples: ${examples.join(", ")}`);
  // Install selected examples
  if (examples.length > 0) {
    for (const example of examples) {
      if (example === "command") {
        const commandExample = `import { Command } from '@shadow-dev/core';

export default new Command({
  name: 'ping',
  description: 'Pong',
  run: async (interaction, client) => {
    const uptime = client.uptime; // This line is just to ensure the client is referenced, you can remove it if not needed.
    await interaction.reply({
      content: uptime ? Math.floor(uptime / 1000).toString() : '🏓 Pong!',
    });
  },
});
`;
        await fs.mkdir(path.join(srcPath, "commands", "fun"), { recursive: true });
        await fs.writeFile(
          path.join(srcPath, "commands", "fun", "ping.ts"),
          commandExample,
          "utf-8"
        );
      }
      if (example === "event") {
        const eventExample = `import { Event } from '@shadow-dev/core';
import { bot } from '../index';

export default new Event(
  'ready',
  async (client) => {
    console.log('✅ Logged in as', client.user?.tag);
    const GUILD_ID = 'YOUR_GUILD_ID'; // Replace with your server's ID
    await bot.getCommandManager().registerCommands(GUILD_ID);
  },
  true
);
`
        await fs.writeFile(
          path.join(srcPath, "events", "ready.ts"),
          eventExample,
          "utf-8"
        );
      }
      if (example === "button") {
        const buttonExample = `import { Button, splitSpecialId } from '@shadow-dev/core';

export default new Button({
  customId: 'test-button',
  run: async (interaction) => {
    const parsedId = splitSpecialId(interaction.customId);
    interaction.reply({ content: parsedId.id });
    // await interaction.reply("Testing Button")
  },
});
`
        await fs.mkdir(path.join(srcPath, "buttons", "test"), { recursive: true });
        await fs.writeFile(
          path.join(srcPath, "buttons", "test", "test.ts"),
          buttonExample,
          "utf-8"
        );
      }
      if (example === "menu") {
        const menuExample = `import { Menu } from '@shadow-dev/core';

export default new Menu({
  customId: 'testing-menu',
  run: async (interaction) => {
    interaction.reply('Test menu');
  },
});
`
        await fs.mkdir(path.join(srcPath, "menus", "test"), { recursive: true });
        await fs.writeFile(
          path.join(srcPath, "menus", "test", "test.ts"),
          menuExample,
          "utf-8"
        );
      }
      if (example === "middleware") {
        const middlewareglobalExample = `import { CommandMiddleware } from '@shadow-dev/core';

export default new CommandMiddleware({
  name: 'global',
  beforeExecution: async () => {
    console.log('Global Before');
    return true;
  },
  afterExecution: async () => {
    console.log('Global After');
  },
});
`
        const middlewarespecificExample = `import { CommandMiddleware } from '@shadow-dev/core';

export default new CommandMiddleware({
  name: 'ping',
  beforeExecution: async () => {
    console.log('Ping Before');
    return true;
  },
  afterExecution: async () => {
    console.log('Ping After');
  },
});
`
        await fs.mkdir(path.join(srcPath, "middleware", "command"), {
          recursive: true,
        });
        await fs.writeFile(
          path.join(srcPath, "middleware", "command", "global.ts"),
          middlewareglobalExample,
          "utf-8"
        );
        await fs.writeFile(
          path.join(srcPath, "middleware", "command", "ping.ts"),
          middlewarespecificExample,
          "utf-8"
        );
      }
    }
  }
}
