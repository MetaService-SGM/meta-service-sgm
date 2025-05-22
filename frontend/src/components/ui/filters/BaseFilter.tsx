// BaseFilter.tsx
import React from 'react';
import { FilterConfig, FilterType } from './types';

interface BaseFilterProps {
  config: FilterConfig[];
  onFilter: (values: Record<string, string>) => void;
  onReset?: () => void;
}

export const BaseFilter: React.FC<BaseFilterProps> = ({ config, onFilter, onReset }) => {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(values);
  };

  const handleReset = () => {
    setValues({});
    onFilter({});
    onReset?.();
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.map(filter => (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            {filter.type === 'select' ? (
              <select
                value={values[filter.key] || ''}
                onChange={e => handleChange(filter.key, e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3 border"
              >
                <option value="">Todos</option>
                {filter.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : filter.type === 'date' ? (
              <input
                type="date"
                value={values[filter.key] || ''}
                onChange={e => handleChange(filter.key, e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3 border"
              />
            ) : (
              <input
                type={filter.type}
                value={values[filter.key] || ''}
                onChange={e => handleChange(filter.key, e.target.value)}
                placeholder={filter.placeholder || `Filtrar por ${filter.label}`}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3 border"
              />
            )}
          </div>
        ))}
        
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="h-10 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};