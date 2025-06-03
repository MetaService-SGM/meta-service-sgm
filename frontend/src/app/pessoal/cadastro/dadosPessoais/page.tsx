"use client";

import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeRegistrationLayout from "@/components/ui/layout/EmployeeRegistrationLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <Input id="dataNascimento" type="date" />
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

      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
