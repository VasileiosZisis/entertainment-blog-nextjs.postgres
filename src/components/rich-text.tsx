import { sanitizeRichText } from "@/lib/sanitize-html";

type RichTextProps = {
  html: string;
};

export function RichText({ html }: RichTextProps) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}
