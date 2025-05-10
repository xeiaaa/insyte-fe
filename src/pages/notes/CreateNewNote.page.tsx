import { axiosClient } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  files: FileList;
};

const CreateNewNotePage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { getToken } = useAuth();

  const onSubmit = async (data: FormValues) => {
    axiosClient
      .post(
        "/note",
        { title: data.title },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log({ data });
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
      <label htmlFor="files">Files</label>
      <Input
        type="file"
        multiple
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
  );
};

export default CreateNewNotePage;
