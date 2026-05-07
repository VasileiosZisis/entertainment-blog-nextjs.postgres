import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeKeyword, parsePageParam } from "@/features/posts/page-params";
import { SearchResultsPage } from "@/features/posts/search-results-page";
import { getPageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ keyword: string; page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword, page } = await params;
  const decodedKeyword = decodeKeyword(keyword);
  const parsedPage = parsePageParam(page);

  if (!parsedPage) {
    return {
      title: "Page not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return getPageMetadata({
    title: `Search: ${decodedKeyword} - Page ${parsedPage}`,
    description: `Search results for ${decodedKeyword} on Quick and Honest`,
    path: `/blog/search/${keyword}/page/${parsedPage}`,
    noIndex: true,
  });
}

export default async function SearchPaginatedPage({ params }: Props) {
  const { keyword, page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <SearchResultsPage keyword={decodeKeyword(keyword)} page={page} />;
}
