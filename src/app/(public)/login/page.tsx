import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <PageShell
      eyebrow="Admin"
      title="Login"
      description="The admin login form will be implemented in the authentication milestone."
    />
  );
}
