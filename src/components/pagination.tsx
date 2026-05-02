import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
};

export function Pagination({
  currentPage,
  totalPages,
  getPageHref,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-wrap items-center gap-2 border-t border-border pt-8"
    >
      {currentPage > 1 && (
        <Link
          href={getPageHref(currentPage - 1)}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          Previous
        </Link>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "border border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={getPageHref(currentPage + 1)}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
