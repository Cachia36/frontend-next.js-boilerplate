import { ForgotPasswordCard } from "@/components/auth/cards/ForgotPasswordCard";
import { AuthPageShell } from "@/components/auth/AuthPageShell";

export default function forgotPassword() {
  return (
    <AuthPageShell>
      <ForgotPasswordCard />
    </AuthPageShell>
  );
}
