import { api } from "@/api";
import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

export interface Note {
  _id: string;
  title: string;
  documentStoreId: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotesContext {
  notes: Note[] | null;
}

export const NotesContext = createContext<INotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await api.notes.getAll();
      return response.data;
    },
  });

  return (
    <NotesContext.Provider
      value={{
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): INotesContext => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
