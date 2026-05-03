import { UpcomingKind } from "@/generated/prisma/enums";

export const UPCOMING_KIND_OPTIONS = [
  UpcomingKind.READING,
  UpcomingKind.WATCHING,
  UpcomingKind.PLAYING,
] as const;

export function getUpcomingKindLabel(kind: UpcomingKind) {
  switch (kind) {
    case UpcomingKind.READING:
      return "Reading";
    case UpcomingKind.WATCHING:
      return "Watching";
    case UpcomingKind.PLAYING:
      return "Playing";
  }
}
