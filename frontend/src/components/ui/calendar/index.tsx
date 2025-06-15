"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { ptBR } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const customPtBR = {
  ...ptBR,
  localize: {
    ...ptBR.localize,
    day: (n: number) => {
      const shortWeekdays = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
      return shortWeekdays[n];
    },
  },
};

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="flex justify-center items-center w-full">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "p-4 pt-6 font-nunito bg-white rounded-xl shadow-md border border-gray-200 w-fit mx-auto",
          className
        )}
        locale={customPtBR}
        classNames={{
          months:
            "flex flex-col space-y-4",
          month: "space-y-8",

          caption: "flex items-center px-2 relative h-10 mb-4",
          caption_label:
            "text-lg font-semibold text-center w-full absolute left-0 right-0 pointer-events-none text-gray-800",

          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 rounded-full", // Botões de navegação maiores e redondos
            "hover:bg-[#2B426E]/10 hover:text-[#2B426E]", // Efeito hover sutil
            "transition-colors duration-200" // Transição suave
          ),
          nav_button_previous: "absolute left-2",
          nav_button_next: "absolute right-2",
          head_row: "grid grid-cols-7 gap-x-2 mb-2",
          head_cell: // Cabeçalho
            cn(
            "text-gray-500 font-medium text-xs",
            "h-6 w-10 flex items-center justify-center mx-auto",
            "uppercase tracking-wider"
          ),

          row: "grid grid-cols-7 gap-x-2 gap-y-2 ",
          cell:  cn(
            "h-10 w-10 flex justify-center items-center", // Botões mais espaçosos
            "text-sm relative p-0 mx-auto"
          ),

          day: cn(
            "h-10 w-10 p-4 text-sm font-semibold rounded-lg", // Tamanho fixo e centralização
            "bg-white text-gray-800 shadow-sm", 
            
            "transition-all duration-200 ease-in-out",
            "hover:bg-[#2B426E]/90 hover:text-white hover:shadow-md",
            "aria-selected:bg-[#2B426E] aria-selected:text-white",
            "focus:outline-none focus:ring-2 focus:ring-[#2B426E]/20",
            "cursor-pointer"
          ),

          day_selected: cn(
            "bg-[#2B426E] text-white font-bold",
            "hover:bg-[#1f3a5c] hover:shadow-md",
            "shadow-md ring-1 ring-[#2B426E]/30"
          ),
          day_today: cn(
            "border-2 border-[#2B426E] font-bold",
            "hover:border-[#2B426E]/80", // Hover sutil na borda
            "aria-selected:border-white" // Borda branca quando selecionado
          ),
          day_outside: cn(
            "text-gray-400 hover:text-gray-500", // Hover mais sutil
            "aria-selected:text-gray-400 aria-selected:bg-gray-100/50",
            "dark:text-gray-500 dark:hover:text-gray-400" // Suporte para dark mode
          ),
          day_disabled: cn(
            "text-gray-300 opacity-70",
            "hover:text-gray-300 hover:bg-transparent", // Remove efeito hover
            "cursor-not-allowed" // Ícone de não permitido
          ),
          day_range_middle: cn(
            "aria-selected:bg-[#2B426E]/10",
            "aria-selected:text-gray-800",
            "dark:aria-selected:text-gray-200" // Dark mode
          ),
          day_hidden: "invisible opacity-0", // Transição suave ao esconder
          ...classNames,
        }}
        components={{
          PreviousMonthButton: ({ ...props }) => (
            <Button
              {...props}
              className="absolute left-1 h-7 w-7 p-0 hover:opacity-100 flex items-center justify-center"
              size={"icon"}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ),
          NextMonthButton: ({ ...props }) => (
            <Button
              {...props}
              className="absolute right-1 h-7 w-7 p-0  hover:opacity-100 flex items-center justify-center"
              size={"icon"}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ),
        }}
        {...props}
      />
    </div>
  );
}
