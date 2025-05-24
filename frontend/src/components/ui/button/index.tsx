// Importações necessárias
import * as React from "react" // Biblioteca React
import { Slot } from "@radix-ui/react-slot" // Componente Slot para composição
import { cva, type VariantProps } from "class-variance-authority" // Utilitário para variações de classe
import { cn } from "@/lib/utils" // Utilitário para combinar classes CSS

// Definição das variantes do botão usando class-variance-authority
const buttonVariants = cva(
  // Classes base que se aplicam a todos os botões
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer shadow-md ",
  {
    // Objeto de variantes
    variants: {
      // Variantes de estilo (cores, aparência)
      variant: {
        default:
          "bg-[#2B426E] font-bold text-white shadow-xs hover:bg-[#2B426E]/90",
        destructive:
          "bg-[#E97671] text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-[#0DBF8D] text-white hover:bg-emerald-600",
        alert: "bg-[#FFE5B0] text-white hover:bg-yellow-200",
        page: "bg-[#F2F7FF] text-neutral-900 hover:bg-[#E6EFFC] border border-neutral-700",
        login: "shadow-[0px_4px_4px_0px_rgba bg-[#2B426E] font-bold text-white shadow-xs hover:bg-[#2B426E]/90 ",
        select: "relative bg-[#F2F7FF] text-transparent bg-clip-text bg-gradient-to-r from-[#14ADD6] to-[#384295] font-bold "
      },
      // Variantes de tamanho
      size: {
        default: "h-10 w-20 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9", // Tamanho para botões que contêm apenas ícones
      },
    },
    // Variantes padrão (se nenhuma for especificada)
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Componente Button principal
function Button({
  className, // Classes CSS adicionais
  variant, // Variante de estilo
  size, // Variante de tamanho
  asChild = false, // Se true, renderiza como Slot para composição
  ...props // Todas as outras props padrão de botão HTML
}: React.ComponentProps<"button"> & // Tipos das props de botão HTML
  VariantProps<typeof buttonVariants> & { // Tipos das variantes
    asChild?: boolean // Prop personalizada para composição
  }) {
  // Decide se renderiza como Slot (composição) ou como button normal
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button" // Atributo para identificação
      className={cn(buttonVariants({ variant, size, className }))} // Combina as classes
      {...props} // Passa todas as outras props
    />
  )
}

// Exporta o componente e suas variantes para uso externo
export { Button, buttonVariants }