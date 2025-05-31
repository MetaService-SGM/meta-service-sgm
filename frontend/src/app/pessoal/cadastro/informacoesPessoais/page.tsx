"use client";

import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      {" "}
      <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-[#2B426E]">
          Cadastro de Colaboradores
        </h1>
        <StepIndicator activeStep={7} />
      </div>
    </PageLayout>
  );
}
