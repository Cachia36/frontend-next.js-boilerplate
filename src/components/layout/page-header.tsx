import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
};

export function PageHeader({ title, eyebrow, subtitle }: PageHeaderProps) {
  return (
    <header className="space-y-4">
      {eyebrow && (
        <p className="text-muted-foreground text-sm font-medium tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      )}

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>

      {subtitle && (
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">{subtitle}</p>
      )}
    </header>
  );
}
