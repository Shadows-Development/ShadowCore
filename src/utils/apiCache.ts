const cache = new Map<string, {data: any; expires: number}>();

export function cacheRequest<T>(key: string, data: T, ttl: number = 60000) {
    cache.set(key, {data, expires: Date.now() + ttl});
}

export function getCached<T>(key: string): T | null {
    const cached = cache.get(key);
    if (cached && Date.now() < cached.expires) {
        return cached.data;
    }
    cache.delete(key);
    return null;
}