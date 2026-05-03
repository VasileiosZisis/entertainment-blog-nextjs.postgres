import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string | string[];
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
  const [{ next }, user] = await Promise.all([searchParams, getCurrentUser()]);
  const redirectTo = getSafeAdminRedirect(next);

  if (user) {
    redirect(redirectTo ?? "/admin");
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Login"
      description="Sign in to manage Quick and Honest content."
    >
      <LoginForm redirectTo={redirectTo} />
    </PageShell>
  );
}
