import { api } from "@/api";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [notes, setNotes] = useState<Note[] | null>(null);
  useEffect(() => {
    const init = async () => {
      const response = await api.notes.getAll();
      setNotes(response.data);
      console.log(response.data);
    };

    init();
  }, []);

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
