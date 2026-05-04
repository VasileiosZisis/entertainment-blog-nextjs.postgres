import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Pagination } from "@/components/pagination";
import { PostGrid } from "@/components/post-grid";
import { getCategoryConfig } from "@/features/posts/categories";
import { getPaginatedPostsByCategory } from "@/features/posts/queries";
import { CATEGORY_DETAILS, type BlogCategorySlug } from "@/lib/site";

type CategoryPostsPageProps = {
  categorySlug: BlogCategorySlug;
  page: number;
};

export async function CategoryPostsPage({
  categorySlug,
  page,
}: CategoryPostsPageProps) {
  const category = getCategoryConfig(categorySlug);
  const details = CATEGORY_DETAILS[categorySlug];
  const data = await getPaginatedPostsByCategory(category.prismaCategory, page);

  if (page > data.totalPages && data.totalPosts > 0) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Category"
      title={`${details.title} worth your time?`}
      description={details.description}
      meta={`${data.totalPosts} ${category.label.toLowerCase()} post${
        data.totalPosts === 1 ? "" : "s"
      }`}
    >
      <section className="mt-14">
        <PostGrid
          posts={data.posts}
          emptyTitle={`No ${category.label.toLowerCase()} posts yet`}
          emptyMessage={`This category is still empty. New ${category.label.toLowerCase()} notes will show up here when they are published`}
        />
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          getPageHref={(targetPage) =>
            targetPage === 1
              ? `/${category.slug}`
              : `/${category.slug}/page/${targetPage}`
          }
        />
      </section>
    </PageShell>
  );
}
