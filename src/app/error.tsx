"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <section className="w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          Error
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          The page could not finish loading. Try again, or go back to the blog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Try again
          </button>
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
