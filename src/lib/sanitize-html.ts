import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "blockquote",
      "p",
      "h2",
      "h3",
      "a",
      "ul",
      "ol",
      "li",
      "b",
      "strong",
      "em",
      "i",
      "strike",
      "s",
      "u",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/],
      },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });
}
