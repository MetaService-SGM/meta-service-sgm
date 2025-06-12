"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { ptBR } from "date-fns/locale";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  value,
  onChange,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date>(value || new Date());

  React.useEffect(() => {
    if (value) {
      setInternalDate(value);
    }
  }, [value]);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(internalDate, months.indexOf(month));
    setInternalDate(newDate);
    onChange?.(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(internalDate, parseInt(year));
    setInternalDate(newDate);
    onChange?.(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] justify-evenly text-left font-nunito font-normal",
            !internalDate && "text-muted-foreground"
          )}
        >
          {internalDate ? (
            format(internalDate, "PPP", { locale: ptBR })
          ) : (
            <span>Escolha a data</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-around p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(internalDate)]}
          >
            <SelectTrigger className="w-[120px] mt-2 font-nunito shadow-sm text-sm border focus:ring-2 focus:ring-[#2B426E] cursor-pointer">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleYearChange}
            value={getYear(internalDate).toString()}
          >
            <SelectTrigger className="w-[120px] mt-2 font-nunito shadow-sm text-sm border focus:ring-2 focus:ring-[#2B426E] cursor-pointer">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleSelect}
            month={internalDate}
            onMonthChange={setInternalDate}
            className="rounded-md border"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
