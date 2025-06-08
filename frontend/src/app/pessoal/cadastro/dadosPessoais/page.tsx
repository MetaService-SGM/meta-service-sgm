"use client";


import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import { Checkbox } from "@/components/ui/checkbox";

const genderOptions = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "nao_informar", label: "Prefiro não informar" },
  { value: "outro", label: "Outro" },
];

const raceOptions = [
  { value: "branca", label: "Branca" },
  { value: "preta", label: "Preta" },
  { value: "parda", label: "Parda" },
  { value: "amarela", label: "Amarela" },
  { value: "indigena", label: "Indígena" },
  { value: "nao_declarar", label: "Prefiro não declarar" },
];

const maritalStatusOptions = [
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
  { value: "uniao_estavel", label: "União estável" },
];

const formSchema = z.object({
  nome: z.string().min(3),
  nomeSocial: z.string().optional(),
  dataNascimento: z.date(),
  genero: z.string(),
  raca: z.string(),
  estadoCivil: z.string(),
  pais: z.string().min(2),
  nacionalidade: z.string().min(2),
  foto: z.any().optional(),
  deficiencia: z.boolean().optional(),
  tipoDeficiencia: z.string().optional(),
  escolaridade: z.string(),
  tecnico: z.string().optional(),
  superior: z.string().optional(),
  posGraduacao: z.string().optional(),
  nacionalidadePai: z.string().optional(),
  nomePai: z.string().optional(),
  nacionalidadeMae: z.string().optional(),
  nomeMae: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormFieldWrapper = ({
  label,
  children,
  className = "",
  error,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) => (
  <div className={`space-y-2 ${className}`}>
    <Label>{label}</Label>
    {children}
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);

export default function EmployeeRegistration() {
  const [hasDisability, setHasDisability] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Nenhum arquivo selecionado");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  return (
    <PageLayout>
      
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StepIndicator activeStep={1} />

          {/* Primeira linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper label="Nome Completo" error={errors.nome?.message}>
              <Input {...register("nome")} placeholder="Digite seu nome completo" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Nome Social / Apelido">
              <Input {...register("nomeSocial")} placeholder="Digite seu nome social" />
            </FormFieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormFieldWrapper label="Data de Nascimento" error={errors.dataNascimento?.message}>
             <DatePicker />
            </FormFieldWrapper>

            <FormFieldWrapper label="Gênero" error={errors.genero?.message}>
              <Controller
                control={control}
                name="genero"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Raça / Cor" error={errors.raca?.message}>
              <Controller
                control={control}
                name="raca"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {raceOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormFieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormFieldWrapper label="Estado Civil" error={errors.estadoCivil?.message}>
              <Controller
                control={control}
                name="estadoCivil"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {maritalStatusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="País" error={errors.pais?.message}>
              <Input {...register("pais")} placeholder="Digite o país" />
            </FormFieldWrapper>

            <FormFieldWrapper label="Nacionalidade" error={errors.nacionalidade?.message}>
              <Input {...register("nacionalidade")} placeholder="Digite sua nacionalidade" />
            </FormFieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper label="Foto" error={errors.nome?.message}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="foto"
                {...register("foto")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedFileName(file ? file.name : "Nenhum arquivo selecionado");
                  setValue("foto", file);
                }}
              />
              {/* Linha 1 - Foto e Pessoa com Deficiência */}
              <Label htmlFor="foto" className="border px-4 py-2 rounded cursor-pointer">
                Selecionar Arquivo
              </Label>
              <p className="text-sm text-gray-500">{selectedFileName}</p>
            </FormFieldWrapper>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="deficiencia"
                  {...register("deficiencia")}
                  onCheckedChange={(checked) => setHasDisability(!!checked)}
                />
                <Label htmlFor="deficiencia">Pessoa com Deficiência</Label>
              </div>
              {hasDisability && (
                <FormFieldWrapper label="Tipo de Deficiência" error={errors.tipoDeficiencia?.message}>
                  <Input {...register("tipoDeficiencia")} placeholder="Descreva a deficiência" />
                </FormFieldWrapper>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper label="Escolaridade" error={errors.escolaridade?.message}>
              <Input {...register("escolaridade")} placeholder="Ex: Ensino Médio Completo" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Curso Técnico">
              <Input {...register("tecnico")} placeholder="Informe o curso técnico" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Ensino Superior">
              <Input {...register("superior")} placeholder="Informe o curso superior" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Pós-graduação">
              <Input {...register("posGraduacao")} placeholder="Informe sua pós-graduação" />
            </FormFieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper label="Nacionalidade do Pai">
              <Input {...register("nacionalidadePai")} placeholder="Ex: Brasileira" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Nome do Pai">
              <Input {...register("nomePai")} placeholder="Digite o nome do pai" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Nacionalidade da Mãe">
              <Input {...register("nacionalidadeMae")} placeholder="Ex: Brasileira" />
            </FormFieldWrapper>
            <FormFieldWrapper label="Nome da Mãe">
              <Input {...register("nomeMae")} placeholder="Digite o nome da mãe" />
            </FormFieldWrapper>
          </div>

          <FormActionsButton />
        </form>
     
    </PageLayout>
  );
}
