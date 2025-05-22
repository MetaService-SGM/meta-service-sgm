import React from 'react';
import { BaseFilter } from './BaseFilter';
import { FilterConfig } from './types';

const alertFilterConfig: FilterConfig[] = [
  {
    type: 'select',
    key: 'alertType',
    label: 'Tipo de Alerta',
    options: [
      { value: 'Documentação', label: 'Documentação' },
      { value: 'Estoque', label: 'Estoque' }
    ]
  },
  {
    type: 'date',
    key: 'startDate',
    label: 'Data Inicial'
  },
  {
    type: 'date',
    key: 'endDate',
    label: 'Data Final'
  },
  {
    type: 'text',
    key: 'search',
    label: 'Busca',
    placeholder: 'Pesquisar em títulos e descrições'
  }
];

interface AlertFilterProps {
  onFilter: (values: Record<string, string>) => void;
}

export const AlertFilter: React.FC<AlertFilterProps> = ({ onFilter }) => {
  return <BaseFilter config={alertFilterConfig} onFilter={onFilter} />;
};