import Image from "next/image";
import type { UpcomingKind } from "@/generated/prisma/enums";

type UpcomingCardProps = {
  kind: UpcomingKind;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
};

function getKindLabel(kind: UpcomingKind) {
  switch (kind) {
    case "READING":
      return "Reading";
    case "WATCHING":
      return "Watching";
    case "PLAYING":
      return "Playing";
  }
}

export function UpcomingCard({
  kind,
  subtitle,
  imageUrl,
  imageAlt,
}: UpcomingCardProps) {
  return (
    <article className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-border pt-5">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {getKindLabel(kind)}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
          {subtitle}
        </h3>
      </div>
    </article>
  );
}
