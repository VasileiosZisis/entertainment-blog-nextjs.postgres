"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useActionState, useState } from "react";
import { Save } from "lucide-react";
import { useAdminDemoMode } from "@/components/admin-demo-mode";
import { BlogCategory } from "@/generated/prisma/enums";
import {
  createPostAction,
  updatePostAction,
} from "@/features/posts/admin-actions";
import {
  ALLOWED_POST_IMAGE_TYPES,
  type PostFormField,
  type PostFormState,
} from "@/features/posts/admin-validation";
import { getCategoryLabel } from "@/features/posts/categories";

const RichTextEditor = dynamic(
  () =>
    import("@/components/rich-text-editor").then(
      (module) => module.RichTextEditor,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-64 border border-border bg-background/80 px-4 py-3 text-sm text-muted">
        Loading editor...
      </div>
    ),
  },
);

type EditablePost = {
  id: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  content: string;
  imageUrl: string;
  imageAlt: string;
  published: boolean;
};

type PostFormProps =
  | {
      mode: "create";
      initialPost?: never;
    }
  | {
      mode: "edit";
      initialPost: EditablePost;
    };

const initialState: PostFormState = {};

const categoryOptions = [
  BlogCategory.GAME,
  BlogCategory.ANIME,
  BlogCategory.BOOK,
  BlogCategory.TV,
] as const;

export function PostForm({ mode, initialPost }: PostFormProps) {
  const { isDemo, showDemoNotice } = useAdminDemoMode();
  const [content, setContent] = useState(initialPost?.content ?? "<p></p>");
  const [state, formAction, isPending] = useActionState(
    mode === "create" ? createPostAction : updatePostAction,
    initialState,
  );
  const imageRequired = mode === "create";

  return (
    <form
      action={formAction}
      className="mt-10 max-w-5xl space-y-10"
      onSubmit={(event) => {
        if (isDemo) {
          event.preventDefault();
          showDemoNotice();
        }
      }}
    >
      {mode === "edit" && (
        <input type="hidden" name="id" value={initialPost.id} />
      )}
      <input type="hidden" name="content" value={content} />

      <FormError errors={state.errors?.form} />

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Title" name="title" errors={state.errors?.title}>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={80}
            defaultValue={initialPost?.title}
            disabled={isDemo}
            className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
          />
        </Field>

        <Field label="Category" name="category" errors={state.errors?.category}>
          <select
            id="category"
            name="category"
            required
            defaultValue={initialPost?.category ?? BlogCategory.GAME}
            disabled={isDemo}
            className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Subtitle" name="subtitle" errors={state.errors?.subtitle}>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          required
          maxLength={140}
          defaultValue={initialPost?.subtitle}
          disabled={isDemo}
          className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
        />
      </Field>

      <div>
        <div className="mb-2 flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Content
          </label>
          <p className="text-sm text-muted">
            Rich text is sanitized before it is stored
          </p>
        </div>
        <RichTextEditor
          value={content}
          onChange={setContent}
          readOnly={isDemo}
          onReadOnlyAction={showDemoNotice}
        />
        <FormError errors={state.errors?.content} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Image" name="image" errors={state.errors?.image}>
          <input
            id="image"
            name="image"
            type="file"
            accept={ALLOWED_POST_IMAGE_TYPES.join(",")}
            required={imageRequired}
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
            defaultValue={initialPost?.imageAlt}
            disabled={isDemo}
            className="mt-3 w-full border border-border bg-background/80 px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-foreground focus:bg-background"
          />
        </Field>
      </div>

      {initialPost?.imageUrl && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Current image
          </p>
          <Image
            src={initialPost.imageUrl}
            alt={initialPost.imageAlt}
            width={640}
            height={400}
            className="mt-3 aspect-[8/5] w-full max-w-xl object-cover"
          />
        </div>
      )}

      <label className="flex items-center gap-3 text-sm font-medium text-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initialPost?.published ?? true}
          disabled={isDemo}
          className="size-4 accent-foreground"
        />
        Published
      </label>

      <div className="border-t border-border pt-6">
        <button
          type="submit"
          disabled={isPending}
          aria-describedby={isDemo ? "demo-mode-banner" : undefined}
          className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} aria-hidden="true" />
          {isPending
            ? "Saving..."
            : mode === "create"
              ? "Create post"
              : "Save changes"}
        </button>
      </div>
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
  name: Exclude<PostFormField, "form">;
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
