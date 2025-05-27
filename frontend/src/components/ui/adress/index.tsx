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
  FormMessage
} from "../form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const addressSchema = z.object({
  cep: z.string().min(8, "CEP inválido"),
  uf: z.string().min(2),
  cidade: z.string(),
  bairro: z.string(),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  pontoEncontro: z.string(),
  referencia: z.string()
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
      referencia: ""
    }
  });

  function onSubmit(data: AddressFormData) {
    console.log("Endereço:", data);
    // Aqui você pode salvar ou ir para a próxima etapa
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="grid grid-cols-1 gap-4">
          <legend className="text-lg font-semibold text-[#2B426E]">Endereço</legend>

          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 00000-000" {...field} />
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
                    <Input placeholder="Escolha o Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Escolha a Cidade" {...field} />
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
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Escolha o Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Rua das Flores" {...field} />
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
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pontoEncontro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto de Encontro</FormLabel>
                  <FormControl>
                    <Input placeholder="Ponto de Encontro" {...field} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    será o ponto de encontro do funcionário para O.S. e outros fins
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto de Referência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ponto de Referência" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="button" variant="secondary">
            Salvar rascunho
          </Button>
          <Button type="submit" className="bg-[#2B426E] hover:bg-[#1f2f4f] text-white">
            Próximo
          </Button>
        </div>
      </form>
    </Form>
  );
}
