import { axiosWithAuth } from "../api/interceptors";
import { ChangePasswordFormType } from "../validators/change-password-validator";

export const userService = {
  async getUser() {
    const response = await axiosWithAuth.get<IUser>("/User/getProfileInfo");
    return response;
  },

  async setUser(data: IPersonalData) {
    const response = await axiosWithAuth.patch("/User/SetProfileInfo", data);
    return response;
  },

  async setPaymentData(data: IPaymentData) {
    const response = await axiosWithAuth.patch<IPaymentData>("/User/SetPaymentData", data);
    return response;
  },

  async deletePaymentData() {
    const response = await axiosWithAuth.delete("/User/DeletePaymentData");
    return response;
  },

  async deleteUser() {
    const response = await axiosWithAuth.delete("/User/DeleteAccount");
    return response;
  },

  async setNewPassword(data: ChangePasswordFormType) {
    const response = await axiosWithAuth.patch<ChangePasswordFormType>(
      "/User/ChangePassword",
      data,
    );
    return response;
  },

  async setProfileImage(data: FormData) {
    const response = await axiosWithAuth.patch("/User/setProfileImage", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  },
};
