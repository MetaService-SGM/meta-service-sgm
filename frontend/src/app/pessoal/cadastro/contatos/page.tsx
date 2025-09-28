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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { useRouter } from "next/navigation"; 
import { useState } from "react"; 
import toast from "react-hot-toast";

// Schema de validação com mensagens personalizadas
const contactSchema = z.object({
  mobileCarrier1: z.string().min(1, "Selecione uma operadora"),
  mobile1: z
    .string()
    .min(15, "Digite um número completo")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido (99) 99999-9999"),
  mobileCarrier2: z.string().optional(),
  mobile2: z
    .string()
    .regex(/^$|^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido (99) 99999-9999") // ✅ Corrigido: permite string vazia
    .optional(),
  emergencyContact: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres"),
  relationship: z.string().min(1, "Selecione um vínculo"),
  emergencyCarrier: z.string().min(1, "Selecione uma operadora"),
  emergencyPhone: z
    .string()
    .min(15, "Digite um número completo")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido (99) 99999-9999"),
  personalEmail: z
    .string()
    .email("Digite um email válido")
    .max(100, "Máximo 100 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Operadoras disponíveis
const carriers = [
  { value: "vivo", label: "Vivo" },
  { value: "claro", label: "Claro" },
  { value: "tim", label: "Tim" },
  { value: "oi", label: "Oi" },
  { value: "outro", label: "Outro" },
];

// Relacionamentos disponíveis
const relationships = [
  { value: "spouse", label: "Cônjuge" },
  { value: "parent", label: "Pai/Mãe" },
  { value: "child", label: "Filho(a)" },
  { value: "sibling", label: "Irmão(ã)" },
  { value: "friend", label: "Amigo(a)" },
  { value: "other", label: "Outro" },
];

export default function ContactRegistration() { 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter(); 

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      mobileCarrier1: "",
      mobile1: "",
      mobileCarrier2: "",
      mobile2: "",
      emergencyContact: "",
      relationship: "",
      emergencyCarrier: "",
      emergencyPhone: "",
      personalEmail: "",
    },
  });

  // Função de máscara para telefone
  const applyPhoneMask = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`.slice(0, 15);
  };

  // Função para salvar rascunho
  const onSaveDraft = async () => { 
    const formData = form.getValues();
    try {
      localStorage.setItem("contact-draft", JSON.stringify(formData));
      console.log("Rascunho salvo");
      
      // Mostra feedback para o usuário
      toast.success("Rascunho salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
    }
  };

  // Função de submit 
  const onSubmit = async (data: ContactFormData) => { 
    setIsSubmitting(true);
    try {
      console.log("Dados de contato enviados:", data);
      
      // Aqui você pode adicionar a lógica de API
      // await api.post('/employees/contact', data);
      
      // Salva os dados antes de navegar
      localStorage.setItem("contact-data", JSON.stringify(data));
      
      // Navega para a próxima página
      router.push("/pessoal/cadastro/documentos"); 
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Você pode adicionar tratamento de erro aqui (ex: toast de erro)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para próximo (com validação)
  const handleNextPage = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        // Se válido, submete o formulário
        form.handleSubmit(onSubmit)();
      } else {
        console.log("Formulário contém erros. Corrija antes de prosseguir.");

        // Scroll para o primeiro erro
        const firstError = Object.keys(form.formState.errors)[0];
        if (firstError) {
          const element = document.querySelector(`[name="${firstError}"]`);
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  };

  // Função para anterior (sem validação)
  const handlePreviousPage = () => {
    // Salva o rascunho antes de navegar
    onSaveDraft();
    router.push("/pessoal/cadastro/contatos"); // Volta para página anterior 
  };

  // Função para cancelar
  const handleCancel = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados?")) {
      form.reset();
      localStorage.removeItem("contact-draft");
    }
  };

  // Carregar rascunho salvo (opcional)
  const loadDraft = () => {
    try {
      const draft = localStorage.getItem("contact-draft");
      if (draft) {
        const parsedDraft = JSON.parse(draft);
        form.reset(parsedDraft);
        console.log("Rascunho carregado");
      }
    } catch (error) {
      console.error("Erro ao carregar rascunho:", error);
    }
  };

  // Carregar rascunho quando o componente montar
  useState(() => {
    loadDraft();
  });

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={3} />

          <fieldset className="space-y-6">
            <legend className="sr-only">Informações de Contato</legend>

            {/* Seção Telefones Pessoais */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Telefones Pessoais
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Celular 1 */}
                <FormField
                  control={form.control}
                  name="mobileCarrier1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operadora do Celular 1 *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={form.formState.errors.mobileCarrier1 ? "border-red-500" : ""}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {carriers.map((carrier) => (
                              <SelectItem
                                key={carrier.value}
                                value={carrier.value}
                              >
                                {carrier.label}
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
                  name="mobile1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Celular 1 *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(99) 99999-9999"
                          {...field}
                          onChange={(e) => {
                            const maskedValue = applyPhoneMask(e.target.value);
                            field.onChange(maskedValue);
                          }}
                          className={form.formState.errors.mobile1 ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Celular 2 */}
                <FormField
                  control={form.control}
                  name="mobileCarrier2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operadora do Celular 2</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {carriers.map((carrier) => (
                              <SelectItem
                                key={carrier.value}
                                value={carrier.value}
                              >
                                {carrier.label}
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
                  name="mobile2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Celular 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(99) 99999-9999"
                          {...field}
                          onChange={(e) => {
                            const maskedValue = applyPhoneMask(e.target.value);
                            field.onChange(maskedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Seção Contato de Emergência */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Contato de Emergência
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Contato *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Maria Silva"
                          {...field}
                          maxLength={50}
                          className={form.formState.errors.emergencyContact ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vínculo *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={form.formState.errors.relationship ? "border-red-500" : ""}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {relationships.map((rel) => (
                              <SelectItem key={rel.value} value={rel.value}>
                                {rel.label}
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
                  name="emergencyCarrier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operadora *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={form.formState.errors.emergencyCarrier ? "border-red-500" : ""}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {carriers.map((carrier) => (
                              <SelectItem
                                key={carrier.value}
                                value={carrier.value}
                              >
                                {carrier.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone de Emergência *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(99) 99999-9999"
                          {...field}
                          onChange={(e) => {
                            const maskedValue = applyPhoneMask(e.target.value);
                            field.onChange(maskedValue);
                          }}
                          className={form.formState.errors.emergencyPhone ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Pessoal *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="exemplo@email.com"
                          {...field}
                          maxLength={100}
                          className={form.formState.errors.personalEmail ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <FormActionsButton
            onCancel={handleCancel}
            disabled={isSubmitting}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            previousLabel="Voltar"
            nextLabel={isSubmitting ? "Enviando..." : "Próximo"}
            cancelLabel="Limpar"
            onSaveDraft={onSaveDraft}
          />
        </form>
      </Form>
    </PageLayout>
  );
}