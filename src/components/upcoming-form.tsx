"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { useAdminDemoMode } from "@/components/admin-demo-mode";
import { createUpcomingAction } from "@/features/upcoming/admin-actions";
import {
  ALLOWED_UPCOMING_IMAGE_TYPES,
  type UpcomingFormField,
  type UpcomingFormState,
} from "@/features/upcoming/admin-validation";
import {
  getUpcomingKindLabel,
  UPCOMING_KIND_OPTIONS,
} from "@/features/upcoming/kinds";

const initialState: UpcomingFormState = {};

export function UpcomingForm() {
  const { isDemo, showDemoNotice } = useAdminDemoMode();
  const [state, formAction, isPending] = useActionState(
    createUpcomingAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6"
      onSubmit={(event) => {
        if (isDemo) {
          event.preventDefault();
          showDemoNotice();
        }
      }}
    >
      <FormError errors={state.errors?.form} />

      <Field label="Type" name="kind" errors={state.errors?.kind}>
        <select
          id="kind"
          name="kind"
          required
          disabled={isDemo}
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        >
          {UPCOMING_KIND_OPTIONS.map((kind) => (
            <option key={kind} value={kind}>
              {getUpcomingKindLabel(kind)}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Subtitle" name="subtitle" errors={state.errors?.subtitle}>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          required
          maxLength={120}
          disabled={isDemo}
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        />
      </Field>

      <Field label="Image" name="image" errors={state.errors?.image}>
        <input
          id="image"
          name="image"
          type="file"
          accept={ALLOWED_UPCOMING_IMAGE_TYPES.join(",")}
          required
          disabled={isDemo}
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-sm text-foreground file:mr-4 file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-semibold file:text-background"
        />
        <p className="mt-2 text-xs text-muted">
          JPEG, PNG, or WebP. Maximum 5 MB
        </p>
      </Field>

      <Field
        label="Image alt text"
        name="imageAlt"
        errors={state.errors?.imageAlt}
      >
        <input
          id="imageAlt"
          name="imageAlt"
          type="text"
          required
          maxLength={180}
          disabled={isDemo}
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        aria-describedby={isDemo ? "demo-mode-banner" : undefined}
        className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={16} aria-hidden="true" />
        {isPending ? "Adding..." : "Add card"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  errors,
  children,
}: {
  label: string;
  name: Exclude<UpcomingFormField, "form">;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold uppercase tracking-[0.16em] text-muted"
      >
        {label}
      </label>
      {children}
      <FormError errors={errors} />
    </div>
  );
}

function FormError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p className="mt-2 text-sm font-medium text-accent" role="alert">
      {errors[0]}
    </p>
  );
}
