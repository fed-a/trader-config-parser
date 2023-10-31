"use client";

import React from "react";
import { Input } from "./input";
import { Label } from "./label";

export interface InputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="grid w-full lg:max-w-sm items-center gap-1.5">
        <Label className="flex flex-col gap-2">
          Файл конфигурации
          <Input ref={ref} id="picture" type="file" {...props} />
        </Label>
      </div>
    );
  }
);

InputFile.displayName = "Input";

export { Input };
