import { AuthPageShell } from "@/components/layout/AuthPageShell";
import { LoginCard } from "@/components/auth/cards/LoginCard";

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginCard />
    </AuthPageShell>
  );
}
