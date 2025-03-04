export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: any;
    queryParams?: Record<string, string>;
    timeout?: number;
  }