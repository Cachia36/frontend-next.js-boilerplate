import type { ReactNode } from "react";
import { PageShell } from "./page-shell";

type AuthPageShellProps = {
  children: ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <PageShell>
      <div className="animate-in fade-in slide-in-from-bottom-4 flex min-h-[60vh] items-center justify-center py-12 duration-300">
        {children}
      </div>
    </PageShell>
  );
}
