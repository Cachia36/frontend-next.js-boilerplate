import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (

    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold tracking-tight mb-2">404 – Page not found</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      
      <Button variant="outline">
        <Link href="/">Go back home</Link>
      </Button>
    </main>
  );
}