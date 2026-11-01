"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { updateNoteAction, deleteNoteAction, toggleNotePublished } from "@/app/admin/actions/notes";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import ContentActions from "@/app/admin/components/ContentActions";
import type { NoteRow } from "@/types/database";

export default function EditNoteForm({ note }: { note: NoteRow }) {
  const searchParams = useSearchParams();
  const justSaved = searchParams.get("saved") === "true";

  const boundAction = updateNoteAction.bind(null, note.id);
  const [state, formAction, isPending] = useActionState(boundAction, null);
  const [slug, setSlug] = useState(note.slug);
  const [title, setTitle] = useState(note.title);

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <p className="eyebrow">Notes</p>
          <h1 className="adminPageTitle">Edit Note</h1>
        </div>
        <div className="adminActionRow">
          <ContentActions id={note.id} slug={note.slug} published={note.published} onToggle={toggleNotePublished} deleteAction={deleteNoteAction} previewHref={`/thoughts/${note.slug}`} />
          <Link href="/admin/notes" className="adminBtn">← Back</Link>
        </div>
      </header>

      {(justSaved || state?.success) && <div className="adminAlert success" role="status">✓ Note saved successfully.</div>}
      {state?.error && <div className="adminAlert error" role="alert">✕ {state.error}</div>}

      <form action={formAction} className="adminForm">
        <div className="adminFormGrid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-title">Title *</label>
                <input id="note-title" name="title" type="text" className="adminInput" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-slug">Slug *</label>
                <input id="note-slug" name="slug" type="text" className="adminInput" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>/thoughts/{slug}</span>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-excerpt">Excerpt</label>
                <textarea id="note-excerpt" name="excerpt" className="adminTextarea" defaultValue={note.excerpt ?? ""} rows={2} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Classification</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-category">Category</label>
                <input id="note-category" name="category" type="text" className="adminInput" defaultValue={note.category ?? ""} />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="note-tags">Tags</label>
                <input id="note-tags" name="tags_raw" type="text" className="adminInput" defaultValue={note.tags?.join(", ") ?? ""} />
              </div>
            </div>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Visibility</p>
              <div className="adminCheckRow">
                <input id="note-published" name="published" type="checkbox" className="adminCheckbox" value="on" defaultChecked={note.published} />
                <label className="adminLabel" htmlFor="note-published" style={{ margin: 0 }}>Published</label>
              </div>
              <div style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>
                {note.published_at ? <>Published: {new Date(note.published_at).toLocaleDateString()}</> : "Not yet published"}
                <br />Updated: {new Date(note.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Note Content *" initialValue={note.content} required />
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>{isPending ? "Saving…" : "Save Changes"}</button>
          <Link href="/admin/notes" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
