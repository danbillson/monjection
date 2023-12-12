import axios from "axios";

export interface HTTPClient {
  get<T>(url: string): Promise<T | null>;
}

export class FetchClient implements HTTPClient {
  async get<T>(url: string): Promise<T | null> {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    return response.json();
  }
}

export class AxiosClient implements HTTPClient {
  async get<T>(url: string): Promise<T | null> {
    const response = await axios.get(url);

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  }
}
