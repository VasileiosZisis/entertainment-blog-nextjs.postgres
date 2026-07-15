"use client";

import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CornerDownLeft,
  Eraser,
  Heading2,
  Heading3,
  Italic,
  Link,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  onReadOnlyAction?: () => void;
};

const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [2, 3],
    },
    link: false,
    underline: false,
  }),
  Underline,
  LinkExtension.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export function RichTextEditor({
  value,
  onChange,
  readOnly = false,
  onReadOnlyAction,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    editable: !readOnly,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-64 border border-border bg-background/80 px-4 py-3 text-base leading-7 text-foreground outline-none transition-colors focus:bg-background",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    editor?.setEditable(!readOnly);
  }, [editor, readOnly]);

  if (!editor) {
    return (
      <div className="min-h-64 border border-border bg-background/80 px-4 py-3 text-sm text-muted">
        Loading editor...
      </div>
    );
  }

  return (
    <div>
      <div
        aria-describedby={readOnly ? "demo-mode-banner" : undefined}
        aria-label="Rich text formatting"
        className={`flex flex-wrap gap-2 border border-b-0 border-border bg-background/70 p-2 ${
          readOnly ? "opacity-65" : ""
        }`}
        role="toolbar"
        onClickCapture={(event) => {
          if (readOnly && event.target instanceof Element) {
            const button = event.target.closest("button");

            if (button) {
              event.preventDefault();
              event.stopPropagation();
              onReadOnlyAction?.();
            }
          }
        }}
      >
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => applyParagraph(editor)}
        >
          <Pilcrow size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Bulleted list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="New paragraph"
          active={false}
          onClick={() =>
            editor.chain().focus().splitBlock().setParagraph().run()
          }
        >
          <CornerDownLeft size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href as
              | string
              | undefined;
            const url = window.prompt("URL", previousUrl ?? "");

            if (url === null) {
              return;
            }

            if (!url) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Clear formatting"
          active={false}
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <Eraser size={16} aria-hidden="true" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function applyParagraph(editor: Editor) {
  const { $from } = editor.state.selection;
  const selectionIsEmpty = editor.state.selection.empty;
  const cursorIsAtEndOfBlock = $from.parentOffset === $from.parent.content.size;
  const currentBlockHasText = $from.parent.content.size > 0;

  if (
    selectionIsEmpty &&
    !editor.isActive("paragraph") &&
    currentBlockHasText &&
    cursorIsAtEndOfBlock
  ) {
    editor.chain().focus().splitBlock().setParagraph().run();
    return;
  }

  editor.chain().focus().setParagraph().run();
}

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`inline-flex size-9 items-center justify-center border text-sm font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-foreground hover:border-foreground hover:bg-background"
      }`}
    >
      {children}
    </button>
  );
}
