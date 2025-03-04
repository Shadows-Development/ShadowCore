const cooldowns = new Map<string, number>();

export function checkCooldown(userId: string, command: string, cooldownTime: number): boolean {
    const key = `${userId}-${command}`;
    const now = Date.now();

    if (cooldowns.has(key)) {
        const expiration = cooldowns.get(key)!;
        if(now < expiration) {
            return false;
        }
    }
    cooldowns.set(key, now + cooldownTime);
    return true;
}