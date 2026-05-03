import { redirect } from "next/navigation";
import { logoutAction } from "@/features/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="mt-3 text-muted">
            Signed in as {user.name} ({user.email})
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Log out
          </button>
        </form>
      </header>

      <section className="py-10">
        <h2 className="text-xl font-semibold text-foreground">
          Admin tools come next
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Authentication is active. Blog and upcoming management tools are
          scheduled for the admin content milestones.
        </p>
      </section>
    </main>
  );
}
