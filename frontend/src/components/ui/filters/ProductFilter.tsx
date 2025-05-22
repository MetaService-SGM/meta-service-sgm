import React from 'react';
import { BaseFilter } from './BaseFilter';
import { FilterConfig } from './types';

const productFilterConfig: FilterConfig[] = [
  {
    type: 'text',
    key: 'name',
    label: 'Nome do Produto',
    placeholder: 'Filtrar por nome'
  },
  {
    type: 'select',
    key: 'size',
    label: 'Tamanho',
    options: [
      { value: 'P', label: 'Pequeno' },
      { value: 'M', label: 'Médio' },
      { value: 'G', label: 'Grande' }
    ]
  },
  {
    type: 'text',
    key: 'color',
    label: 'Cor',
    placeholder: 'Ex: azu, ver, ama'
  }
];

interface ProductFilterProps {
  onFilter: (values: Record<string, string>) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter }) => {
  return <BaseFilter config={productFilterConfig} onFilter={onFilter} />;
};