import axios, { type CreateAxiosDefaults } from "axios";

import { authService } from "../services/auth.service";
import { getAccessToken } from "../services/auth.token.service";

const options: CreateAxiosDefaults = {
  baseURL: "https://diplomproject2024myapi.azure-api.net/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClassic = axios.create(options);

export const axiosWithAuth = axios.create(options);

axiosClassic.interceptors.response.use(
  config => config,
  async error => {
    throw error;
  },
);

axiosWithAuth.interceptors.request.use(config => {
  let accessToken = getAccessToken();
  if (!accessToken) {
    authService.getNewTokens();
    accessToken = getAccessToken();
  }
  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    throw error;
  },
);
