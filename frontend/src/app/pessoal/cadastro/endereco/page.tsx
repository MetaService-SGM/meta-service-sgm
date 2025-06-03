"use client";

import React from "react";
import { AddressForm } from "@/components/ui/adress";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeRegistrationLayout from "@/components/ui/layout/EmployeeRegistrationLayout";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <StepIndicator activeStep={2} />

        <AddressForm />
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
