import React from "react";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";

export function Download({ blob }: { blob: Blob }) {
  function handleDownload() {
    saveAs(blob, `result_${new Date().toLocaleString()}.zip`);
  }

  return <Button onClick={handleDownload}>Скачать</Button>;
}
