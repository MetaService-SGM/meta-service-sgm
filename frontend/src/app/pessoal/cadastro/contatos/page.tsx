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

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <StepIndicator activeStep={3} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contatos</h2>

          {/* Linha 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Operadora de Celular 1</Label>
              <Input placeholder="Ex: Tim" />
            </div>
            <div>
              <Label>Celular 1</Label>
              <Input placeholder="ex: (99) 9 9999–9999" />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Operadora de Celular 2</Label>
              <Input placeholder="Ex: Tim" />
            </div>
            <div>
              <Label>Celular 2</Label>
              <Input placeholder="ex: (99) 9 9999–9999" />
            </div>
          </div>

          {/* Linha 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Contato de Emergência</Label>
              <Input placeholder="Ex: Maria" />
            </div>
            <div>
              <Label>Vínculo com o Contato</Label>
              <Input placeholder="Ex: Esposa" />
            </div>
            <div>
              <Label>Operadora do Telefone de Emergência</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: Vivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivo">Vivo</SelectItem>
                  <SelectItem value="claro">Claro</SelectItem>
                  <SelectItem value="tim">Tim</SelectItem>
                  <SelectItem value="oi">Oi</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Linha 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Telefone de Emergência</Label>
              <Input placeholder="ex: (99) 9 9999–9999" />
            </div>
            <div>
              <Label>Email Pessoal</Label>
              <Input placeholder="Ex: andersonlima@example.com" />
            </div>
          </div>
        </div>
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
