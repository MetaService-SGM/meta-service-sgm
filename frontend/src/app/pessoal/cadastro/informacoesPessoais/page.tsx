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
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { DatePicker } from "@/components/ui/date-picker";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { TbPhotoUp } from "react-icons/tb";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";

const formSchema = z.object({
  certificados: z.array(
    z.object({
      nome: z.string().min(1, "O nome do certificado é obrigatório"),
      dataEmissao: z.date(),
      dataValidade: z.date(),
      documento: z.instanceof(File).optional(),
    })
  ).min(1, "Pelo menos um certificado é obrigatório"),
  aso: z.object({
    nomeASO: z.string().min(1, "O nome é obrigatório"),
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
  const [diasASO, setDiasASO] = useState<number | null>(null);
  const [diasCertificados, setDiasCertificados] = useState<(number | null)[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificados: [{
        nome: "",
        dataEmissao: new Date(),
        dataValidade: new Date(),
        documento: undefined,
      }],
      aso: {
        nomeASO: "",
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

  const { fields: certificadosFields, append: appendCertificado, remove: removeCertificado } = useFieldArray({
    control: form.control,
    name: "certificados",
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados pessoais:", data);
    // Lógica para salvar os dados
  };

  const calcularDiasRestantes = useCallback((dataValidade: Date | undefined) => {
    if (!dataValidade) return null;
    
    const hoje = new Date();
    const diffTime = Math.max(
      new Date(dataValidade).getTime() - hoje.getTime(),
      0
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  // Calcula dias restantes para ASO
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name?.startsWith("aso.dataValidade") ||
        name?.startsWith("aso.dataEmissao")
      ) {
        const dias = calcularDiasRestantes(value.aso?.dataValidade);
        setDiasASO(dias);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, calcularDiasRestantes]);

  // Calcula dias restantes para todos os certificados
useEffect(() => {
  const subscription = form.watch((value, { name }) => {
    if (name?.startsWith("certificados")) {
      const dias = value.certificados?.map(certificado => 
        calcularDiasRestantes(certificado?.dataValidade)
      ) || [];
      setDiasCertificados(dias);
    }
  });
  return () => subscription.unsubscribe();
}, [form, calcularDiasRestantes]);

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={7} />

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Informações Pessoais
            </h2>

            {/* Certificados */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Certificados</h3>
              
              {certificadosFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Certificado {index + 1}</h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCertificado(index)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`certificados.${index}.nome`}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Nome do Certificado*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o nome do certificado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name={`certificados.${index}.dataEmissao`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Emissão*</FormLabel>
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
                      name={`certificados.${index}.dataValidade`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data da Validade*</FormLabel>
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
                        {diasCertificados[index] !== undefined
                          ? `${diasCertificados[index]} Dias`
                          : "Calculando..."}
                      </div>
                    </FormItem>
                  </div>

                  <FormField
                    control={form.control}
                    name={`certificados.${index}.documento`}
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
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => appendCertificado({
                  nome: "",
                  dataEmissao: new Date(),
                  dataValidade: new Date(),
                  documento: undefined,
                })}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Adicionar Certificado
              </Button>
            </div>

            {/* ASO */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                ASO (Atestado de Saúde Ocupacional)
              </h3>

              <FormField
                control={form.control}
                name="aso.nomeASO"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do ASO*</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do ASO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="aso.dataEmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Emissão*</FormLabel>
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
                      <FormLabel>Data da Validade*</FormLabel>
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