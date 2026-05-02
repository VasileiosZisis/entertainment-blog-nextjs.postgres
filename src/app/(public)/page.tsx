import { SITE_DESCRIPTION } from "@/lib/site";

const foundationItems = [
  "Public shell and navigation are in place",
  "Neon and Prisma are ready for content queries",
  "Blog lists and article pages follow in Milestone 4",
  "Admin tools stay private while authentication is built",
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid min-h-[calc(100svh-16rem)] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
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

          <aside className="border-l border-border pl-6 lg:mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Current shell
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
      </section>
    </main>
  );
}
