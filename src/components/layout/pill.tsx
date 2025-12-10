import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
};

export function Pill({ children }: PillProps) {
  return (
    <span className="border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium">
      {children}
    </span>
  );
}
