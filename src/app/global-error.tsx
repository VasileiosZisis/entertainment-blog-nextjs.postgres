"use client";

import { useEffect } from "react";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
          <section className="w-full max-w-2xl">
            <title>Something went wrong | Quick and Honest</title>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Error
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Something went wrong.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              The site could not finish loading. Try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="mt-8 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
