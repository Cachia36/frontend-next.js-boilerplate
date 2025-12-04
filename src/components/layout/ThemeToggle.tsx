import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
    isDark: boolean;
    onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const checked = mounted ? isDark : false;

    return (
        <button
            type="button"
            onClick={onToggle}
            role="switch"
            aria-checked={checked}
            className="flex items-center gap-2 focus:outline-none"
        >
            <span
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors border",
                    isDark
                        ? "bg-foreground border-foreground"
                        : "bg-foreground border-foreground"
                )}
            >
                <span
                    className={cn(
                        "inline-block h-5 w-5 rounded-full bg-background shadow transition-transform transform-gpu",
                        // Only move the thumb after we’re mounted to avoid SSR/client mismatch
                        mounted && isDark ? "translate-x-5" : "translate-x-1"
                    )}
                />
            </span>
        </button>
    );
}