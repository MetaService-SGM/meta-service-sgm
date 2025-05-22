import React from 'react';
import { BaseFilter } from './BaseFilter';
import { FilterConfig } from './types';

const serviceOrderFilterConfig: FilterConfig[] = [
  {
    type: 'select',
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Aberto', label: 'Aberto' },
      { value: 'Em andamento', label: 'Em andamento' },
      { value: 'Concluído', label: 'Concluído' }
    ]
  },
  {
    type: 'select',
    key: 'priority',
    label: 'Prioridade',
    options: [
      { value: 'Baixa', label: 'Baixa' },
      { value: 'Média', label: 'Média' },
      { value: 'Alta', label: 'Alta' }
    ]
  },
  {
    type: 'text',
    key: 'requester',
    label: 'Solicitante',
    placeholder: 'Filtrar por solicitante'
  }
];

interface ServiceOrderFilterProps {
  onFilter: (values: Record<string, string>) => void;
}

export const ServiceOrderFilter: React.FC<ServiceOrderFilterProps> = ({ onFilter }) => {
  return <BaseFilter config={serviceOrderFilterConfig} onFilter={onFilter} />;
};