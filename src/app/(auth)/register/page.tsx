import { RegisterCard } from "@/components/auth/cards/RegisterCard";
import { AuthPageShell } from "@/components/auth/AuthPageShell";

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <RegisterCard />
    </AuthPageShell>
  );
}
