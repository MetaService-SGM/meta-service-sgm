'use client'

import React, { useState } from 'react';
import { EmployeeFilter } from "@/components/ui/filters/EmployeeFilter";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeTable, { Employee } from "@/components/ui/tables/EmployeeTable";
import { mockEmployee } from "@/components/ui/tables/mocks";
import ButtonMenu from '@/components/ui/button/buttonMenu';
import { TitlePage } from '@/components/ui/title/TitlePage';

export default function Staff() {
  // Estado inicial com todos os funcionários mockados
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployee);

  // Função chamada ao aplicar o filtro
  const handleFilter = (filterValues: Record<string, string>) => {
    let result = [...mockEmployee];

    // Filtro por status
    if (filterValues.status) {
      result = result.filter(emp =>
        String(emp.employeeStatus) === filterValues.status
      );
    }

    // Filtro por nome 
    if (filterValues.name) {
      const searchTerm = filterValues.name.toLowerCase();
      result = result.filter(emp =>
        emp.employeeName?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por função (case insensitive)
    if (filterValues.function) {
      const searchTerm = filterValues.function.toLowerCase();
      result = result.filter(emp =>
        emp.employeeFunction?.toLowerCase().includes(searchTerm)
      );
    }

    // Atualiza o estado com os resultados filtrados

    /// Att lowercase
    setFilteredEmployees(result);
  };

  return (
    <PageLayout>
      <div>
        <ButtonMenu />
        <TitlePage>Funcionários</TitlePage>

        {/* Componente de Filtro */}
        <EmployeeFilter onFilter={handleFilter} />

        {/* Tabela com dados filtrados */}
        <EmployeeTable data={filteredEmployees} />
      </div>
    </PageLayout>
  );
}
