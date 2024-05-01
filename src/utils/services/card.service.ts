import { axiosClassic, axiosWithAuth } from "../api/interceptors";

export const cardService = {
  async getFilterCards(data: IFilterCard) {
    const response = await axiosClassic.get<ICard[]>(
      `/Houses?address=${data.address}&from=${data.from}&to=${data.to}&adult=${data.adult}&childs=${data.childs}&infants=${data.infants}&pets=${data.pets}`,
    );
    return response;
  },
  async getMainPageInfo() {
    const response = await axiosClassic.get<IMainPageCards>(`/Houses/GetMainPageInfo`);
    return response;
  },

  async createHouse(data: FormData) {
    const response = await axiosWithAuth.post<ICreateHouse>("/Houses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  async addLikeHouse(houseId: number | string | undefined) {
    if (!houseId) return;
    const response = await axiosWithAuth.post<ICreateHouse>("/Houses/AddFavoriteHouse", {
      houseId,
    });
    return response;
  },

  async deleteLikeHouse(houseId: number | string | undefined) {
    if (!houseId) return;

    const response = await axiosWithAuth.patch<ICreateHouse>("/Houses/DeleteFavoriteHouse", {
      houseId,
    });
    return response;
  },

  async getOneHouse(houseId: number | string | undefined) {
    if (!houseId) return;

    const response = await axiosWithAuth.get<IHouse>(`/Houses/${houseId}`);
    return response.data;
  },

  async addInRent(data: IRent) {
    const response = await axiosWithAuth.post<ICreateHouse>("/Rents", data);
    return response;
  },
};
