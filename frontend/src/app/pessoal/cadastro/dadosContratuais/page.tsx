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
import { Button } from "@/components/ui/button";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <StepIndicator activeStep={4} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Dados Contratuais</h2>

          {/* Linha 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Departamento</Label>
              <div className="flex gap-2">
                <Input placeholder="Ex: Financeiro" />
                <Button variant="outline">+</Button>
              </div>
            </div>
            <div>
              <Label>Cargo</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ex: Analista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analista">Analista</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">+</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Número do CBO vinculado ao cargo.
              </p>
            </div>
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Contrato</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ex: CLT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="pj">PJ</SelectItem>
                    <SelectItem value="temporario">Temporário</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">+</Button>
              </div>
            </div>
            <div>
              <Label>Unidade</Label>
              <div className="flex gap-2">
                <Input placeholder="Ex: Matriz Recife" />
                <Button variant="outline">+</Button>
              </div>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Turno</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: Manhã" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manha">Manhã</SelectItem>
                  <SelectItem value="tarde">Tarde</SelectItem>
                  <SelectItem value="noite">Noite</SelectItem>
                  <SelectItem value="integral">Integral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Salário Homem / Hora</Label>
              <Input placeholder="Ex: 0,00" />
            </div>
          </div>

          {/* Linha 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Data de Admissão</Label>
              <Input placeholder="Ex: 01/01/2025" />
            </div>
            <div>
              <Label>Período de Experiência</Label>
              <Input placeholder="Ex: 90 dias" />
            </div>
            <div>
              <Label>Matrícula</Label>
              <Input
                placeholder="Ex: m000000008"
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Gerada automaticamente ao preencher os dados.
              </p>
            </div>
          </div>

          {/* Linha 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Superior Direto</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: João Silva" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Souza</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grau Hierárquico</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ex: Sênior" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Júnior</SelectItem>
                    <SelectItem value="pleno">Pleno</SelectItem>
                    <SelectItem value="senior">Sênior</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">+</Button>
              </div>
            </div>
          </div>

          {/* Linha 6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Data do Contrato</Label>
              <Input placeholder="Ex: 01/01/2025" />
            </div>
            <div>
              <Label>Duração do Contrato</Label>
              <Input placeholder="Ex: 12 meses" />
            </div>
            <div>
              <Label>Vencimento do Contrato</Label>
              <Input placeholder="Ex: 01/01/2026" />
            </div>
          </div>

          {/* Linha 7 */}
          <div className="w-full md:w-1/3">
            <Label>Total Dias</Label>
            <Input placeholder="Ex: 365" />
          </div>
        </div>
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
