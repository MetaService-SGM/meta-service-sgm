"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";


const companySchema = z.object({
  cnpj: z.string()
    .min(14, "CNPJ inválido")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Formato inválido (use XX.XXX.XXX/XXXX-XX)"),
  razao_social: z.string().min(1, "Razão Social é obrigatória"),
  nome_fantasia: z.string().optional(),
  inscricao_estadual: z.string().optional(),
  inscricao_municipal: z.string().optional(),
  segmento: z.string().min(1, "Segmento é obrigatório"),
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
    console.log(data);
    toast.success("Empresa cadastrada com sucesso!");
    reset();
  };

  // formata CNPJ enquanto o usuário digita
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

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Empresas</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                {...register("cnpj")}
                onChange={formatCNPJ}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.cnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cnpj.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="razao_social" className="block text-sm font-medium text-gray-700 mb-1">
                Razão Social
              </Label>
              <Input
                id="razao_social"
                placeholder="Nome completo da empresa"
                {...register("razao_social")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.razao_social && (
                <p className="mt-1 text-sm text-red-600">{errors.razao_social.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="nome_fantasia" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Fantasia
              </Label>
              <Input
                id="nome_fantasia"
                placeholder="Nome comercial da empresa"
                {...register("nome_fantasia")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="segmento" className="block text-sm font-medium text-gray-700 mb-1">
                Segmento
              </Label>
              <Input
                id="segmento"
                placeholder="Ex: Tecnologia, Alimentício"
                {...register("segmento")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.segmento && (
                <p className="mt-1 text-sm text-red-600">{errors.segmento.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="inscricao_estadual" className="block text-sm font-medium text-gray-700 mb-1">
                Inscrição Estadual
              </Label>
              <Input
                id="inscricao_estadual"
                placeholder="Inscrição estadual (se aplicável)"
                {...register("inscricao_estadual")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="inscricao_municipal" className="block text-sm font-medium text-gray-700 mb-1">
                Inscrição Municipal
              </Label>
              <Input
                id="inscricao_municipal"
                placeholder="Inscrição municipal (se aplicável)"
                {...register("inscricao_municipal")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              className="w-full m-1/2 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              variant={"login"}
            >
              Cadastrar Empresa
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}