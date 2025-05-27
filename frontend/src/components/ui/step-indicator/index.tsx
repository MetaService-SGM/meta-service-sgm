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
  "Informações Pessoais"
];

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      {steps.map((label, index) => {
        const step = index + 1;
        const isActive = step === activeStep;

        return (
          <div key={label} className="flex flex-col items-center flex-1 text-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                isActive ? "bg-[#2B426E]" : "bg-gray-300"
              }`}
            >
              {step}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
