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

const createDocumentLoader = async (noteId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post(`/note/${noteId}/document-loader`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const upsertAll = async (noteId: string) => {
  return axiosClient.post(`/note/${noteId}/upsert/all`)
}

const getAllFiles = async (noteId: string) => {
  return axiosClient.get(`/note/${noteId}/files`)
}

export const notes = {
  create,
  getAll,
  get,
  delete: remove,
  createDocumentLoader,
  upsertAll,
  getAllFiles
};
