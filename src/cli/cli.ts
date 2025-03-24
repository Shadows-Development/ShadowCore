import { Command } from "commander";
import { readPackageJson } from "../utils/general.js";
import exampleCommand from "./commands/example.js";
import initCommand from "./commands/init.js";

const program = new Command();
const version = readPackageJson().version;

program.version(version).description("ShadowCore CLI");

// Define your commands here
// Example command
program.addCommand(exampleCommand);
program.addCommand(initCommand);

program.parse(process.argv);
