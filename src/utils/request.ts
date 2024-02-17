import axios, { AxiosRequestConfig } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalCatch?: boolean;
}

export const request = axios.create();

request.interceptors.request.use((config) => {
  config.baseURL = `${import.meta.env.VITE_API_URL}/${
    import.meta.env.VITE_API_VERSION
  }`;

  return config;
});
