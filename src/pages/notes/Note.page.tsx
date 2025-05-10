import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const NotePage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data: note } = useQuery({
    queryKey: ["note", noteId],
    queryFn: async () => {
      if (noteId) {
        const { data } = await api.notes.get(noteId);
        return data;
      }
    },
  });
  return (
    <div>
      <h1>{JSON.stringify(note, null, 2)}</h1>
    </div>
  );
};

export default NotePage;
