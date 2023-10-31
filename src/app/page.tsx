"use client";

import { Download } from "@/components/Download";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { useCreateZipFromConfig } from "@/lib/use-create-zip";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  files: FileList;
}

export default function Home() {
  const { run, pending, data, error } = useCreateZipFromConfig();
  const [filesExist, setFilesExist] = useState(false);

  const { register, watch, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    run(data.files[0]);
  };

  const files = watch("files");

  useEffect(() => {
    if (files && files.length > 0) {
      setFilesExist(true);
    } else {
      setFilesExist(false);
    }
  }, [files]);

  console.log({ data, error, pending });

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col align-middle gap-4"
      >
        <InputFile {...register("files", { required: true })} />

        <Button type="submit" disabled={!filesExist}>
          Создать
        </Button>
      </form>
      {data && <div>{<Download blob={data} />}</div>}
      {error && <div>{error.toString()}</div>}
    </main>
  );
}
