"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "@/components/ui/date-picker";

// Geração dinâmica de opções de horário
const generateTimeOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    const hour = i.toString().padStart(2, "0");
    options.push({
      value: `${hour}:00`,
      label: `${hour}:00`,
    });
  }
  return options;
};

const allHours = generateTimeOptions(0, 23);

// Horários por turno
const shiftHours = {
  manha: generateTimeOptions(6, 11),
  tarde: generateTimeOptions(12, 17),
  noite: generateTimeOptions(18, 23),
  integral: generateTimeOptions(0, 23),
};

// Schema de validação
const contractSchema = z.object({
  registration: z.string().uuid(),
  department: z.string().min(2, "Mínimo 2 caracteres"),
  position: z.string().min(1, "Selecione um cargo"),
  contractType: z.string().min(1, "Selecione um tipo"),
  unit: z.string().min(2, "Mínimo 2 caracteres"),
  shift: z.string().min(1, "Selecione um turno"),
  startTime: z.string().min(1, "Selecione um horário inicial"),
  endTime: z.string().min(1, "Selecione um horário final"),
  hourlyWage: z.string().regex(/^\d+,\d{2}$/, "Formato inválido (0,00)"),
  admissionDate: z.date(),
  probationPeriod: z.string().min(1, "Informe o período"),
  supervisor: z.string().min(1, "Selecione um superior"),
  hierarchyLevel: z.string().min(1, "Selecione um nível"),
  contractDate: z.date(),
  contractDuration: z.string().min(1, "Informe a duração"),
  contractExpiration: z.date(),
  totalDays: z.string().regex(/^\d+$/, "Apenas números"),
});

type ContractFormData = z.infer<typeof contractSchema>;

// Opções para selects
const positions = [
  { value: "analista", label: "Analista" },
  { value: "gerente", label: "Gerente" },
  { value: "assistente", label: "Assistente" },
];

const contractTypes = [
  { value: "clt", label: "CLT" },
  { value: "pj", label: "PJ" },
  { value: "temporario", label: "Temporário" },
];

const shifts = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
  { value: "integral", label: "Integral" },
];

const hierarchyLevels = [
  { value: "junior", label: "Júnior" },
  { value: "pleno", label: "Pleno" },
  { value: "senior", label: "Sênior" },
];

export default function EmployeeRegistration() {
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      registration: uuidv4().substring(0, 8),
      department: "",
      position: "",
      contractType: "",
      unit: "",
      shift: "",
      startTime: "",
      endTime: "",
      hourlyWage: "",
      admissionDate: new Date(),
      probationPeriod: "",
      supervisor: "",
      hierarchyLevel: "",
      contractDate: new Date(),
      contractDuration: "",
      contractExpiration: new Date(),
      totalDays: "",
    },
  });

  const selectedShift = form.watch("shift");
  const selectedStartTime = form.watch("startTime");

  // Limpa os horários quando o turno muda
  useEffect(() => {
    if (selectedShift) {
      form.setValue("startTime", "");
      form.setValue("endTime", "");
    }
  }, [selectedShift, form]);

  const onSubmit = ( data: ContractFormData) => {
   
    console.log("Dados contratuais:", data);
    // Lógica para salvar os dados
  };

  // Máscara para valores monetários
  const applyMoneyMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^0+/, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");
  };

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={4} />

          <fieldset className="space-y-6">
            <legend className="text-lg font-semibold mb-6 text-gray-800">
              Dados Contratuais
            </legend>

            {/* Linha 1 - Matrícula */}
            <div>
              <FormField
                control={form.control}
                name="registration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="bg-muted cursor-not-allowed w-fit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 2 - Departamento e Cargo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Ex: Financeiro" {...field} />
                      </FormControl>
                      <Button variant="outline" type="button">
                        +
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button variant="outline" type="button">
                        +
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 3 - Tipo de Contrato e Unidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {contractTypes.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button variant="outline" type="button">
                        +
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Ex: Matriz Recife" {...field} />
                      </FormControl>
                      <Button variant="outline" type="button">
                        +
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 4 - Turno e Horários */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turno *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {shifts.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário Inicial *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!selectedShift}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedShift
                                ? "Selecione..."
                                : "Selecione um turno"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedShift ? (
                            shiftHours[
                              selectedShift as keyof typeof shiftHours
                            ].map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="no-shift-selected">
                              Selecione um turno primeiro
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário Final *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!selectedStartTime}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedStartTime
                                ? "Selecione..."
                                : "Selecione um horário inicial"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedStartTime ? (
                            allHours
                              .filter((time) => {
                                const [currentHour] = time.value
                                  .split(":")
                                  .map(Number);
                                const [startHour] = selectedStartTime
                                  .split(":")
                                  .map(Number);
                                return currentHour > startHour;
                              })
                              .map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem disabled value="no-start-time-selected">
                              Selecione um horário inicial primeiro
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 5 - Salário, Admissão e Período de Experiência */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="hourlyWage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salário Homem/Hora *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="R$ 00,00"
                        {...field}
                        onChange={(e) => {
                          const maskedValue = applyMoneyMask(e.target.value);
                          field.onChange(maskedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="admissionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Admissão *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value || null}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="probationPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período de Experiência *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 90 dias" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 6 - Superior e Hierarquia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="supervisor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Superior Direto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hierarchyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grau Hierárquico *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {hierarchyLevels.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button variant="outline" type="button">
                        +
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 7 - Datas do Contrato */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="contractDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do Contrato *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contractDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração do Contrato *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 12 meses" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contractExpiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vencimento do Contrato *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 8 - Total de Dias */}
            <div className="w-full md:w-1/3">
              <FormField
                control={form.control}
                name="totalDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Dias *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 365" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <FormActionsButton />
        </form>
      </Form>
    </PageLayout>
  );
}
