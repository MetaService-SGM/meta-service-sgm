"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";

interface StepIndicatorProps {
  activeStep: number;
}

const steps = [
  { label: "Dados Pessoais", path: "dadosPessoais" },
  { label: "Endereço", path: "endereco" },
  { label: "Contatos", path: "contatos" },
  { label: "Dados Contratuais", path: "dadosContratuais" },
  { label: "Documentos", path: "documentos" },
  { label: "Dependentes", path: "dependentes" },
  { label: "Informações Pessoais", path: "informacoesPessoais" },
];

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  const router = useRouter();

  const handleStepClick = (path: string) => {
    router.push(`/pessoal/cadastro/${path}`);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-white p-6 rounded-xl shadow-md gap-4 overflow-x-auto">
      {steps.map(({ label, path }, index) => {
        const step = index + 1;
        const isActive = step === activeStep;
        const isCompleted = step < activeStep;

        return (
          <div
            key={label}
            className="relative flex flex-col justify-center items-center text-center min-w-[90px] group h-[90px]"
          >
            {/* Botão com ícone */}
            <Button
              onClick={() => handleStepClick(path)}
              className={`z-10 w-10 h-10 rounded-full text-white font-bold flex items-center justify-around transition duration-300 relative
                ${
                  isActive
                    ? "bg-[#2B426E] shadow-lg scale-105"
                    : isCompleted
                    ? "bg-[#4A6AA8]"
                    : "bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={label}
            >
              {step}
            </Button>

            {/* Texto abaixo do ícone */}
            <span className="mt-2 text-xs font-medium text-gray-700 leading-tight">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
