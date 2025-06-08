"use client";

import React from "react";
import { AddressForm } from "@/components/ui/adress";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <StepIndicator activeStep={2} />
      <AddressForm />
    </PageLayout>
  );
}
