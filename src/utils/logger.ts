import axios from "axios";
import type { LokiConfig, LogEntry } from "../types/logger.type";

export class LokiLogger {
  private config: LokiConfig;

  constructor(config: LokiConfig) {
    this.config = config;
  }

  private async sendLog(entries: LogEntry[], level: 'info' | 'error' | 'warn' | 'debug') {
    const streams = [
      {
        stream: {...this.config.labels, level},
        values: entries.map((entry) => [
          (Date.now() * 1e6).toString(),
          entry.message,
        ]),
      },
    ];

    try {
        await axios.post(`${this.config.host}/loki/api/v1/push`, { streams}, {
            auth: this.config.username
            ? {
                username: this.config.username,
                password: this.config.password ?? '',
              }
            : undefined,
        })
    } catch (err) {
        console.error("Failed to send log to Loki", err);
    }
  }

  async log(level: 'info' | 'error' | 'warn' | 'debug', message: string) {
    const entry: LogEntry = {
        timestamp: parseInt(new Date().toISOString()),
        message: `[${level.toUpperCase()}] ${message}`,
    }
    await this.sendLog([entry], level);
  }

  async info(message: string) {
    await this.log('info', message);
  }

  async error(message: string) {
    await this.log('error', message);
  }

  async warn(message: string) {
    await this.log('warn', message);
  }

  async debug(message: string) {
    await this.log('debug', message);
  }
}
