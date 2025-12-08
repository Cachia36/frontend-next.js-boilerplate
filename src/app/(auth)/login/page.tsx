"use client";

import { LoginCard } from "@/components/auth/cards/LoginCard";

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <LoginCard />
    </div>
  );
}