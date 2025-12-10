"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import { AuthActions } from "@/components/auth/AuthActions";
import type { NavLink } from "./NavLinks";

type DesktopNavbarProps = {
  navLinks: NavLink[];
  isDark: boolean;
  toggleTheme: () => void;
  authLoading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
  currentPath: string;
};

export function DesktopNavbar({
  navLinks,
  isDark,
  toggleTheme,
  authLoading,
  isLoggedIn,
  isAdmin,
  onLogout,
  currentPath,
}: DesktopNavbarProps) {
  const isRouteActive = (href: string) => {
    if (href.startsWith("#")) return false; // anchors handled by page, not route
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <div className="hidden items-center justify-between gap-6 md:flex">
      {/* Logo / brand */}
      <Link href="/" className="flex items-center gap-2">
        <div className="border-border bg-muted flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-semibold">
          KC
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
            Auth Boilerplate
          </span>
          <span className="text-muted-foreground/80 text-[11px]">Next.js · TypeScript · JWT</span>
        </div>
      </Link>

      {/* Center nav links */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const active = isRouteActive(link.href);

          return (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                "text-muted-foreground relative text-sm font-medium transition-colors",
                "after:bg-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300",
                "hover:text-foreground hover:after:w-full",
                active && "text-foreground after:w-full",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <AuthActions
          loading={authLoading}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}
