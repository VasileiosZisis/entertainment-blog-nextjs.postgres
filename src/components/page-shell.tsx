type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          {description}
        </p>
      </section>

      {children ?? (
        <section className="mt-14 border-t border-border pt-8">
          <p className="max-w-2xl text-sm leading-6 text-muted">
            This page shell is ready. Database-backed lists and article content
            are scheduled for Milestone 4.
          </p>
        </section>
      )}
    </main>
  );
}
