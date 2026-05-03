import Link from "next/link";
import { PUBLIC_NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 text-sm text-muted sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {SITE_NAME}
            </p>
            <p className="mt-3 max-w-md leading-6">
              Fast, focused notes on games, anime, books, and TV. Built for
              direct reading, clear structure, and honest verdicts.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p>
            Created by{" "}
            <Link
              href="https://www.vasiliszisis.me/"
              className="font-medium text-foreground transition-colors hover:text-accent"
            >
              Vasilis Zisis
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
