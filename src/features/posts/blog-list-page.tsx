import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Pagination } from "@/components/pagination";
import { PostGrid } from "@/components/post-grid";
import { SearchForm } from "@/components/search-form";
import { getPaginatedPosts } from "@/features/posts/queries";

type BlogListPageProps = {
  page: number;
};

export async function BlogListPage({ page }: BlogListPageProps) {
  const data = await getPaginatedPosts(page);

  if (page > data.totalPages && data.totalPosts > 0) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="All posts"
      title="Blog"
      description="All quick and honest posts across games, anime, books, and TV."
    >
      <SearchForm />
      <section className="mt-14">
        <PostGrid posts={data.posts} />
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          getPageHref={(targetPage) =>
            targetPage === 1 ? "/blog" : `/blog/page/${targetPage}`
          }
        />
      </section>
    </PageShell>
  );
}
