import { api } from "@/api";
import { CreateNoteBody } from "@/api/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  title: string;
  // files: FileList;
};

const CreateNewNotePage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (body: CreateNoteBody) => {
      const { data } = await api.notes.create(body);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate(`/notes/${data._id}`);
    },
  });

  const onSubmit = async (data: FormValues) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        placeholder="Note Title"
        className="max-w-96"
        {...register("title")}
      />
      {/* <label htmlFor="files">Files</label> */}
      {/* <Input
        type="file"
        multiple
        id="files"
        placeholder="Select Files"
        className="max-w-96"
        accept=".txt"
        {...register("files")}
      /> */}
      <Button type="submit" className="self-start">
        Submit
      </Button>
    </form>
  );
};

export default CreateNewNotePage;
