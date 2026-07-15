"use client";

import { LayoutDashboard } from "lucide-react";
import { useFormStatus } from "react-dom";
import { startDemoSessionAction } from "@/features/auth/actions";

type DemoAdminEntryProps = {
  variant: "desktop" | "mobile";
  onStart?: () => void;
};

export function DemoAdminEntry({ variant, onStart }: DemoAdminEntryProps) {
  return (
    <form action={startDemoSessionAction}>
      <DemoAdminSubmitButton variant={variant} onStart={onStart} />
    </form>
  );
}

function DemoAdminSubmitButton({ variant, onStart }: DemoAdminEntryProps) {
  const { pending } = useFormStatus();
  const className =
    variant === "desktop"
      ? "inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-background disabled:cursor-wait disabled:opacity-60"
      : "flex w-full cursor-pointer items-center gap-2 border-b border-border py-4 text-left text-base font-semibold text-foreground transition-colors hover:text-accent disabled:cursor-wait disabled:opacity-60";

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={onStart}
    >
      <LayoutDashboard size={16} aria-hidden="true" />
      {pending ? "Opening demo..." : "Admin demo"}
    </button>
  );
}
