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
      className="mt-10 flex w-full max-w-3xl flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center"
      role="search"
      onSubmit={onSubmit}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
        <label className="sr-only" htmlFor="post-search">
          Search posts
        </label>
        <input
          id="post-search"
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search by title or quick take"
          className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
      >
        Search
      </button>
    </form>
  );
}
