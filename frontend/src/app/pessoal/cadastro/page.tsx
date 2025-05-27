"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { InputDocument } from "@/components/ui/input/inputDocument";
import { InputFileImage } from "@/components/ui/input/inputFileImage";
import React from "react";

export default function EmployeeRegistration() {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <DatePicker />
      <InputFileImage/>
      <InputDocument />
    </div>
  );
}


