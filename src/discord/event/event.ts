import { ClientEvents } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
    event: Key;
    once: boolean;
    run: (...args: ClientEvents[Key]) => void;

    constructor(event: Key, run: (...args: ClientEvents[Key]) => void, once = false) {
        this.event = event;
        this.run = run;
        this.once = once;
    }
}
