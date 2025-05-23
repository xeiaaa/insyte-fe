import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BubbleChat } from "flowise-embed-react";

const INSYTE_CHATFLOW_ID = import.meta.env.VITE_INSYTE_CHATFLOW_ID;
const FLOWISE_API_URL = import.meta.env.VITE_INSYTE_FLOWISE_API_URL;
const S3_URL = import.meta.env.VITE_S3_URL;

type FormValues = {
  files: FileList;
};

const NotePage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const queryClient = useQueryClient();

  const { noteId } = useParams<{ noteId: string }>();
  const { data: note } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      if (noteId) {
        const { data } = await api.notes.get(noteId);
        return data;
      }
    },
  });

  const { data: files } = useQuery({
    queryKey: ["notes", noteId, "files"],
    queryFn: async () => {
      if (noteId) {
        const { data } = await api.notes.getAllFiles(noteId);
        return data;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ noteId, file }: { noteId: string; file: File }) => {
      const { data } = await api.notes.createDocumentLoader(noteId, file);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", noteId, "files"] });
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (data.files.length === 0 || !noteId) {
      return;
    }
    const response = await mutation.mutateAsync({
      noteId,
      file: data.files[0],
    });
    console.log(response.data);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1>{JSON.stringify(note, null, 2)}</h1>
      <h1>{JSON.stringify(files, null, 2)}</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="files">Files</label>
        <Input
          type="file"
          id="files"
          placeholder="Select Files"
          className="max-w-96"
          accept=".txt"
          {...register("files")}
        />
        <Button type="submit" className="self-start">
          Submit
        </Button>
      </form>
      <Button
        className="self-start"
        onClick={() => {
          api.notes.upsertAll(note._id);
        }}
      >
        Upsert
      </Button>
      {/* <FullPageChat
            chatflowid="5919ffb7-229e-461a-a5d0-2ef1c39bac8e"
            apiHost="http://localhost:3001"

        /> */}

      <h1>Uploaded Files</h1>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(files) &&
            files.map((file) => {
              return (
                <tr key={file.id}>
                  <td>
                    <a
                      href={`${S3_URL}/docustore/${note.documentStoreId}/${file.name}`}
                      target="_blank"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td>{file.mimePrefix}</td>
                  <td>{file.size}</td>
                  <td>{file.uploaded}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* TODO: convert to env vars */}
      {note && (
        <BubbleChat
          key={note._id}
          chatflowid={INSYTE_CHATFLOW_ID}
          apiHost={FLOWISE_API_URL}
          chatflowConfig={{
            sessionId: 1,
            selectedStore: {
              documentStoreVS_0: note.documentStoreId,
            },
          }}
        />
      )}
    </div>
  );
};

export default NotePage;
