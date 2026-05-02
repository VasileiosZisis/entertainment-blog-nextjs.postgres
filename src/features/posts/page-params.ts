export function parsePageParam(value: string | undefined) {
  if (!value) {
    return 1;
  }

  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return null;
  }

  return page;
}

export function decodeKeyword(value: string) {
  return decodeURIComponent(value).trim();
}
