import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeKeyword, parsePageParam } from "@/features/posts/page-params";
import { SearchResultsPage } from "@/features/posts/search-results-page";

type Props = {
  params: Promise<{ keyword: string; page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword, page } = await params;
  const decodedKeyword = decodeKeyword(keyword);

  return {
    title: `Search: ${decodedKeyword} - Page ${page}`,
    description: `Search results for ${decodedKeyword} on Quick and Honest`,
  };
}

export default async function SearchPaginatedPage({ params }: Props) {
  const { keyword, page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <SearchResultsPage keyword={decodeKeyword(keyword)} page={page} />;
}
