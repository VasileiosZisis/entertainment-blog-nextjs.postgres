"use client";

import { Trash2 } from "lucide-react";
import { useAdminDemoMode } from "@/components/admin-demo-mode";
import { deleteUpcomingAction } from "@/features/upcoming/admin-actions";

type DeleteUpcomingButtonProps = {
  cardId: string;
  cardTitle: string;
};

export function DeleteUpcomingButton({
  cardId,
  cardTitle,
}: DeleteUpcomingButtonProps) {
  const { isDemo, showDemoNotice } = useAdminDemoMode();

  return (
    <form
      action={deleteUpcomingAction}
      onSubmit={(event) => {
        if (isDemo) {
          event.preventDefault();
          showDemoNotice();
          return;
        }

        const confirmed = window.confirm(
          `Delete "${cardTitle}"? This removes the card and attempts to delete its Cloudinary image.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={cardId} />
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
