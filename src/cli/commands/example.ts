import { Command } from "commander";

const exampleCommand = new Command("example")
    .description("An example command")
    .action(() => {
        console.log("This is an example command.");
    }
);

export default exampleCommand;
