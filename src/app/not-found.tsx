import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <section className="w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
          This page is not here.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          The link may be outdated, or the page may have moved while the new
          Quick and Honest site is being rebuilt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Browse posts
          </Link>
        </div>
      </section>
    </main>
  );
}
