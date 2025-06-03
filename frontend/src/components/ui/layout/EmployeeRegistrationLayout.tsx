import { ReactNode } from "react";
import { FormActions } from "../button/FormActionsButton";
import { StepIndicator } from "../step-indicator";

interface EmployeeRegistrationLayoutProps {
  children: ReactNode;
}

export default function EmployeeRegistrationLayout({
  children,
}: EmployeeRegistrationLayoutProps) {
  return (
    <>
      <StepIndicator activeStep={2} />
      {children}
      <FormActions></FormActions>
    </>
  );
}
