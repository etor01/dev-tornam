"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createNoteAction } from "@/app/admin/actions/notes";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import { generateSlug } from "@/lib/utils/slug";

export default function NewNotePage() {
  const [state, formAction, isPending] = useActionState(createNoteAction, null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) setSlug(generateSlug(val));
  };

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <p className="eyebrow">Notes</p>
          <h1 className="adminPageTitle">New Note</h1>
        </div>
        <Link href="/admin/notes" className="adminBtn">← Back</Link>
      </header>

      {state?.error && <div className="adminAlert error" role="alert">✕ {state.error}</div>}

      <form action={formAction} className="adminForm">
        <div className="adminFormGrid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-title">Title *</label>
                <input id="note-title" name="title" type="text" className="adminInput" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-slug">Slug *</label>
                <input id="note-slug" name="slug" type="text" className="adminInput" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} required />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>/thoughts/{slug || "…"}</span>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-excerpt">Excerpt</label>
                <textarea id="note-excerpt" name="excerpt" className="adminTextarea" placeholder="Short summary shown in the notes list…" rows={2} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Classification</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-category">Category</label>
                <input id="note-category" name="category" type="text" className="adminInput" placeholder="Design, Engineering, Life…" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-tags">Tags</label>
                <input id="note-tags" name="tags_raw" type="text" className="adminInput" placeholder="productivity, design, code" />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>Comma-separated</span>
              </div>
            </div>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Visibility</p>
              <div className="adminCheckRow">
                <input id="note-published" name="published" type="checkbox" className="adminCheckbox" value="on" />
                <label className="adminLabel" htmlFor="note-published" style={{ margin: 0 }}>Publish immediately</label>
              </div>
            </div>
          </div>
        </div>

        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Note Content *" required placeholder="Write your note in Markdown…" />
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>{isPending ? "Saving…" : "Save Note"}</button>
          <Link href="/admin/notes" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
