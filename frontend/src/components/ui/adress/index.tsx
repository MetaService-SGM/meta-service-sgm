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
// import { AddressInput } from "@/components/ui/input/inputFieldForm";
import { FormActionsButton } from "../button/FormActionsButton";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Corrigido: use next/navigation em vez de next/router

const addressSchema = z.object({
  cep: z
    .string()
    .min(8, "CEP deve ter 8 dígitos")
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  uf: z.string().min(1, "UF é obrigatória"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  rua: z.string().min(2, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  pontoEncontro: z.string().min(5, "Mínimo 5 caracteres"),
  referencia: z.string().min(5, "Mínimo 5 caracteres"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface BrazilianStateProps {
  uf: string;
  name: string;
  value: string;
}

// Array de estados para mapear
const statesBrazil: BrazilianStateProps[] = [
  { uf: "AC", name: "Acre", value: "acre" },
  { uf: "AL", name: "Alagoas", value: "alagoas" },
  { uf: "AP", name: "Amapá", value: "amapa" },
  { uf: "AM", name: "Amazonas", value: "amazonas" },
  { uf: "BA", name: "Bahia", value: "bahia" },
  { uf: "CE", name: "Ceará", value: "ceara" },
  { uf: "ES", name: "Espírito Santo", value: "espiritoSanto" },
  { uf: "MA", name: "Maranhão", value: "maranhao" },
  { uf: "MT", name: "Mato Grosso", value: "matoGrosso" },
  { uf: "MS", name: "Mato Grosso do Sul", value: "matoGrossoDoSul" },
  { uf: "MG", name: "Minas Gerais", value: "minasGerais" },
  { uf: "PA", name: "Pará", value: "para" },
  { uf: "PB", name: "Paraíba", value: "paraiba" },
  { uf: "PR", name: "Paraná", value: "parana" },
  { uf: "PE", name: "Pernambuco", value: "pernambuco" },
  { uf: "PI", name: "Piauí", value: "piaui" },
  { uf: "RJ", name: "Rio de Janeiro", value: "rioDeJaneiro" },
  { uf: "RN", name: "Rio Grande do Norte", value: "rioGrandeDoNorte" },
  { uf: "RS", name: "Rio Grande do Sul", value: "rioGrandeDoSul" },
  { uf: "RO", name: "Rondônia", value: "rondonia" },
  { uf: "RR", name: "Roraima", value: "roraima" },
  { uf: "SC", name: "Santa Catarina", value: "santaCatarina" },
  { uf: "SP", name: "São Paulo", value: "saoPaulo" },
  { uf: "SE", name: "Sergipe", value: "sergipe" },
  { uf: "TO", name: "Tocantins", value: "tocantins" },
  { uf: "DF", name: "Distrito Federal", value: "distritoFederal" },
];

// Componente do formulário de Endereço
export function AddressForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // ✅ Agora usando o hook correto

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      cep: "",
      uf: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
      pontoEncontro: "",
      referencia: "",
    },
  });

  // Função de máscara do CEP
  const applyCepMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  // Requisição para a API viacep
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      form.clearErrors("cep");
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao buscar CEP");

        const data = await response.json();
        if (data.erro) throw new Error("CEP não encontrado");

        // Encontra o estado correspondente ao UF retornado
        const estadoEncontrado = statesBrazil.find(
          (state) => state.uf === data.uf
        );

        // Preenche os campos
        form.setValue("cep", data.cep || "");
        form.setValue("uf", estadoEncontrado?.value || data.uf || "");
        form.setValue("cidade", data.localidade || "");
        form.setValue("bairro", data.bairro || "");
        form.setValue("rua", data.logradouro || "");

        // Limpa erros dos campos preenchidos
        form.clearErrors(["uf", "cidade", "bairro", "rua"]);
      } catch (error: unknown) {
        form.setError("cep", {
          message:
            error instanceof Error ? error.message : "Erro ao buscar CEP",
        });
      }
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
    // Salva o rascunho antes de navegar para a página anterior
    OnSaveDraft();
    router.push("/pessoal/cadastro/dadosPessoais");
  };

  // Função de submit
  const onSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Dados enviados:", data);
      // Lógica de API aqui
      router.push("/pessoal/cadastro/contatos"); // Próxima página
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para salvar rascunho (opcional)
  const OnSaveDraft = async () => {
    const formData = form.getValues();
    try {
      // Salvar no localStorage ou API como rascunho
      localStorage.setItem("address-draft", JSON.stringify(formData));
      localStorage.getItem("address-draft");
      console.log("Rascunho salvo");
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
    }
  };

  // Função para cancelar
  const handleCancel = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <fieldset className="grid grid-cols-1 gap-4">
          <legend className="text-lg font-semibold mb-4 text-gray-800">
            Endereço Pessoal
          </legend>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 00000-000"
                        {...field}
                        onChange={(e) => {
                          const maskedValue = applyCepMask(e.target.value);
                          field.onChange(maskedValue);

                          // Chama a busca do CEP quando completo
                          if (maskedValue.replace(/\D/g, "").length === 8) {
                            handleCepChange(e);
                          }
                        }}
                        onBlur={(e) => {
                          // Validação final no blur
                          const cep = e.target.value.replace(/\D/g, "");
                          if (cep.length > 0 && cep.length !== 8) {
                            form.setError("cep", {
                              message: "CEP deve ter 8 dígitos",
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF*</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={
                            form.formState.errors.uf ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statesBrazil.map((state) => (
                          <SelectItem key={state.uf} value={state.value}>
                            {state.uf} - {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        {...field}
                        className={
                          form.formState.errors.cidade ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bairro"
                        {...field}
                        className={
                          form.formState.errors.bairro ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <FormField
                control={form.control}
                name="rua"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Rua*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: Rua das Flores"
                        {...field}
                        className={
                          form.formState.errors.rua ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Casa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: 00"
                        {...field}
                        className={
                          form.formState.errors.numero ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Ponto de Encontro
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pontoEncontro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local de Encontro*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui..."
                        {...field}
                        className={
                          form.formState.errors.pontoEncontro
                            ? "border-red-500"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ponto de Referência*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui..."
                        {...field}
                        className={
                          form.formState.errors.referencia
                            ? "border-red-500"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormActionsButton
            onCancel={handleCancel}
            disabled={isSubmitting}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            previousLabel="Voltar"
            nextLabel={isSubmitting ? "Enviando..." : "Próximo"}
            cancelLabel="Limpar"
            onSaveDraft={OnSaveDraft}
          />
        </fieldset>
      </form>
    </Form>
  );
}
