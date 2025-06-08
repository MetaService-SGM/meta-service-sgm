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
import { AddressInput } from "@/components/ui/input/inputFieldForm";
import { FormActionsButton } from "../button/FormActionsButton";

const addressSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido")
    .transform((cep) => cep.replace(/-/g, "")),
  uf: z.string(),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  rua: z.string().min(2, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  pontoEncontro: z.string().min(5, "Mínimo 5 caracteres"),
  referencia: z.string().min(5, "Mínimo 5 caracteres"),
});

type AddressFormData = z.infer<typeof addressSchema>;

// Componente do formulário de Endereço
export function AddressForm() {
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

  function onSubmit(data: AddressFormData) {
    console.log("Endereço:", data);
    // Aqui você pode salvar ou ir para a próxima etapa
  }

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
        if (!response.ok) throw new Error("CEP não encontrado");
        const data = await response.json();
        if (data.erro) throw new Error("CEP não encontrado");

        // Preenche os campos
        form.setValue("cep", data.cep);
        form.setValue("uf", data.uf.toLowerCase().replace(/\s+/g, "")); // Padroniza o valor
        form.setValue("cidade", data.localidade);
        form.setValue("bairro", data.bairro);
        form.setValue("rua", data.logradouro);
      } catch (error: unknown) {
        form.setError("cep", {
          message:
            error instanceof Error
              ? error.message
              : "Erro desconhecido ao buscar CEP",
        });
      }
    }
  };

  interface BrazilianStateProps {
    uf: string;
    name: string;
    value: string;
  }

  // Array de estados para mapear
  const statesBrazil: BrazilianStateProps[] = [
    { uf: "AC", name: "Acre", value: "acre" },
    { uf: "AL", name: "Alagoas", value: "alagoas" },
    { uf: "AP", name: "Amapa", value: "amapa" },
    { uf: "AM", name: "Amazonas", value: "amazonas" },
    { uf: "BA", name: "Bahia", value: "bahia" },
    { uf: "CE", name: "Ceara", value: "ceara" },
    { uf: "ES", name: "EspiritoSanto", value: "espiritoSanto" },
    { uf: "MA", name: "Maranhao", value: "maranhao" },
    { uf: "MT", name: "MatoGrosso", value: "matoGrosso" },
    { uf: "MS", name: "MatoGrossoDoSul", value: "matoGrossoDoSul" },
    { uf: "MG", name: "MinasGerais", value: "minasGerais" },
    { uf: "PA", name: "Para", value: "para" },
    { uf: "PB", name: "Paraiba", value: "paraiba" },
    { uf: "PR", name: "Parana", value: "parana" },
    { uf: "PE", name: "Pernambuco", value: "pernambuco" },
    { uf: "PI", name: "Piaui", value: "piaui" },
    { uf: "RJ", name: "RioDeJaneiro", value: "rioDeJaneiro" },
    { uf: "RN", name: "RioGrandeDoNorte", value: "rioGrandeDoNorte" },
    { uf: "RS", name: "RioGrandeDoSul", value: "rioGrandeDoSul" },
    { uf: "RO", name: "Rondonia", value: "rondonia" },
    { uf: "RR", name: "Roraima", value: "roraima" },
    { uf: "SC", name: "SantaCatarina", value: "santaCatarina" },
    { uf: "SP", name: "SaoPaulo", value: "saoPaulo" },
    { uf: "SE", name: "Sergipe", value: "sergipe" },
    { uf: "TO", name: "Tocantins", value: "tocantins" },
    { uf: "DF", name: "DistritoFederal", value: "distritoFederal" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="grid grid-cols-1 gap-4">
          <legend className="text-lg font-semibold text-[#2B426E] mb-5">
            Endereço
          </legend>

          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 00000-000"
                      {...field}
                      onChange={(e) => {
                        const maskedValue = applyCepMask(e.target.value);
                        field.onChange(maskedValue);
                        if (maskedValue.length === 9) {
                          handleCepChange(e);
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
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        {statesBrazil.map((state) => (
                          <SelectItem key={state.uf} value={state.value}>
                            {state.uf}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AddressInput
              control={form.control}
              name="cidade"
              label="Cidade"
              placeholder="Cidade"
            />

            <AddressInput
              control={form.control}
              name="bairro"
              label="Bairro"
              placeholder="Bairro"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <AddressInput
              control={form.control}
              name="rua"
              label="Rua"
              placeholder="ex: Rua das Flores"
              className="col-span-2"
            />

            <AddressInput
              control={form.control}
              name="complemento"
              label="Complemento"
              placeholder="ex: Casa"
            />

            <AddressInput
              control={form.control}
              name="numero"
              label="Número"
              placeholder="ex: 00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AddressInput
              control={form.control}
              name="pontoEncontro"
              label="Ponto de Encontro"
              placeholder="Ponto de Encontro"
            />

            <AddressInput
              control={form.control}
              name="referencia"
              label="Ponto de Referência"
              placeholder="Ponto de Referência"
            />
          </div>
          <FormActionsButton />
        </fieldset>
      </form>
    </Form>
  );
}
