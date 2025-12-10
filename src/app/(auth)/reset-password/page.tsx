import { Suspense } from "react";
import { AuthPageShell } from "@/components/layout/AuthPageShell";
import { ResetPasswordCard } from "@/components/auth/cards/ResetPasswordCard";

export default function ResetPasswordPage() {
  return (
    <AuthPageShell>
      <Suspense
        fallback={
          <div className="border-border bg-background/90 w-full max-w-md rounded-3xl border p-8 shadow-lg">
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            <div className="bg-muted mt-4 h-3 w-full animate-pulse rounded" />
            <div className="bg-muted mt-2 h-3 w-4/5 animate-pulse rounded" />
          </div>
        }
      >
        <ResetPasswordCard />
      </Suspense>
    </AuthPageShell>
  );
}
