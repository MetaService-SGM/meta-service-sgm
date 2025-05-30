'use client';

import { motion } from 'framer-motion';

interface StepIndicatorProps {
  activeStep: number;
}

const steps = [
  "Dados Pessoais",
  "Endereço",
  "Contatos",
  "Dados Contratuais",
  "Documentos",
  "Dependentes",
  "Informações Pessoais",
];

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-gray-50 p-4 rounded-xl shadow-md">
      {steps.map((label, index) => {
        const step = index + 1;
        const isActive = step === activeStep;
        const isCompleted = step < activeStep;

        return (
          <div key={label} className="flex-1 flex flex-col items-center text-center relative min-w-[75px] sm:min-w-0">
            {/* Conector entre os steps */}
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

            {/* Círculo animado do step */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`z-10 w-9 h-9 flex items-center justify-center rounded-full font-bold text-white
                ${isActive ? "bg-[#2B426E]" : isCompleted ? "bg-[#4A6AA8]" : "bg-gray-300"}
              `}
            >
              {step}
            </motion.div>

            {/* Label do step */}
            <span className="text-[0.7rem] mt-1 break-words">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
