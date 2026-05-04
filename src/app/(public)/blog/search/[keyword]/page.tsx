import type { Metadata } from "next";
import { SearchResultsPage } from "@/features/posts/search-results-page";
import { decodeKeyword } from "@/features/posts/page-params";

type Props = {
  params: Promise<{ keyword: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword } = await params;
  const decodedKeyword = decodeKeyword(keyword);

  return {
    title: `Search: ${decodedKeyword}`,
    description: `Search results for ${decodedKeyword} on Quick and Honest`,
  };
}

export default async function SearchPage({ params }: Props) {
  const { keyword } = await params;

  return <SearchResultsPage keyword={decodeKeyword(keyword)} page={1} />;
}
