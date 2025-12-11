"use client";

import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/core/utils";

type PasswordFieldProps = {
  value: string;
  error?: string;
  placeholder: string;
  show: boolean;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  onToggleShow: () => void;
  errorId: string;
};

export function PasswordField({
  value,
  error,
  placeholder,
  show,
  onChange,
  onBlur,
  onToggleShow,
  errorId,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1">
      <div
        className={cn(
          "border-border bg-background/80 flex h-12 items-center gap-2 rounded-full border px-4 text-sm shadow-sm",
          "focus-within:ring-border transition-colors duration-200 focus-within:ring-2",
          error && "border-error focus-within:ring-error",
        )}
      >
        <LockKeyhole className="text-muted-foreground h-4 w-4" />

        <input
          type={show ? "text" : "password"}
          className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />

        <button
          type="button"
          onClick={onToggleShow}
          className="text-muted-foreground hover:text-foreground flex h-6 w-6 items-center justify-center"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <p
        id={errorId}
        className={cn(
          "text-error transform overflow-hidden px-1 text-xs transition-all duration-300 ease-out",
          error
            ? "animate-in fade-in slide-in-from-top-1 mt-1 max-h-10 translate-y-0 opacity-100"
            : "mt-0 max-h-0 -translate-y-2 opacity-0",
        )}
      >
        {error ?? " "}
      </p>
    </div>
  );
}
