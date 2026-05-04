import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Nothing to read here",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 text-foreground sm:px-8">
      <section className="w-full max-w-3xl border-y border-border py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          404
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-[0.98] text-balance sm:text-6xl">
          Nothing to read here
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          This link does not point to a post, category, or page on Quick and
          Honest. Try the blog index and pick something that is actually worth
          your time
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-background"
          >
            Browse posts
          </Link>
        </div>
      </section>
    </main>
  );
}
