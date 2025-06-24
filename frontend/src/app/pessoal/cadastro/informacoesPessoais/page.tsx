"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { DatePicker } from "@/components/ui/date-picker";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { TbPhotoUp } from "react-icons/tb";
import { useEffect, useState } from "react";

const formSchema = z.object({
  certificado: z.object({
    dataEmissao: z.date(),
    dataValidade: z.date(),
    documento: z.instanceof(File).optional(),
  }),
  aso: z.object({
    dataEmissao: z.date(),
    dataValidade: z.date(),
    documento: z.instanceof(File).optional(),
  }),
  medidas: z.object({
    camisa: z.string(),
    calca: z.string(),
    calcado: z.string(),
    peso: z.string(),
    altura: z.string(),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function PersonalInfoStep() {
  const [diasCertificado, setDiasCertificado] = useState<number | null>(null);
  const [diasASO, setDiasASO] = useState<number | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificado: {
        dataEmissao: new Date(),
        dataValidade: new Date(),
        documento: undefined,
      },
      aso: {
        dataEmissao: new Date(),
        dataValidade: new Date(),
        documento: undefined,
      },
      medidas: {
        camisa: "",
        calca: "",
        calcado: "",
        peso: "",
        altura: "",
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados pessoais:", data);
    // Lógica para salvar os dados
  };

  // Calcula dias restantes para certificado
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name?.startsWith("certificado.dataValidade") ||
        name?.startsWith("certificado.dataEmissao")
      ) {
        const validade = value.certificado?.dataValidade;
        if (validade) {
          const hoje = new Date();
          const diffTime = Math.max(
            new Date(validade).getTime() - hoje.getTime(),
            0
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDiasCertificado(diffDays);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Calcula dias restantes para ASO
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name?.startsWith("aso.dataValidade") ||
        name?.startsWith("aso.dataEmissao")
      ) {
        const validade = value.aso?.dataValidade;
        if (validade) {
          const hoje = new Date();
          const diffTime = Math.max(
            new Date(validade).getTime() - hoje.getTime(),
            0
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDiasASO(diffDays);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={7} />

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Informações Pessoais
            </h2>

            {/* Certificado */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Certificado</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="certificado.dataEmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Emissão</FormLabel>
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
                  name="certificado.dataValidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Validade</FormLabel>
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
                <FormItem>
                  <FormLabel>Expira em Dias</FormLabel>
                  <div className="h-10 flex items-center border rounded-md px-3 bg-muted">
                    {diasCertificado !== null
                      ? `${diasCertificado} Dias`
                      : "Calculando..."}
                  </div>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="certificado.documento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anexar Documento</FormLabel>
                    <div className="relative w-full">
                      <TbPhotoUp
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B426E]"
                        size={18}
                      />
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="bg-background pl-10 pr-4 file:bg-[#2B426E] file:text-white file:px-4 file:py-1 file:rounded-md file:border-none hover:file:bg-[#1f2f4f] file:cursor-pointer"
                      />
                      {field.value?.name && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selecionado: {field.value.name}
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ASO */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                ASO (Atestado de Saúde Ocupacional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="aso.dataEmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Emissão</FormLabel>
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
                  name="aso.dataValidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Validade</FormLabel>
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
                <FormItem>
                  <FormLabel>Expira em Dias</FormLabel>
                  <div className="h-10 flex items-center border rounded-md px-3 bg-muted">
                    {diasASO !== null ? `${diasASO} Dias` : "Calculando..."}
                  </div>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="aso.documento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anexar Documento</FormLabel>
                    <div className="relative w-full">
                      <TbPhotoUp
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B426E]"
                        size={18}
                      />
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="bg-background pl-10 pr-4 file:bg-[#2B426E] file:text-white file:px-4 file:py-1 file:rounded-md file:border-none hover:file:bg-[#1f2f4f] file:cursor-pointer"
                      />
                      {field.value?.name && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selecionado: {field.value.name}
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Medidas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Tamanho</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <FormField
                  control={form.control}
                  name="medidas.camisa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Camisa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: M" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medidas.calca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calça</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 38" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medidas.calcado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calçado</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 41" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medidas.peso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 80kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medidas.altura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1.72m" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormActionsButton />
        </form>
      </Form>
    </PageLayout>
  );
}
