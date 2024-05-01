import { getRefreshToken, removeFromStorage, saveTokensStorage } from "./auth.token.service";

import { axiosClassic } from "../api/interceptors";

export const authService = {
  async login(data: IAuthLogin) {
    const response = await axiosClassic.post<IAuthResponse>(`/authorization/login`, data);
    return response;
  },

  async registration(data: IAuthRegistration) {
    const response = await axiosClassic.post<IAuthResponse>(`/authorization/registration`, data);
    return response;
  },

  async getNewTokens() {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const response = await axiosClassic.post<IAuthResponse>("/Token/refresh", { refreshToken });

      if (response.data.accessToken && response.data.refreshToken) {
        saveTokensStorage(response.data.accessToken, response.data.refreshToken);
      }
      return response;
    } else {
      return { error: "refreshToken does not exist" };
    }
  },

  async logout() {
    const refreshToken = getRefreshToken();
    const response = await axiosClassic.post<any>("/authorization/logout", { refreshToken });
    if (response.status === 200) removeFromStorage();

    return response;
  },
};
