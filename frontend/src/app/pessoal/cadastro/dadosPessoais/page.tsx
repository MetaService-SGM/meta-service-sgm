"use client";

import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeRegistrationLayout from "@/components/ui/layout/EmployeeRegistrationLayout";
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

// url:
// localhost:3000/pessoal/cadastro/dadosPessoais
export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <StepIndicator activeStep={1} />

        {/* Primeira linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <Label htmlFor="nomeSocial">Nome Social / Apelido</Label>
            <Input
              id="nomeSocial"
              type="text"
              placeholder="Digite seu nome social ou apelido"
            />
          </div>
        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <DatePicker/>
          </div>

          <div>
            <Label>Gênero</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="nao_informar">
                  Prefiro não informar
                </SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Raça / Cor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a raça / cor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="branca">Branca</SelectItem>
                <SelectItem value="preta">Preta</SelectItem>
                <SelectItem value="parda">Parda</SelectItem>
                <SelectItem value="amarela">Amarela</SelectItem>
                <SelectItem value="indigena">Indígena</SelectItem>
                <SelectItem value="nao_declarar">
                  Prefiro não declarar
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Terceira linha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label>Estado Civil</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado civil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                <SelectItem value="casado">Casado(a)</SelectItem>
                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                <SelectItem value="uniao_estavel">União estável</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>País</Label>
            <Input
              id="pais"
              type="text"
              placeholder="Digite o país de origem"
            />
          </div>

          <div>
            <Label>Nacionalidade</Label>
            <Input
              id="nacionalidade"
              type="text"
              placeholder="Digite sua nacionalidade"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Linha 1 - Foto e Pessoa com Deficiência */}
          <div>
            <Label htmlFor="foto">Foto</Label>
            <Input id="foto" type="file" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="deficiencia" />
              <Label htmlFor="deficiencia">Pessoa com Deficiência</Label>
            </div>
            <div>
              <Label htmlFor="tipoDeficiencia">Tipo de Deficiência</Label>
              <Input
                id="tipoDeficiencia"
                type="text"
                placeholder="Descreva o tipo de deficiência"
              />
            </div>
          </div>

          {/* Linha 2 - Escolaridade e Técnico */}
          <div>
            <Label htmlFor="escolaridade">Escolaridade</Label>
            <Input
              id="escolaridade"
              type="text"
              placeholder="Ex: Ensino Médio Completo"
            />
          </div>

          <div>
            <Label htmlFor="tecnico">Curso Técnico</Label>
            <Input
              id="tecnico"
              type="text"
              placeholder="Informe o curso técnico"
            />
          </div>

          {/* Linha 3 - Ensino Superior e Pós-graduação */}
          <div>
            <Label htmlFor="superior">Ensino Superior</Label>
            <Input
              id="superior"
              type="text"
              placeholder="Informe o curso superior"
            />
          </div>

          <div>
            <Label htmlFor="posGraduacao">Pós-graduação</Label>
            <Input
              id="posGraduacao"
              type="text"
              placeholder="Informe sua pós-graduação"
            />
          </div>

          {/* Linha 4 - Nacionalidade e Nome do Pai */}
          <div>
            <Label htmlFor="nacionalidadePai">Nacionalidade do Pai</Label>
            <Input
              id="nacionalidadePai"
              type="text"
              placeholder="Nacionalidade do pai"
            />
          </div>

          <div>
            <Label htmlFor="nomePai">Nome do Pai</Label>
            <Input
              id="nomePai"
              type="text"
              placeholder="Digite o nome do pai"
            />
          </div>

          {/* Linha 5 - Nacionalidade e Nome da Mãe */}
          <div>
            <Label htmlFor="nacionalidadeMae">Nacionalidade da Mãe</Label>
            <Input
              id="nacionalidadeMae"
              type="text"
              placeholder="Nacionalidade da mãe"
            />
          </div>

          <div>
            <Label htmlFor="nomeMae">Nome da Mãe</Label>
            <Input
              id="nomeMae"
              type="text"
              placeholder="Digite o nome da mãe"
            />
          </div>
        </div>
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
