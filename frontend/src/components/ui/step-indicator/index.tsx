"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Dados Pessoais", path: "/pessoal/cadastro/dadosPessoais" },
  { label: "Endereço", path: "/pessoal/cadastro/endereco" },
  { label: "Contatos", path: "/" },
  { label: "Dados Contratuais", path: "/" },
  { label: "Documentos", path: "/" },
  { label: "Dependentes", path: "/" },
  {
    label: "Informações Pessoais",
    path: "/pessoal/cadastro/informacoes-pessoais",
  },
];

interface StepIndicatorProps {
  activeStep: number;
}

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold text-[#2B426E]">
        Cadastro de Colaboradores
      </h1>

      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between  p-4 rounded-xl ">
        {steps.map((stepItem, index) => {
          const step = index + 1;
          const isActive = step === activeStep;
          const isCompleted = step < activeStep;

          return (
            <div
              key={stepItem.label}
              className="flex-1 flex flex-col items-center text-center relative min-w-[75px] sm:min-w-0"
            >
              {index > 0 && (
                <div className="absolute top-4 left-0 w-full z-0 h-[2px]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="origin-left h-full bg-[#2B426E]"
                  />
                </div>
              )}

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => router.push(stepItem.path)}
                className={`cursor-pointer z-10 w-9 h-9 flex items-center justify-center rounded-full font-bold text-white
                  ${
                    isActive
                      ? "bg-[#2B426E]"
                      : isCompleted
                      ? "bg-[#4A6AA8]"
                      : "bg-gray-300"
                  }
                `}
              >
                {step}
              </motion.div>

              <span className="text-[0.7rem] mt-1 break-words">
                {stepItem.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
