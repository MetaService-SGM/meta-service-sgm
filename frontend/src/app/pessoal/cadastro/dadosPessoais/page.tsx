"use client";

import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { FormActions } from "@/components/ui/button/FormActionsButton";
import EmployeeRegistrationLayout from "@/components/ui/layout/EmployeeRegistrationLayout";
import { InputDocument } from "@/components/ui/input/inputDocument";

// url:
// localhost:3000/pessoal/cadastro/dadosPessoais
export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <h1>Teste</h1>
        <InputDocument></InputDocument>
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
