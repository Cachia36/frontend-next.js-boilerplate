"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AuthActions } from "../auth/AuthActions";
import { ThemeToggle } from "./ThemeToggle"

export default function Navbar() {
    const { toggleTheme, effectiveTheme } = useTheme();
    const isDark = effectiveTheme === "dark";
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout, loading } = useAuth();
    const isLoggedIn = !!user;

    const router = useRouter();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/", label: "About Us" },
        { href: "/", label: "Services" },
        { href: "/", label: "Contact" },
    ];

    const closeMenu = () => setIsOpen(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (typeof document === "undefined") return;

        if (isOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = original;
            };
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b px-4 py-4 bg-background">
            {/* MOBILE: top row */}
            <div className="flex items-center justify-between md:hidden">
                <div className="text-lg font-bold">Boilerplate</div>
                <div className="flex flex-row gap-4">
                    <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="p-2 rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        <div className="relative h-5 w-5">
                            <span
                                className={cn(
                                    "absolute left-0 h-[2px] w-5 bg-foreground transition-transform duration-200 ease-out",
                                    isOpen ? "translate-y-[6px] rotate-45" : "translate-y-[0px]"
                                )}
                            />
                            <span
                                className={cn(
                                    "absolute left-0 h-[2px] w-5 bg-foreground transition-all duration-200 ease-out",
                                    isOpen ? "opacity-0" : "opacity-100 translate-y-[6px]"
                                )}
                            />
                            <span
                                className={cn(
                                    "absolute left-0 h-[2px] w-5 bg-foreground transition-transform duration-200 ease-out",
                                    isOpen ? "translate-y-[6px] -rotate-45" : "translate-y-[12px]"
                                )}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div
                className={cn(
                    "fixed inset-0 md:hidden z-40 transition-[opacity,visibility] duration-300",
                    isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                )}
            >
                <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

                <div
                    className={cn(
                        "absolute left-0 top-0 h-full w-3/4 max-w-xs bg-background border-r shadow-lg transform transition-transform duration-300 ease-out",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mt-6 flex flex-col items-center gap-6 px-4">
                        <div className="flex gap-4">
                            <AuthActions
                                loading={loading}
                                isLoggedIn={isLoggedIn}
                                onLinkClick={closeMenu}
                                onLogout={() => {
                                    logout();
                                    closeMenu();
                                    router.push("/login");
                                }}
                            />
                        </div>

                        <nav className="flex flex-col items-center gap-4 text-lg font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={`${link.href}-${link.label}`}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="hover:underline"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center font-semibold text-lg">Logo</div>

                <div className="flex gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            className="relative text-sm font-medium after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

                    <AuthActions
                        loading={loading}
                        isLoggedIn={isLoggedIn}
                        onLogout={() => {
                            logout();
                            router.push("/login");
                        }}
                    />

                </div>
            </div>
        </nav>
    );
}