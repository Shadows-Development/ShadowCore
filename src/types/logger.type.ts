export interface LokiConfig {
    host: string;
    username?: string;
    password?: string;
    labels?: Record<string, string>;
}

export interface LogEntry {
    timestamp: number;
    message: string;
}