"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { PUBLIC_NAV_ITEMS, SITE_NAME } from "@/lib/site";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-md">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          onClick={() => setIsOpen(false)}
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-border bg-background/70 text-foreground transition-colors hover:border-foreground md:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`grid border-t border-border bg-background/94 transition-[grid-template-rows] duration-200 md:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="overflow-hidden" aria-label="Mobile navigation">
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4 sm:px-8">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block border-b border-border py-4 text-base font-semibold transition-colors last:border-b-0 ${
                      isActive
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
