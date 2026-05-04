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
      title="Everything worth checking"
      description="Games, anime, books, and TV in one direct list. Search or scan by date when you just want the next thing to try"
      meta={`${data.totalPosts} post${data.totalPosts === 1 ? "" : "s"} ready to scan`}
    >
      <SearchForm />
      <section className="mt-14">
        <PostGrid
          posts={data.posts}
          emptyTitle="No posts yet"
          emptyMessage="Once something is published, it will show up here for a quick scan"
        />
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
