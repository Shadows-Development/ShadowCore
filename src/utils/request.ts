import axios from "axios";
import { RequestOptions } from "../types/request.type";

export async function apiRequest<T = any>(
  url: string,
  opts: RequestOptions = {}
): Promise<T> {
  try {
    const config = {
      method: opts.method || "GET", // Default to GET
      url: url,
      headers: {
        "Content-Type": "application/json",
        ...(opts.headers || {}), // Merge user-provided headers
      },
      params: opts.queryParams, // Query parameters
      data: opts.body || undefined, // Request body (only for POST/PUT/PATCH)
      timeout: opts.timeout || 5000, // Default timeout is 5s
    };

    const response = await axios(config);

    return response.data;
  } catch (error: any) {
    console.error(
      `❌ API Request failed:`,
      error.response?.status,
      error.response?.data || error.message
    );
    throw new Error(
      `API Request Failed: ${error.response?.status || "Unknown Status"} - ${
        error.message
      }`
    );
  }
}
