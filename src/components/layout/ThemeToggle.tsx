import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "border-border bg-muted/60 text-muted-foreground relative inline-flex h-8 w-14 items-center rounded-full border px-1 text-xs font-medium shadow-sm transition-colors",
        mounted && isDark && "bg-foreground/90 text-primary-foreground",
      )}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>

      <span
        className={cn(
          "bg-background pointer-events-none inline-flex h-6 w-6 transform-gpu items-center justify-center rounded-full shadow transition-transform",
          mounted && isDark ? "translate-x-6" : "translate-x-0",
        )}
      />
    </button>
  );
}
