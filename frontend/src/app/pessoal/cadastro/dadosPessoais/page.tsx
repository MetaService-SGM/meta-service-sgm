"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadIcon } from "lucide-react";
// import { useRouter } from "next/navigation";

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

const levelOfEducationOptions = [
  { value: "nao_alfabetizado", label: "Não alfabetizado(a)" },
  { value: "fundamental_incompleto", label: "Ensino Fundamental incompleto" },
  { value: "fundamental_completo", label: "Ensino Fundamental completo" },
  { value: "medio_incompleto", label: "Ensino Médio incompleto" },
  { value: "medio_completo", label: "Ensino Médio completo" },
  { value: "tecnico", label: "Ensino Técnico" },
  { value: "superior_incompleto", label: "Ensino Superior incompleto" },
  { value: "superior_completo", label: "Ensino Superior completo" },
  { value: "pos_graduacao", label: "Pós-graduação (Especialização)" },
  { value: "mestrado", label: "Mestrado" },
  { value: "doutorado", label: "Doutorado" },
  { value: "pos_doutorado", label: "Pós-doutorado" },
];

const disabilityOptions = [
  { value: "fisica", label: "Deficiência Física" },
  { value: "auditiva", label: "Deficiência Auditiva" },
  { value: "visual", label: "Deficiência Visual" },
  { value: "intelectual", label: "Deficiência Intelectual" },
];

const formSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório"),
  nomeSocial: z.string().optional(),
  dataNascimento: z.date(),
  genero: z.string(),
  raca: z.string(),
  estadoCivil: z.string(),
  pais: z.string().min(2, "País é obrigatório"),
  nacionalidade: z.string().min(2, "Nacionalidade é obrigatória"),
  foto: z.any().optional(),
  deficiencia: z.boolean().optional(),
  tipoDeficiencia: z.string().optional(),
  escolaridade: z.string(),
  nacionalidadePai: z.string().optional(),
  nomePai: z.string().optional(),
  nacionalidadeMae: z.string().optional(),
  nomeMae: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EmployeeRegistration() {
  const [hasDisability, setHasDisability] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(
    "Nenhum arquivo selecionado"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();

  // const handleNextPage = () => {
  // router.push("/pessoal/cadastro/endereco"); // caminho da página de destino
  // };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      nomeSocial: "",
      dataNascimento: new Date(),
      genero: "",
      raca: "",
      estadoCivil: "",
      pais: "",
      nacionalidade: "",
      foto: undefined,
      deficiencia: false,
      tipoDeficiencia: "",
      escolaridade: "",
      nacionalidadePai: "",
      nomePai: "",
      nacionalidadeMae: "",
      nomeMae: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Dados enviados:", data);
      // Adiciona lógica de submissão aqui
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepIndicator activeStep={1} />

          {/* Seção 1: Informações Básicas */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Nome Completo*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo"
                        {...field}
                        className={
                          form.formState.errors.nome ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nomeSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Nome Social / Apelido
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome social" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Seção 2: Detalhes Pessoais */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Data de Nascimento*
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value || null}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Gênero*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            form.formState.errors.genero ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
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
                name="raca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Raça/Cor*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            form.formState.errors.raca ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {raceOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Seção 3: Nacionalidade */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Nacionalidade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="estadoCivil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Estado Civil*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            form.formState.errors.estadoCivil
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
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
                name="pais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">País*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o país"
                        {...field}
                        className={
                          form.formState.errors.pais ? "border-red-500" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nacionalidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Nacionalidade*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua nacionalidade"
                        {...field}
                        className={
                          form.formState.errors.nacionalidade
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

          {/* Seção 4: Foto */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Foto</h3>
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="foto"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <label
                          htmlFor="foto"
                          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer px-4 py-8 hover:bg-gray-50 transition-colors"
                        >
                          <UploadIcon className="w-8 h-8 mb-2 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">
                            {selectedFileName === "Nenhum arquivo selecionado"
                              ? "Clique para selecionar ou arraste uma imagem"
                              : selectedFileName}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="foto"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setSelectedFileName(
                                file ? file.name : "Nenhum arquivo selecionado"
                              );
                              field.onChange(file);
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          Formatos aceitos: JPG, PNG (máx. 5MB)
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Seção 5: Educação e Deficiência */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Formação e Deficiência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="escolaridade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Grau de Escolaridade*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            form.formState.errors.escolaridade
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levelOfEducationOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="deficiencia"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="deficiencia"
                          checked={field.value || false}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasDisability(!!checked);
                          }}
                        />
                        <FormLabel
                          htmlFor="deficiencia"
                          className="text-gray-700"
                        >
                          Pessoa com Deficiência
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {hasDisability && (
                  <FormField
                    control={form.control}
                    name="tipoDeficiencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Tipo de Deficiência*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={
                                form.formState.errors.tipoDeficiencia
                                  ? "border-red-500"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {disabilityOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Seção 6: Informações de Parentesco */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Informações dos Pais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nomePai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Nome do Pai</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do pai" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nacionalidadePai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Nacionalidade do Pai
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Brasileira" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomeMae"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Nome da Mãe</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome da mãe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nacionalidadeMae"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Nacionalidade da Mãe
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Brasileira" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormActionsButton
            onCancel={() => form.reset()}
            disabled={isSubmitting}
            // onNext={handleNextPage}
          />
        </form>
      </Form>
    </PageLayout>
  );
}
