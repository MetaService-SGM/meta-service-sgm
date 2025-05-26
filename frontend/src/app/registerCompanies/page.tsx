"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

// Schema de validação (sem companyId no formulário)
const companySchema = z.object({
  companyCNPJ: z.string()
    .min(14, "CNPJ inválido")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Formato inválido (use XX.XXX.XXX/XXXX-XX)"),
  companyName: z.string().min(1, "Razão Social é obrigatória"),
  companySegment: z.string().min(1, "Segmento é obrigatório"),
  companyCity: z.string().min(1, "Cidade é obrigatória"),
  companyCEP: z.string()
    .min(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "Formato inválido (use XXXXX-XXX)"),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function RegisterCompaniesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = (data: CompanyFormData) => {
    const companyId = uuidv4(); // Gera um ID único
    const companyData = { ...data, companyId }; // Adiciona o ID aos dados
    console.log(companyData);
    toast.success("Empresa cadastrada com sucesso!");
    reset();
  };

  // Funções para formatar CNPJ e CEP enquanto o usuário digita
  const formatCNPJ = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 12) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    } else if (value.length > 8) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1.$2.$3/$4");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2.$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{3})$/, "$1.$2");
    }
    e.target.value = value;
  };

  const formatCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    }
    e.target.value = value;
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Cadastro de Empresas</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-xl shadow-md border"
        >
          {/** CNPJ */}
          <div>
            <Label htmlFor="companyCNPJ">CNPJ</Label>
            <Input
              id="companyCNPJ"
              placeholder="00.000.000/0000-00"
              {...register("companyCNPJ")}
              onChange={formatCNPJ}
            />
            {errors.companyCNPJ && (
              <p className="text-red-500 text-sm">{errors.companyCNPJ.message}</p>
            )}
          </div>

          {/** Razão Social */}
          <div>
            <Label htmlFor="companyName">Razão Social</Label>
            <Input
              id="companyName"
              placeholder="Nome completo da empresa"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName.message}</p>
            )}
          </div>

          {/** Segmento */}
          <div>
            <Label htmlFor="companySegment">Segmento</Label>
            <Input
              id="companySegment"
              placeholder="Ex: Tecnologia, Alimentício, Saúde"
              {...register("companySegment")}
            />
            {errors.companySegment && (
              <p className="text-red-500 text-sm">{errors.companySegment.message}</p>
            )}
          </div>

          {/** Cidade */}
          <div>
            <Label htmlFor="companyCity">Cidade</Label>
            <Input
              id="companyCity"
              placeholder="Ex: São Paulo, Rio de Janeiro"
              {...register("companyCity")}
            />
            {errors.companyCity && (
              <p className="text-red-500 text-sm">{errors.companyCity.message}</p>
            )}
          </div>

          {/** CEP */}
          <div>
            <Label htmlFor="companyCEP">CEP</Label>
            <Input
              id="companyCEP"
              placeholder="00000-000"
              {...register("companyCEP")}
              onChange={formatCEP}
            />
            {errors.companyCEP && (
              <p className="text-red-500 text-sm">{errors.companyCEP.message}</p>
            )}
          </div>

          {/** Botão */}
          <Button type="submit" className="w-full">
            Cadastrar Empresa
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}