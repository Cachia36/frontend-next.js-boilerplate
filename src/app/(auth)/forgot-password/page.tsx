import { ForgotPasswordCard } from "@/components/auth/cards/ForgotPasswordCard";
import { AuthPageShell } from "@/components/layout/AuthPageShell";

export default function forgotPassword() {
  return (
    <AuthPageShell>
      <ForgotPasswordCard />
    </AuthPageShell>
  );
}
