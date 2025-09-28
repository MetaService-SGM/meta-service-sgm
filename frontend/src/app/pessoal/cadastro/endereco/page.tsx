// app/pessoal/cadastro/endereco/page.tsx
"use client";

import { AddressForm } from "@/components/ui/adress"; // Ajuste o caminho
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { StepIndicator } from "@/components/ui/step-indicator";

export default function AddressPage() {
  return (
    <PageLayout>
      <StepIndicator activeStep={2} />
      <AddressForm />
    </PageLayout>
  );
}