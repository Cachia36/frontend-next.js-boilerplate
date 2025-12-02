"use client";
import { LogIn, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthCardProps = {
    variant?: "signin" | "register" | "forgotpassword" | "resetpassword";
};

export default function AuthCard({ variant = "signin" }: AuthCardProps) {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Title based on variant
    let title: string;
    if (variant === "register") {
        title = "Create an account";
    } else if (variant === "signin") {
        title = "Sign in with email";
    } else if (variant === "forgotpassword") {
        title = "Forgot password";
    } else {
        title = "Reset password";
    }

    // Bottom link text + href
    let bottomLinkHref = "/login";
    let bottomLinkLabel = "Return to login";

    if (variant === "signin") {
        bottomLinkHref = "/register";
        bottomLinkLabel = "Click here to register";
    } else if (variant === "register") {
        bottomLinkHref = "/login";
        bottomLinkLabel = "Click here to log in";
    }

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (variant === "signin") {
            console.log("Sign in with:", { email, password });
            // TODO: call login API here
        } else if (variant === "register") {
            console.log("Register with:", { email, password });
            // TODO: call register API here
        } else if (variant === "forgotpassword") {
            console.log("Send reset email to:", { email });
            // TODO: call forgot-password API here
            router.push("/reset-password");
        } else if (variant === "resetpassword") {
            console.log("Reset password to:", { password });
            // TODO: call reset-password API here
            router.push("/login");
        }
    };

    return (
        <div className="w-full max-w-sm rounded-3xl shadow-xl border overflow-hidden">
            {/* Header */}
            <div className="pt-8 pb-4 flex flex-col items-center">
                <div className="bg-foreground/15 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xl">
                    <LogIn />
                </div>

                <h2 className="mt-4 text-lg font-semibold">{title}</h2>

                <p className="mt-1 text-xs text-center px-10 text-foreground/80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="px-6 pb-6 pt-2 space-y-4"
                noValidate
            >
                <div className="space-y-3">
                    {/* Email – shown on all except resetpassword */}
                    {variant !== "resetpassword" && (
                        <div className="flex items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
                            <Mail />
                            <input
                                type="email"
                                className="w-full text-sm focus:outline-none placeholder:text-foreground/60"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Password – hidden on forgotpassword, shown on others */}
                    {variant !== "forgotpassword" && (
                        <div className="flex items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
                            <LockKeyhole />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full text-sm focus:outline-none placeholder:text-foreground/60"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center justify-center w-5 h-5"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    )}

                    {/* Forgot password link – only on signin */}
                    {variant === "signin" && (
                        <div className="flex justify-end">
                            <a
                                href="/forgot-password"
                                className="text-xs font-medium hover:text-foreground/60"
                            >
                                Forgot password?
                            </a>
                        </div>
                    )}

                    {/* Primary button */}
                    <button
                        type="submit"
                        className="w-full mt-1 rounded-xl bg-foreground text-background py-2.5 text-sm font-semibold hover:bg-foreground/80 transition"
                    >
                        {variant === "forgotpassword"
                            ? "Send Email"
                            : variant === "resetpassword"
                                ? "Reset password"
                                : "Get Started"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 pt-2">
                        <span className="h-px flex-1 bg-foreground" />
                        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground">
                            {variant === "register"
                                ? "Already have an account?"
                                : variant === "signin"
                                    ? "Don't have an account?"
                                    : "..."}
                        </span>
                        <span className="h-px flex-1 bg-foreground" />
                    </div>

                    {/* Bottom link */}
                    <div className="text-[10px] text-center">
                        <a
                            href={bottomLinkHref}
                            className="text-xs font-medium text-foreground/60 hover:text-foreground/90"
                        >
                            {bottomLinkLabel}
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
