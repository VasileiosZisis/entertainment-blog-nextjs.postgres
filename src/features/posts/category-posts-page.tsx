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
      title={details.title}
      description={details.description}
    >
      <section className="mt-14">
        <PostGrid
          posts={data.posts}
          emptyMessage={`No ${category.label.toLowerCase()} posts found.`}
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
