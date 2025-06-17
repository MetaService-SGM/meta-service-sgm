'use client'

import React, { useState } from 'react';
import { EmployeeFilter } from "@/components/ui/filters/EmployeeFilter";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import EmployeeTable, { Employee } from "@/components/ui/tables/EmployeeTable";
import { mockEmployee } from "@/components/ui/tables/mocks";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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

    // Filtro por nome (case insensitive)
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
    setFilteredEmployees(result);
  };

  return (
    <PageLayout>
      <div className="p-4">
        <Breadcrumb />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Funcionários</h1>
        
        {/* Componente de Filtro */}
        <EmployeeFilter onFilter={handleFilter} />

        {/* Tabela com dados filtrados */}
        <EmployeeTable data={filteredEmployees} />
      </div>
    </PageLayout>
  );
}
