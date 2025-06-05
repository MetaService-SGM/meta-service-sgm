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

  // Dentro do componente AddressForm
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          form.setValue("cep", data.cep);
          form.setValue("uf", data.uf);
          form.setValue("cidade", data.localidade);
          form.setValue("bairro", data.bairro);
          form.setValue("rua", data.logradouro);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };
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
                        field.onChange(e);
                        handleCepChange(e);
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
                        <SelectValue
                          placeholder="Escolha o Estado"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acre">AC</SelectItem>
                        <SelectItem value="alagoas">AL</SelectItem>
                        <SelectItem value="amapa">AP</SelectItem>
                        <SelectItem value="amazonas">AM</SelectItem>
                        <SelectItem value="bahia">BA</SelectItem>
                        <SelectItem value="ceara">CE</SelectItem>
                        <SelectItem value="EspiritoSanto">ES</SelectItem>
                        <SelectItem value="goias">GO</SelectItem>
                        <SelectItem value="maranhao">MA</SelectItem>
                        <SelectItem value="matoGrosso">MT</SelectItem>
                        <SelectItem value="matoGrossoDoSul">MS</SelectItem>
                        <SelectItem value="minasGerais">MG</SelectItem>
                        <SelectItem value="para">PA</SelectItem>
                        <SelectItem value="paraiba">PB</SelectItem>
                        <SelectItem value="parana">PR</SelectItem>
                        <SelectItem value="pernambuco">PE</SelectItem>
                        <SelectItem value="piaui">PI</SelectItem>
                        <SelectItem value="rioDeJaneiro">RJ</SelectItem>
                        <SelectItem value="rioGrandeDoNorte">RN</SelectItem>
                        <SelectItem value="rioGrandeDoSul">RS</SelectItem>
                        <SelectItem value="rondonia">RO</SelectItem>
                        <SelectItem value="roraima">RR</SelectItem>
                        <SelectItem value="santaCatarina">SC</SelectItem>
                        <SelectItem value="saoPaulo">SP</SelectItem>
                        <SelectItem value="sergipe">SE</SelectItem>
                        <SelectItem value="tocantins">TO</SelectItem>
                        <SelectItem value="distritoFederal">DF</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Input placeholder="Cidade" {...field} />
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
                    <Input placeholder="Bairro" {...field} />
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
                    será o ponto de encontro do funcionário para O.S. e outros
                    fins
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
      </form>
    </Form>
  );
}
