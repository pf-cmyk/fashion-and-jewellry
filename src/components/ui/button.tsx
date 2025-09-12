import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        primary: "btn-primary",
        secondary: "btn-secondary", 
        accent: "btn-accent",
        outline: "btn-ghost",
        ghost: "btn-ghost",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 py-4 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]",
        link: "text-primary underline-offset-4 hover:underline tracking-wide",
        hero: "bg-gradient-to-r from-primary to-accent text-primary-foreground px-12 py-6 rounded-2xl text-lg font-semibold tracking-wide transform hover:scale-105 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] animate-glow",
        cta: "bg-accent text-accent-foreground hover:bg-accent-hover px-10 py-5 rounded-xl text-lg font-semibold tracking-wide transform hover:scale-105 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)]",
      },
      size: {
        default: "text-base px-8 py-4",
        sm: "text-sm px-6 py-3",
        lg: "text-lg px-10 py-5",
        xl: "text-xl px-12 py-6",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
