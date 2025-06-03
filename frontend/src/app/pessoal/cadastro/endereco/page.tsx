"use client";

import React from "react";
import { AddressForm } from "@/components/ui/adress";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      {" "}
      <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg shadow-md space-y-6">
        <StepIndicator activeStep={2} />
        <AddressForm />
      </div>
    </PageLayout>
  );
}
