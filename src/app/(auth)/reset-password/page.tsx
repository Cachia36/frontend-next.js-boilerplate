import { AuthPageShell } from "@/components/layout/AuthPageShell";
import { ResetPasswordCard } from "@/components/auth/cards/ResetPasswordCard";

export default function ResetPasswordPage() {
  return (
    <AuthPageShell>
      <ResetPasswordCard />
    </AuthPageShell>
  );
}
