import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm rounded-full transition",
        variant === "default" &&
          "bg-foreground text-background border",
        variant === "outline" &&
          "border bg-transparent text-foreground",
        className
      )}
      {...props}
    />
  );
}