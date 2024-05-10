// @ts-ignore
import { IResolveParams } from "reactjs-social-login";

import { TokenResponse } from "@react-oauth/google";

import { getRefreshToken, removeFromStorage, saveTokensStorage } from "./auth.token.service";

import { axiosClassic } from "../api/interceptors";

export const authService = {
  async login(data: IAuthLogin) {
    const response = await axiosClassic.post<IAuthResponse>(`/authorization/login`, data);
    return response;
  },

  async loginGoogle(
    tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">,
  ) {
    const response = await axiosClassic.post("/Authorization/LoginGoogle", {
      IdToken: tokenResponse.access_token,
    });
    return response;
  },

  async loginFacebook({ data }: IResolveParams) {
    const response = await axiosClassic.post("/Authorization/LoginFacebook", {
      firstName: data.first_name,
      surName: data.last_name,
      picture: data.picture.data.url,
      email: data.email,
    });
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
