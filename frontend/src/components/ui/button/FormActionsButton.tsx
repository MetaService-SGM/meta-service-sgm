"use client";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClick?: () => void;
  onCancel?: () => void;
  onSaveDraft?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  disabled?: boolean;
}

export function FormActionsButton({
  onCancel,
  onSaveDraft,
  onNext,
  nextLabel = "Próximo",
  disabled = false 
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4 my-6">
      
      <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
        Cancelar
      </Button>
      <Button type="button" variant="secondary" size="lg" onClick={onSaveDraft} >
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
