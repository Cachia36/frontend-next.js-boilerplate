"use client"

import { ForgotPasswordCard } from "@/components/auth/cards/ForgotPasswordCard";

export default function forgotPassword() {
    return (
        <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ForgotPasswordCard />
        </div>
    )
}