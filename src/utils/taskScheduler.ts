import { Task } from "../types/task";

export class TaskScheduler {
  private tasks = new Map<string, Task>();

  schedule(
    name: string,
    interval: number,
    callback: () => void,
    immediate = false
  ): void {
    if (this.tasks.has(name)) {
      console.warn(`⚠️ Task "${name}" is already scheduled.`);
      return;
    }

    console.log(`🕒 Scheduled Task: ${name} (every ${interval / 1000}s)`);

    if (immediate) {
      try {
        callback();
      } catch (err) {
        console.error(`❌ Initial run of task "${name}" failed:`, err);
      }
    }

    const timer = setInterval(() => {
      try {
        callback();
      } catch (err) {
        console.error(`❌ Task "${name}" error:`, err);
      }
    }, interval);

    this.tasks.set(name, { name, interval, timer, callback });
  }

  cancel(name: string): void {
    const task = this.tasks.get(name);
    if (!task) return console.warn(`⚠️ Task "${name}" not found.`);
    clearInterval(task.timer);
    this.tasks.delete(name);
    console.log(`🛑 Cancelled Task: ${name}`);
  }

  list(): string[] {
    return Array.from(this.tasks.keys());
  }

  has(name: string): boolean {
    return this.tasks.has(name);
  }
}
