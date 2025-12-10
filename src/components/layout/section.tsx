import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  mt?: "none" | "lg"; // simple toggle so you can control the first section
};

export function Section({ id, children, className, mt = "lg" }: SectionProps) {
  return (
    <section id={id} className={cn(mt === "lg" && "mt-16", "space-y-4", className)}>
      {children}
    </section>
  );
}
