"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    type = "text",
    showPasswordToggle = false, // Recebemos a prop mas não repassamos ao DOM
    className,
    ...props
  }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          showPasswordToggle ? "pr-10" : "", // Aplica padding se houver toggle
          className
        )}
        {...props} // Somente props padrão do input
      />
    );
  }
);

Input.displayName = "Input";

export { Input };