import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const foundationItems = [
  "Next.js App Router with TypeScript",
  "Tailwind CSS with global theme tokens",
  "Prisma and Neon planned for Milestone 2",
  "Slug-first editorial routes planned for public posts",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-6">
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {SITE_NAME}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
            Milestone 1
          </span>
        </header>

        <div className="grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Entertainment blog rebuild
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
              A clean foundation for Quick and Honest.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <aside className="border-l border-border pl-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Baseline includes
            </h2>
            <ul className="mt-6 space-y-4">
              {foundationItems.map((item) => (
                <li
                  className="flex gap-3 text-sm leading-6 text-muted"
                  key={item}
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            Public blog, admin tools, and database work follow in later
            milestones.
          </span>
          <span>Built for Vercel deployment.</span>
        </footer>
      </section>
    </main>
  );
}
