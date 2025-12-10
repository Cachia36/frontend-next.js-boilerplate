import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return <div className="container mx-auto max-w-5xl px-6 py-16">{children}</div>;
}
