import React from 'react';
import { BaseFilter } from './BaseFilter';
import { FilterConfig } from './types';

const companyFilterConfig: FilterConfig[] = [
  {
    type: 'text',
    key: 'name',
    label: 'Razão Social',
    placeholder: 'Filtrar por nome'
  },
  {
    type: 'text',
    key: 'segment',
    label: 'Segmento',
    placeholder: 'Filtrar por segmento'
  },
  {
    type: 'text',
    key: 'city',
    label: 'Cidade',
    placeholder: 'Filtrar por cidade'
  }
];

interface CompanyFilterProps {
  onFilter: (values: Record<string, string>) => void;
}

export const CompanyFilter: React.FC<CompanyFilterProps> = ({ onFilter }) => {
  return <BaseFilter config={companyFilterConfig} onFilter={onFilter} />;
};