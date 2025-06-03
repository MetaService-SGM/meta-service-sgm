"use client";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel?: () => void;
  onSaveDraft?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function FormActionsButton({
  onCancel,
  onSaveDraft,
  onNext,
  nextLabel = "Próximo",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="button" variant="secondary" onClick={onSaveDraft}>
        Salvar rascunho
      </Button>
      <Button
        type="submit"
        className="bg-[#2B426E] hover:bg-[#1f2f4f] text-white"
        onClick={onNext}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
