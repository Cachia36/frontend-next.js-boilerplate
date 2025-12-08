"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO: plug in Sentry / LogRocket / your own logger here
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-4 text-center max-w-md">
        An unexpected error occurred. You can try again or go back to the home page.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={() => reset()}
          variant="outline"
        >
          Try again
        </Button>

        <Link href="/"
          className="px-4 py-2 text-sm rounded-full transition bg-foreground text-background border hover:cursor-default"
        >
          Go home
        </Link>

      </div>
    </main>
  );
}