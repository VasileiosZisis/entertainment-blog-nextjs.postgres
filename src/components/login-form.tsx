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
    <form
      action={formAction}
      className="mt-10 w-full max-w-md border-y border-border py-6"
    >
      {redirectTo && <input type="hidden" name="next" value={redirectTo} />}

      <div>
        <label
          htmlFor="email"
          className="text-sm font-semibold uppercase tracking-[0.16em] text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="password"
          className="text-sm font-semibold uppercase tracking-[0.16em] text-muted"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        />
      </div>

      {state.error && (
        <p className="mt-5 text-sm font-semibold text-accent" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
