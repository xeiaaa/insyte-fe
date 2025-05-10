import { axiosClient } from "./axios";

export interface CreateNoteBody {
  title: string;
}

const create = async (body: CreateNoteBody) => {
  return axiosClient.post("/note", body);
};

const getAll = async () => {
  return axiosClient.get("/note");
};

const get = async (noteId: string) => {
  return axiosClient.get(`/note/${noteId}`);
};

const remove = async (noteId: string) => {
  return axiosClient.delete(`/note/${noteId}`);
};

export const notes = {
  create,
  getAll,
  get,
  delete: remove,
};
