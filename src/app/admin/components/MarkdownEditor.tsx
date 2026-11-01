"use client";

import { useState, useCallback } from "react";

interface Props {
  initialValue?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * Simple split-pane Markdown editor.
 * Left: raw Markdown textarea. Right: live rendered preview.
 * Uses a basic HTML conversion for the preview (no heavy dep needed).
 */
export default function MarkdownEditor({
  initialValue = "",
  name,
  label = "Content",
  placeholder = "Write your content in Markdown…",
  required = false,
}: Props) {
  const [value, setValue] = useState(initialValue);

  const preview = useCallback((md: string) => {
    // Basic Markdown → HTML (intentionally minimal — no XSS risk from admin-only UI)
    return md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Headings
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // Bold / italic
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Blockquotes
      .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
      // Unordered list items
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      // Images (before links)
      .replace(/!\[(.*?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:0.5rem 0;" />')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Horizontal rule
      .replace(/^---$/gm, "<hr>")
      // Paragraphs (double newlines)
      .split(/\n\n+/)
      .map((block) => {
        if (/^<(h[1-6]|blockquote|li|hr)/.test(block.trim())) return block;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n");
  }, []);

  return (
    <div className="adminField">
      {label && (
        <label className="adminLabel" htmlFor={`md-editor-${name}`}>
          {label}
          {required && " *"}
        </label>
      )}
      <div className="adminEditorSplit">
        {/* Editor pane */}
        <div className="adminEditorPane">
          <div className="adminEditorPaneHeader">Markdown</div>
          <textarea
            id={`md-editor-${name}`}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="adminEditorTextarea"
            placeholder={placeholder}
            required={required}
            aria-label={label}
          />
        </div>
        {/* Preview pane */}
        <div className="adminEditorPane">
          <div className="adminEditorPaneHeader">Preview</div>
          <div
            className="adminPreviewPane"
            dangerouslySetInnerHTML={{ __html: preview(value) || "<p style='color:var(--muted)'>Nothing to preview yet…</p>" }}
          />
        </div>
      </div>
      <p style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace", margin: "0.25rem 0 0" }}>
        Supports Markdown: **bold**, *italic*, # headings, `code`, [links](url), - lists
      </p>
    </div>
  );
}
