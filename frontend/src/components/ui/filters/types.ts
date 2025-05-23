export type FilterType = 'select' | 'date' | 'text' | 'number' | 'color';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  type: FilterType;
  key: string;
  label: string;
  options?: FilterOption[];
  placeholder?: string;
}