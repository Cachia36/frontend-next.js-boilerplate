import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  children: ReactNode;
};

export function FeatureCard({ title, children }: FeatureCardProps) {
  return (
    <div className="bg-muted/60 text-muted-foreground border-border rounded-xl border p-5 text-sm shadow-sm">
      <h2 className="text-foreground mb-1 text-sm font-semibold">{title}</h2>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
