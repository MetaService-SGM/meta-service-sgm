"use client";

import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeRegistrationLayout from "@/components/ui/layout/EmployeeRegistrationLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmployeeRegistration() {
  return (
    <PageLayout>
      <EmployeeRegistrationLayout>
        <StepIndicator activeStep={5} />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Documentos</h2>

          {/* Seção CPF */}
          <div className="space-y-2">
            <Label>CPF</Label>
            <Input placeholder="Digite aqui..." />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Seção Estrangeiro */}
          <div className="space-y-4">
            <h3 className="font-medium">Estrangeiro</h3>

            {/* Linha 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>RG</Label>
                <Input placeholder="Ex: 11222333" />
              </div>
              <div>
                <Label>Título de Eleitor</Label>
                <Input placeholder="Ex: 1234567891234" />
              </div>
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Banco</Label>
                <Input placeholder="Ex: " />
              </div>
              <div>
                <Label>Órgão expedidor</Label>
                <Input placeholder="Ex: SDS/PE" />
              </div>
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Zona Eleitoral</Label>
                <Input placeholder="Ex: 1ª Zona Eleitoral" />
              </div>
              <div>
                <Label>Agência</Label>
                <Input placeholder="Ex: " />
              </div>
            </div>

            {/* Linha 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Data de Expedição</Label>
                <Input placeholder="Ex: 12/07/2022" />
              </div>
              <div>
                <Label>Seção Eleitoral</Label>
                <Input placeholder="Ex: " />
              </div>
            </div>

            {/* Linha 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Conta Corrente</Label>
                <Input placeholder="Ex: " />
              </div>
            </div>
          </div>
        </div>
      </EmployeeRegistrationLayout>
    </PageLayout>
  );
}
