"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/features/auth/actions";

const initialState: LoginActionState = {};

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-10 w-full max-w-sm space-y-5">
      {redirectTo && <input type="hidden" name="next" value={redirectTo} />}

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground"
        />
      </div>

      {state.error && (
        <p className="text-sm font-medium text-accent" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
