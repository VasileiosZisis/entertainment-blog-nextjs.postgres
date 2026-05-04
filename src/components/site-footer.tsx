import Link from "next/link";
import { PUBLIC_NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/72">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 text-sm text-muted sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-md">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {SITE_NAME}
            </p>
            <p className="mt-3 leading-6">
              Quick thoughts on games, anime, books, and TV, written to help you
              decide what is worth your time
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-5 sm:gap-y-2">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5 font-mono text-xs uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p>
            Created by{" "}
            <Link
              href="https://www.vasiliszisis.me/"
              className="text-foreground transition-colors hover:text-accent"
            >
              Vasilis Zisis
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
