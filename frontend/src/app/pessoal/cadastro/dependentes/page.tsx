"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { TbPhotoUp } from "react-icons/tb";

const relationshipOptions = [
  { value: "filho", label: "Filho(a)" },
  { value: "conjuge", label: "Cônjuge" },
  { value: "pai", label: "Pai/Mãe" },
  { value: "outro", label: "Outro" },
];

const formSchema = z.object({
  dependents: z.array(
    z.object({
      nome: z.string().min(3, "Nome é obrigatório"),
      parentesco: z.string().min(1, "Parentesco é obrigatório"),
      dataNascimento: z.date(),
      documento: z.instanceof(File).optional(),
      idade: z.number().optional(),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function DependentsPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dependents: [
        {
          nome: "",
          parentesco: "",
          dataNascimento: new Date(),
          documento: undefined,
          idade: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dependents",
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados dos dependentes:", data);
    // Lógica para salvar os dados
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={6} />

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Dependentes
            </h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-8 border-b pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-medium mb-4 text-gray-700">
                  Dependente {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.nome`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Nome*</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...formField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`dependents.${index}.parentesco`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Parentesco*
                        </FormLabel>
                        <Select
                          onValueChange={formField.onChange}
                          value={formField.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {relationshipOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.dataNascimento`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Data de Nascimento*
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={formField.value}
                            onChange={(date) => {
                              formField.onChange(date);
                              form.setValue(
                                `dependents.${index}.idade`,
                                calculateAge(date)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <FormItem>
                      <FormLabel className="text-gray-700">Idade</FormLabel>
                      <div className="h-10 flex items-center">
                        {form.watch(`dependents.${index}.dataNascimento`) &&
                          calculateAge(
                            form.watch(`dependents.${index}.dataNascimento`)
                          ) + " anos"}
                      </div>
                    </FormItem>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.documento`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Documento de Identificação
                        </FormLabel>
                        <div className="relative w-full">
                          <TbPhotoUp
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B426E]"
                            size={18}
                          />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              formField.onChange(file);
                            }}
                            className="bg-background pl-10 pr-4 file:bg-[#2B426E] file:text-white file:px-4 file:py-1 file:rounded-md file:border-none hover:file:bg-[#1f2f4f] file:cursor-pointer"
                          />
                          {formField.value?.name && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Selecionado: {formField.value.name}
                            </p>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-4 text-red-500 hover:text-red-600 whitespace-nowrap min-w-[180px]"
                    onClick={() => remove(index)}
                  >
                    Remover Dependente {index + 1}
                  </Button>
                )}
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <Button
                type="button"
                variant="outline"
                className="whitespace-nowrap min-w-[220px]"
                onClick={() =>
                  append({
                    nome: "",
                    parentesco: "",
                    dataNascimento: new Date(),
                    documento: undefined,
                    idade: 0,
                  })
                }
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Adicionar novo Dependente
              </Button>
            </div>
          </div>

          <FormActionsButton />
        </form>
      </Form>
    </PageLayout>
  );
}
