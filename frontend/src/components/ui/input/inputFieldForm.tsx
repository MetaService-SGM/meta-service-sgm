import { Input } from ".";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Control, FieldValues, Path } from "react-hook-form";

interface AddressInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  className?: string;
  description?: string; // suporte a descrições
}

export function AddressInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  description,
  ...props // Captura outras props
}: AddressInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              {...field} 
              {...props} // Passa outras props para o Input
            />
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}