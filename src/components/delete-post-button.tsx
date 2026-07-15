"use client";

import { Trash2 } from "lucide-react";
import { useAdminDemoMode } from "@/components/admin-demo-mode";
import { deletePostAction } from "@/features/posts/admin-actions";

type DeletePostButtonProps = {
  postId: string;
  postTitle: string;
};

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const { isDemo, showDemoNotice } = useAdminDemoMode();

  return (
    <form
      action={deletePostAction}
      onSubmit={(event) => {
        if (isDemo) {
          event.preventDefault();
          showDemoNotice();
          return;
        }

        const confirmed = window.confirm(
          `Delete "${postTitle}"? This removes the post and attempts to delete its Cloudinary image.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={postId} />
      <button
        type="submit"
        aria-describedby={isDemo ? "demo-mode-banner" : undefined}
        className="inline-flex items-center gap-2 border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Trash2 size={16} aria-hidden="true" />
        Delete
      </button>
    </form>
  );
}
