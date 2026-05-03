"use client";

import { Trash2 } from "lucide-react";
import { deleteUpcomingAction } from "@/features/upcoming/admin-actions";

type DeleteUpcomingButtonProps = {
  cardId: string;
  cardTitle: string;
};

export function DeleteUpcomingButton({
  cardId,
  cardTitle,
}: DeleteUpcomingButtonProps) {
  return (
    <form
      action={deleteUpcomingAction}
      onSubmit={(event) => {
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
        className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Trash2 size={16} aria-hidden="true" />
        Delete
      </button>
    </form>
  );
}
