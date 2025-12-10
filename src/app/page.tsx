import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { FeatureCard } from "@/components/layout/FeatureCard";
import { Pill } from "@/components/layout/pill";

export const metadata: Metadata = {
  title: "Next.js Auth Boilerplate",
  description:
    "A production-leaning authentication boilerplate built with Next.js, TypeScript, JWT, and Tailwind CSS.",
};

const techStackItems = [
  "Next.js (App Router)",
  "TypeScript",
  "Tailwind CSS",
  "JWT (access + refresh)",
  "Zod",
  "Vitest",
  "ESLint (flat config)",
  "Prettier",
];

export default function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <Section mt="none">
        <PageHeader
          eyebrow="Portfolio Project · Authentication Boilerplate"
          title="Next.js Authentication Boilerplate"
          subtitle={
            <>
              A production-leaning starter kit that showcases how I design and implement
              authentication, API routes, testing, and modern frontend architecture with Next.js,
              TypeScript, and Tailwind CSS.
            </>
          }
        />

        <div className="flex flex-wrap gap-3 pt-2">
          {/* Primary CTA */}
          <Link
            href="/dashboard"
            className="bg-foreground text-background inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition hover:opacity-90"
          >
            Open Demo Dashboard
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/about"
            className="border-border text-foreground hover:bg-muted inline-flex items-center justify-center rounded-full border bg-transparent px-4 py-2 text-sm font-medium transition"
          >
            Read About the Architecture
          </Link>

          {/* GitHub link (dashed outline) */}
          <a
            href="https://github.com/cachia36/next.js-boilerplate"
            target="_blank"
            rel="noreferrer"
            className="border-border text-muted-foreground hover:bg-muted inline-flex items-center justify-center rounded-full border border-dashed px-4 py-2 text-sm font-medium transition"
          >
            View Source on GitHub
          </a>
        </div>
      </Section>

      {/* Key value props */}
      <Section className="grid gap-8 md:grid-cols-3">
        <FeatureCard title="Real-world Auth">
          Email + password login, JWT access and refresh tokens, HttpOnly cookies, protected routes,
          and password reset flow wired end to end.
        </FeatureCard>

        <FeatureCard title="Clean Architecture">
          Separation between UI, services, domain logic, and infrastructure: repositories, email
          providers, rate limiting, and environment handling.
        </FeatureCard>

        <FeatureCard title="Tested &amp; CI Ready">
          Vitest unit tests for core modules and a GitHub Actions workflow that runs the test suite
          on every push and pull request.
        </FeatureCard>
      </Section>

      {/* Tech stack */}
      <Section>
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <p className="text-muted-foreground text-sm">
          Built with a modern, production-oriented stack:
        </p>

        <div className="flex flex-wrap gap-2">
          {techStackItems.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </Section>

      {/* Architecture preview */}
      <Section>
        <h2 className="text-2xl font-semibold">Architecture at a Glance</h2>
        <p className="text-muted-foreground text-sm">
          The project is structured to be easy to extend into a real product:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-muted text-muted-foreground rounded-xl border p-5 text-sm">
            <h3 className="text-foreground mb-2 text-sm font-semibold">Auth &amp; Domain</h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <code className="bg-muted rounded px-1 py-0.5 text-[11px]">src/lib/auth</code> –{" "}
                auth service, JWT handling, password hashing
              </li>
              <li>
                <code className="bg-muted rounded px-1 py-0.5 text-[11px]">UserRepository</code>{" "}
                abstraction with in-memory implementation
              </li>
              <li>Password reset tokens + pluggable email provider</li>
            </ul>
          </div>

          <div className="bg-muted text-muted-foreground rounded-xl border p-5 text-sm">
            <h3 className="text-foreground mb-2 text-sm font-semibold">API &amp; Middleware</h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>REST-style route handlers under `/api/auth/*`</li>
              <li>Shared error handler and rate limiter for consistent responses</li>
              <li>Middleware-protected routes for `/dashboard` and auth-only pages</li>
            </ul>
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          For a deeper, more technical breakdown of the architecture, visit the{" "}
          <Link
            href="/about"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            About page
          </Link>
          .
        </p>
      </Section>

      {/* How to explore */}
      <Section className="mb-8">
        <h2 className="text-2xl font-semibold">How to Explore This Demo</h2>

        <ol className="text-muted-foreground list-decimal space-y-2 pl-5 text-sm">
          <li>
            Register a new account using the{" "}
            <Link
              href="/register"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              registration page
            </Link>
            .
          </li>
          <li>Log in and navigate to the dashboard to see a protected page.</li>
          <li>Try logging out and visiting the dashboard again to test the middleware.</li>
          <li>
            Optionally, trigger the forgot/reset password flow and inspect the console output for
            the email provider.
          </li>
        </ol>
      </Section>

      {/* Navbar anchor target: Services */}
      <Section id="services">
        <h2 className="text-2xl font-semibold">Services / Use Cases</h2>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          This boilerplate is designed as a starting point for SaaS dashboards, admin panels,
          internal tools, or any application that needs solid authentication, role-based access
          control, and a clean architecture you can confidently extend.
        </p>
      </Section>

      {/* Navbar anchor target: Contact */}
      <Section id="contact" className="mb-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          Want to work together or see more of my work? Feel free to reach out via{" "}
          <a
            href="mailto:kylecachia2@gmail.com"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            email
          </a>{" "}
          or connect through the links in the footer.
        </p>
      </Section>
    </PageShell>
  );
}
