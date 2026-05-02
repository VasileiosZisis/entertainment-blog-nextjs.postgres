import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "b",
      "strong",
      "em",
      "i",
      "strike",
      "u",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });
}
