import Cookies from "js-cookie";

import { EnumTokens } from "../constants/constants";

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN);
  return refreshToken || null;
};

export const saveTokensStorage = (accessToken: string, refreshToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: "strict",
    expires: 30,
  });
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    sameSite: "strict",
    expires: 60,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
  Cookies.remove(EnumTokens.REFRESH_TOKEN);
};
