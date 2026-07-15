import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenText, Clock3, LayoutDashboard, LogOut } from "lucide-react";
import { AdminDemoModeProvider } from "@/components/admin-demo-mode";
import { logoutAction } from "@/features/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const adminNavItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/posts",
    label: "Posts",
    icon: BookOpenText,
  },
  {
    href: "/admin/upcoming",
    label: "Upcoming",
    icon: Clock3,
  },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AdminDemoModeProvider isDemo={user.isDemo}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-background/88 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href="/"
                  className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                >
                  Quick and Honest
                </Link>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  Admin / {user.email}
                </p>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 border border-border bg-background/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-background"
                >
                  <LogOut size={16} aria-hidden="true" />
                  {user.isDemo ? "Exit demo" : "Log out"}
                </button>
              </form>
            </div>

            {user.isDemo ? (
              <div
                id="demo-mode-banner"
                role="status"
                className="border-l-2 border-accent bg-background px-4 py-3 text-sm font-semibold text-foreground"
              >
                Demo mode — read-only. You can explore the admin area, but
                changes are disabled.
              </div>
            ) : null}

            <nav aria-label="Admin navigation">
              <ul className="flex flex-wrap gap-2">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 border border-border bg-background/60 px-4 py-2 text-sm font-semibold text-muted transition-colors hover:border-foreground hover:bg-background hover:text-foreground"
                      >
                        <Icon size={16} aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </AdminDemoModeProvider>
  );
}
