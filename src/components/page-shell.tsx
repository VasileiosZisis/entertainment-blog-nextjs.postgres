type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  meta,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      <section className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.98] text-balance text-foreground sm:text-6xl">
            {title}
          </h1>
        </div>

        <div className="max-w-2xl lg:pt-10">
          <p className="text-lg leading-8 text-muted">{description}</p>
          {meta ? (
            <p className="mt-6 border-t border-border pt-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {meta}
            </p>
          ) : null}
        </div>
      </section>

      {children ?? (
        <section className="mt-14 border-t border-border pt-8">
          <p className="max-w-2xl text-sm leading-6 text-muted">
            This page shell is ready. Database-backed lists and article content
            can be added when the page needs them
          </p>
        </section>
      )}
    </main>
  );
}
