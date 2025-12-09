"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

type AuthActionsProps = {
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  onLogout: () => void;
  onLinkClick?: () => void;
};

export function AuthActions({
  loading,
  isLoggedIn,
  isAdmin = false,
  onLogout,
  onLinkClick,
}: AuthActionsProps) {
  if (loading) {
    return <div className="bg-muted h-8 w-32 animate-pulse rounded-full" />;
  }

  const linkProps = onLinkClick ? { onClick: onLinkClick } : {};

  if (!isLoggedIn) {
    return (
      <>
        <Link href="/register" {...linkProps}>
          <Button variant="outline">Sign Up</Button>
        </Link>

        <Link href="/login" {...linkProps}>
          <Button>Log in</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      {isAdmin && (
        <Link href="/admin" {...linkProps}>
          <Button variant="outline">Admin</Button>
        </Link>
      )}

      <Link href="/dashboard" {...linkProps}>
        <Button variant="outline">View Account</Button>
      </Link>

      <Button
        onClick={() => {
          onLogout();
          if (onLinkClick) onLinkClick();
        }}
      >
        Sign out
      </Button>
    </>
  );
}
