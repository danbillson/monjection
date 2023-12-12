import axios from "axios";
import { injectable, inject } from "tsyringe";
import type { Logger } from "./logger";

export interface HTTPClient {
  get<T>(url: string): Promise<T | null>;
}

@injectable()
export class FetchClient implements HTTPClient {
  constructor(@inject("Logger") private logger: Logger) {}

  async get<T>(url: string): Promise<T | null> {
    const response = await fetch(url);

    if (!response.ok) {
      this.logger.error(
        `Request to ${url} failed with status ${response.status}`
      );
      return null;
    }

    return response.json();
  }
}

@injectable()
export class AxiosClient implements HTTPClient {
  constructor(@inject("Logger") private logger: Logger) {}

  async get<T>(url: string): Promise<T | null> {
    const response = await axios.get(url);

    if (response.status !== 200) {
      this.logger.error(
        `Request to ${url} failed with status ${response.status}`
      );
      return null;
    }

    return response.data;
  }
}
