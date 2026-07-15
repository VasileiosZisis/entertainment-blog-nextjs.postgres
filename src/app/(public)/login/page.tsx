import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/auth/session";
import { getPageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...getPageMetadata({
    title: "Login",
    description: "Private admin login for Quick and Honest",
    path: "/login",
    noIndex: true,
  }),
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string | string[];
    demo?: string | string[];
  }>;
};

function getSafeAdminRedirect(next: string | string[] | undefined) {
  const value = Array.isArray(next) ? next[0] : next;

  if (value?.startsWith("/admin")) {
    return value;
  }

  return undefined;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [{ next, demo }, user] = await Promise.all([
    searchParams,
    getCurrentUser(),
  ]);
  const redirectTo = getSafeAdminRedirect(next);
  const demoUnavailable =
    (Array.isArray(demo) ? demo[0] : demo) === "unavailable";

  if (user) {
    redirect(redirectTo ?? "/admin");
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Login"
      description="Sign in to manage Quick and Honest content"
      meta="Private admin area"
    >
      {demoUnavailable ? (
        <p
          className="mt-10 w-full max-w-md border-l-2 border-accent bg-background/80 px-4 py-3 text-sm font-semibold text-foreground"
          role="alert"
        >
          The admin demo is temporarily unavailable. Please try again later.
        </p>
      ) : null}
      <LoginForm redirectTo={redirectTo} />
    </PageShell>
  );
}
