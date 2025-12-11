import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { LoginCard } from "@/components/auth/cards/LoginCard";

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginCard />
    </AuthPageShell>
  );
}
