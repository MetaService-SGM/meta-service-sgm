"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export function InputDocument() {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="flex flex-col w-full max-w-sm items-start gap-1.5 mx-4">
      <Label htmlFor="documento">Documento</Label>
      <div className="relative w-full">
        <FiUpload
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B426E]"
          size={18}
        />
        <Input
          id="documento"
          type="file"
          accept=".pdf,.doc,.docx,.odt"
          onChange={handleChange}
          className="bg-background pl-10 pr-4 file:bg-[#2B426E] file:text-white file:px-4 file:py-1 file:rounded-md file:border-none hover:file:bg-[#1f2f4f] file:cursor-pointer"
        />
      </div>
      {fileName && (
        <p className="text-sm text-muted-foreground">
          Selecionado: {fileName}
        </p>
      )}
    </div>
  );
}
