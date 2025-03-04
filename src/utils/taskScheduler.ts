export function scheduleTask(taskName: string, interval: number, callback: () => void) {
    console.log(`🕒 Scheduled Task: ${taskName} (Runs every ${interval / 1000}s)`);
    setInterval(callback, interval)
}