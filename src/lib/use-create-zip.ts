"use client";

import { InitialObject, ResultObject } from "@/types";
import JSZip from "jszip";
import { useCallback, useMemo, useState } from "react";
import { ITEM_TEMPLATE, MAIN_TEMPLATE } from "./const/templates";

const readFileAsJSON = (file: File): Promise<any> => {
  if (file.type !== "application/json") {
    throw new Error("Invalid file type");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(file);
  });
};

const getFilesData = (initialObject: InitialObject): ResultObject[] => {
  return initialObject.TraderCategories.map((category) => {
    const categoryName = category.CategoryName;
    const items = category.Products.map((product) => {
      const [name, _, __, ___, minMaxPrice, sell] = product.split(",");
      return {
        ...ITEM_TEMPLATE,
        ClassName: name,
        MaxPriceThreshold: Number(minMaxPrice),
        MinPriceThreshold: Number(minMaxPrice),
        SellPricePercent: (Number(sell) / Number(minMaxPrice)) * 100,
      };
    });
    return {
      ...MAIN_TEMPLATE,
      DisplayName: categoryName,
      Items: items,
    };
  });
};

const createFilesFromData = (resultDataObjects: ResultObject[]): File[] => {
  return resultDataObjects.map((obj) => {
    const jsonData = JSON.stringify(obj, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    return new File([blob], `${obj.DisplayName}.json`, {
      type: "application/json",
    });
  });
};

const createZip = (files: File[]) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });
  return zip.generateAsync({ type: "blob" });
};

export function useCreateZipFromConfig() {
  const [data, setData] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleRun = useCallback(async (file: File) => {
    try {
      setPending(true);
      setError(null);
      const json = await readFileAsJSON(file);
      const data = getFilesData(json);
      const files = createFilesFromData(data);
      const zip = await createZip(files);
      setData(zip);
    } catch (error) {
      setError(error as string);
    } finally {
      setPending(false);
    }
  }, []);

  const result = useMemo(
    (): {
      run: (file: File) => void;
      pending: boolean;
      data: Blob | null;
      error: string | null;
    } => ({
      run: handleRun,
      pending,
      data: data,
      error: error,
    }),
    [data, error, handleRun, pending]
  );

  return result;
}
