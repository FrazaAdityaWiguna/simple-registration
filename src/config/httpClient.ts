import axios, { AxiosRequestConfig } from "axios";

const interceptor: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
};

export const httpClient = axios.create({
  ...interceptor,
  baseURL: process.env.BASE_URL,
});
