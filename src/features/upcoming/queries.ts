import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

export const getUpcomingCards = cache(async () => {
  return prisma.upcoming.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      kind: true,
      subtitle: true,
      imageUrl: true,
      imageAlt: true,
    },
  });
});
