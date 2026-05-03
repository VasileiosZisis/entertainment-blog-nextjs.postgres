import Image from "next/image";
import { DeleteUpcomingButton } from "@/components/delete-upcoming-button";
import { UpcomingForm } from "@/components/upcoming-form";
import { formatPostDate } from "@/features/posts/format";
import { getAdminUpcomingCards } from "@/features/upcoming/admin-queries";
import { getUpcomingKindLabel } from "@/features/upcoming/kinds";

export default async function AdminUpcomingPage() {
  const cards = await getAdminUpcomingCards();

  return (
    <section>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          Home page
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Upcoming cards
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Manage the Reading, Watching, and Playing cards shown on the public
          home page.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="divide-y divide-border border-y border-border">
          {cards.length > 0 ? (
            cards.map((card) => (
              <article
                key={card.id}
                className="grid gap-5 py-5 md:grid-cols-[120px_1fr_auto]"
              >
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  width={240}
                  height={150}
                  className="aspect-[8/5] w-full max-w-40 object-cover md:max-w-none"
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {getUpcomingKindLabel(card.kind)}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">
                    {card.subtitle}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    {card.imageAlt}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    Added {formatPostDate(card.createdAt)}
                  </p>
                </div>

                <div className="flex items-start md:justify-end">
                  <DeleteUpcomingButton
                    cardId={card.id}
                    cardTitle={`${getUpcomingKindLabel(card.kind)}: ${
                      card.subtitle
                    }`}
                  />
                </div>
              </article>
            ))
          ) : (
            <div className="py-12">
              <h2 className="text-xl font-semibold text-foreground">
                No upcoming cards yet
              </h2>
              <p className="mt-2 text-muted">
                Add one to show it on the public home page.
              </p>
            </div>
          )}
        </div>

        <aside className="border border-border p-5">
          <h2 className="text-xl font-semibold text-foreground">
            Add upcoming card
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Use concise titles for the thing currently being read, watched, or
            played.
          </p>

          <div className="mt-6">
            <UpcomingForm />
          </div>
        </aside>
      </div>
    </section>
  );
}
