import { Command } from "commander";
import exampleCommand from "./commands/example.js";
import initCommand from "./commands/init.js";

const program = new Command();

program.version("0.4.1").description("ShadowCore CLI");

// Define your commands here
// Example command
program.addCommand(exampleCommand);
program.addCommand(initCommand);

program.parse(process.argv);
