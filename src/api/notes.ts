import { axiosClient } from "./axios";

const getAll = async () => {
  return axiosClient.get("/note");
};

export const notes = {
  getAll,
};
