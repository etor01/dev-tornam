"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createLabAction } from "@/app/admin/actions/lab";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import { generateSlug } from "@/lib/utils/slug";

export default function NewLabPage() {
  const [state, formAction, isPending] = useActionState(createLabAction, null);
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
          <p className="eyebrow">Lab</p>
          <h1 className="adminPageTitle">New Experiment</h1>
        </div>
        <Link href="/admin/lab" className="adminBtn">← Back</Link>
      </header>

      {state?.error && <div className="adminAlert error" role="alert">✕ {state.error}</div>}

      <form action={formAction} className="adminForm">
        <div className="adminFormGrid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-title">Title *</label>
                <input id="lab-title" name="title" type="text" className="adminInput" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-slug">Slug *</label>
                <input id="lab-slug" name="slug" type="text" className="adminInput" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} required />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>/lab/{slug || "…"}</span>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-description">Description *</label>
                <textarea id="lab-description" name="description" className="adminTextarea" placeholder="What is this experiment about?" required rows={3} />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-tools">Tools & Technologies</label>
                <input id="lab-tools" name="tools_raw" type="text" className="adminInput" placeholder="Arduino, Python, Raspberry Pi" />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>Comma-separated</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Status & Visibility</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-status">Experiment Status</label>
                <select id="lab-status" name="status" className="adminSelect">
                  <option value="active">Active</option>
                  <option value="wip">Work in Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="adminCheckRow">
                <input id="lab-published" name="published" type="checkbox" className="adminCheckbox" value="on" />
                <label className="adminLabel" htmlFor="lab-published" style={{ margin: 0 }}>Publish immediately</label>
              </div>
            </div>
          </div>
        </div>

        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Experiment Details" placeholder="Document your experiment, findings, and notes…" />
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>{isPending ? "Saving…" : "Save Experiment"}</button>
          <Link href="/admin/lab" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
