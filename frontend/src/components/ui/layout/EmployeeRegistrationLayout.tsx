import { ReactNode } from "react";
import { StepIndicator } from "../step-indicator";
import { FormActionsButton } from "../button/FormActionsButton";

interface EmployeeRegistrationLayoutProps {
  children: ReactNode;
}

export default function EmployeeRegistrationLayout({
  children,
}: EmployeeRegistrationLayoutProps) {
  return (
    <>
      {children}
      <FormActionsButton></FormActionsButton>
    </>
  );
}
