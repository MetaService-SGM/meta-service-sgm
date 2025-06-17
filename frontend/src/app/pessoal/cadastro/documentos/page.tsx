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
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { Checkbox } from "@/components/ui/checkbox";

// Schema de validação
const documentsSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      "Formato inválido (use XXX.XXX.XXXX-XX)"
    ),
  estrangeiro: z.boolean().optional(),
  rg: z.string().min(5, "RG deve ter pelo menos 5 caracteres").optional(),
  tituloEleitor: z.string().min(12, "Título deve ter 12 dígitos").optional(),
  banco: z.string().optional(),
  orgaoExpedidor: z.string().optional(),
  zonaEleitoral: z.string().optional(),
  agencia: z.string().optional(),
  dataExpedicao: z.string().optional(),
  secaoEleitoral: z.string().optional(),
  contaCorrente: z.string().optional(),
});

type DocumentsFormData = z.infer<typeof documentsSchema>;

export default function EmployeeRegistration() {
  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      cpf: "",
      estrangeiro: false,
      rg: "",
      tituloEleitor: "",
      banco: "",
      orgaoExpedidor: "",
      zonaEleitoral: "",
      agencia: "",
      dataExpedicao: "",
      secaoEleitoral: "",
      contaCorrente: "",
    },
  });

  function onSubmit(data: DocumentsFormData) {
    console.log("Documentos:", data);
    // Lógica para salvar ou avançar para próxima etapa
  }

  // Função para aplicar máscara de CPF
  const applyCpfMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2")
      .slice(0, 14);
  };

  return (
    <PageLayout>
      <StepIndicator activeStep={5} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-lg font-semibold">Documentos</h2>

          {/* Seção CPF */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF *</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[15%]"
                      placeholder="000.000.000-00"
                      {...field}
                      onChange={(e) => {
                        const maskedValue = applyCpfMask(e.target.value);
                        field.onChange(maskedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Seção Estrangeiro */}
          <div className="space-y-4">
            <h3 className="font-medium">Estrangeiro</h3>
            <FormField
                  control={form.control}
                  name="estrangeiro"
                  render={({ field }) => (
                    <FormItem className="flex  gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="estrangeiro"
                          checked={field.value || false}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      
                      </div>
                    </FormItem>
                  )}
                />

            {/* Linha 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RG *</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[25%]"
                        placeholder="Ex: 11222333"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tituloEleitor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de Eleitor *</FormLabel>
                    <FormControl>
                      <Input className="w-[35%]" placeholder="Ex: 1234567891234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="banco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orgaoExpedidor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Órgão expedidor </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SDS/PE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zonaEleitoral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zona Eleitoral</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1ª Zona Eleitoral" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agência</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataExpedicao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Expedição</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 12/07/2022" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secaoEleitoral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seção Eleitoral</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Linha 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contaCorrente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta Corrente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormActionsButton />
        </form>
      </Form>
    </PageLayout>
  );
}
