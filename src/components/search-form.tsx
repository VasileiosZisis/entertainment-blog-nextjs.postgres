"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type SearchFormProps = {
  defaultValue?: string;
};

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(defaultValue);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = keyword.trim();

    if (!value) {
      router.push("/blog");
      return;
    }

    router.push(`/blog/search/${encodeURIComponent(value)}`);
  }

  return (
    <form
      className="mt-10 flex w-full max-w-xl items-center gap-2 border-b border-border pb-3"
      role="search"
      onSubmit={onSubmit}
    >
      <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
      <label className="sr-only" htmlFor="post-search">
        Search posts
      </label>
      <input
        id="post-search"
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search posts"
        className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
      >
        Search
      </button>
    </form>
  );
}
