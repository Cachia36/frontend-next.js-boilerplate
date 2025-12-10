import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // base
        "border-border inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        // variants
        variant === "default" && "bg-foreground text-background hover:opacity-90",
        variant === "outline" && "text-foreground hover:bg-muted bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
