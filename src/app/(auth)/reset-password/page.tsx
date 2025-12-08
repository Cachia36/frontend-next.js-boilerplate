"use client";

import { ResetPasswordCard } from "@/components/auth/cards/ResetPasswordCard";

export default function ResetPasswordPage() {

  return (
    <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <ResetPasswordCard />
    </div>
  );
}