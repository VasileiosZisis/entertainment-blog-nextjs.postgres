import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenText, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";

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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/"
                className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
              >
                Quick and Honest
              </Link>
              <p className="mt-2 text-sm text-muted">
                Signed in as {user.email}
              </p>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                <LogOut size={16} aria-hidden="true" />
                Log out
              </button>
            </form>
          </div>

          <nav aria-label="Admin navigation">
            <ul className="flex flex-wrap gap-2">
              {adminNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
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

      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}
