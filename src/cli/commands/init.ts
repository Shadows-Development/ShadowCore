import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";
import { Command } from "commander";
import { generateProject } from "../utils/generation.js";

const initCommand = new Command("init")
  .description("Command to create a new ShadowCore project")
  .action(async () => {
    let projectName: string = "";
    let packageManager: string = "npm"; // Default package manager
    let tools: string[] = []; // Default tools
    let examples: string[] = []; // Default examples

    // Prompt the user for the project name
    try {
      const projectNameAnswer = await inquirer.prompt({
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "my-shadowcore-project",
        validate: (input) => {
          if (input.trim() === "") {
            return "Project name cannot be empty.";
          }
          return true;
        },
      });
      projectName = projectNameAnswer.projectName;
    } catch (error) {
      if (error instanceof ExitPromptError) {
        // console.log('Prompt was canceled by the user.');
        // You can exit or handle the cancellation here
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    try {
      const packageManagerAnswer = await inquirer.prompt({
        type: "list",
        name: "packageManager",
        message: "What package manager do you want to use?",
        choices: ["npm", "pnpm", "yarn", "bun"],
        filter(val) {
          return val;
        },
      });
      packageManager = packageManagerAnswer.packageManager;
    } catch (error) {
      if (error instanceof ExitPromptError) {
        // console.log('Prompt was canceled by the user.');
        // You can exit or handle the cancellation here
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    try {
      const toolsAnswer = await inquirer.prompt({
        type: "checkbox",
        name: "tools",
        message: "Select the tools you want to install:",
        choices: [
          { name: "TypeScript", value: "typescript" },
          { name: "ESLint", value: "eslint" },
          { name: "Prettier", value: "prettier" },
        ],
      });
      tools = toolsAnswer.tools;
    } catch (error) {
      if (error instanceof ExitPromptError) {
        // console.log('Prompt was canceled by the user.');
        // You can exit or handle the cancellation here
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    try {
      const examplesAnswer = await inquirer.prompt({
        type: "checkbox",
        name: "examples",
        message: "Select the examples you want to install:",
        choices: [
          { name: "Command Example", value: "command" },
          { name: "Button Example", value: "button" },
          { name: "Menu Example", value: "menu" },
          { name: "Event Example", value: "event" },
          { name: "Middleware Example", value: "middleware" },
        ],
      });
        examples = examplesAnswer.examples;
    } catch (error) {
      if (error instanceof ExitPromptError) {
        // console.log('Prompt was canceled by the user.');
        // You can exit or handle the cancellation here
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    // Call the generateProject function with the selected options
    await generateProject(projectName, packageManager, tools, examples);

    // console.log(`You selected: ${packageManager}`);
  });

export default initCommand;
