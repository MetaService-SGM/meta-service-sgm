import React from 'react';
import { BaseFilter } from './BaseFilter';
import { FilterConfig } from './types';

const employeeFilterConfig: FilterConfig[] = [
  {
    type: 'select',
    key: 'status',
    label: 'Status',
    options: [
      { value: 'true', label: 'Ativo' },
      { value: 'false', label: 'Inativo' }
    ]
  },
  {
    type: 'text',
    key: 'name',
    label: 'Nome',
    placeholder: 'Filtrar por nome'
  },
  {
    type: 'text',
    key: 'function',
    label: 'Função',
    placeholder: 'Filtrar por função'
  }
];

interface EmployeeFilterProps {
  onFilter: (values: Record<string, string>) => void;
}

export const EmployeeFilter: React.FC<EmployeeFilterProps> = ({ onFilter }) => {
  return <BaseFilter config={employeeFilterConfig} onFilter={onFilter} />;
};