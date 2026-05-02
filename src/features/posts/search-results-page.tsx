import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Pagination } from "@/components/pagination";
import { PostGrid } from "@/components/post-grid";
import { SearchForm } from "@/components/search-form";
import { searchPaginatedPosts } from "@/features/posts/queries";

type SearchResultsPageProps = {
  keyword: string;
  page: number;
};

export async function SearchResultsPage({
  keyword,
  page,
}: SearchResultsPageProps) {
  if (!keyword) {
    notFound();
  }

  const data = await searchPaginatedPosts(keyword, page);
  const encodedKeyword = encodeURIComponent(keyword);

  if (page > data.totalPages && data.totalPosts > 0) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Search"
      title={`Search: ${keyword}`}
      description={`${data.totalPosts} result${
        data.totalPosts === 1 ? "" : "s"
      } found across Quick and Honest posts.`}
    >
      <SearchForm defaultValue={keyword} />
      <section className="mt-14">
        <PostGrid posts={data.posts} emptyMessage="No matching posts found." />
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          getPageHref={(targetPage) =>
            targetPage === 1
              ? `/blog/search/${encodedKeyword}`
              : `/blog/search/${encodedKeyword}/page/${targetPage}`
          }
        />
      </section>
    </PageShell>
  );
}
