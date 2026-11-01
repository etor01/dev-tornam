"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { updateLabAction, deleteLabAction, toggleLabPublished } from "@/app/admin/actions/lab";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import ContentActions from "@/app/admin/components/ContentActions";
import type { LabExperimentRow } from "@/types/database";

export default function EditLabForm({ experiment }: { experiment: LabExperimentRow }) {
  const searchParams = useSearchParams();
  const justSaved = searchParams.get("saved") === "true";

  const boundAction = updateLabAction.bind(null, experiment.id);
  const [state, formAction, isPending] = useActionState(boundAction, null);

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <p className="eyebrow">Lab</p>
          <h1 className="adminPageTitle">Edit Experiment</h1>
        </div>
        <div className="adminActionRow">
          <ContentActions id={experiment.id} slug={experiment.slug} published={experiment.published} onToggle={toggleLabPublished} deleteAction={deleteLabAction} previewHref={`/lab/${experiment.slug}`} />
          <Link href="/admin/lab" className="adminBtn">← Back</Link>
        </div>
      </header>

      {(justSaved || state?.success) && <div className="adminAlert success" role="status">✓ Experiment saved.</div>}
      {state?.error && <div className="adminAlert error" role="alert">✕ {state.error}</div>}

      <form action={formAction} className="adminForm">
        <div className="adminFormGrid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-title">Title *</label>
                <input id="lab-title" name="title" type="text" className="adminInput" defaultValue={experiment.title} required />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-slug">Slug *</label>
                <input id="lab-slug" name="slug" type="text" className="adminInput" defaultValue={experiment.slug} required />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>/lab/{experiment.slug}</span>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-description">Description *</label>
                <textarea id="lab-description" name="description" className="adminTextarea" defaultValue={experiment.description} required rows={3} />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-tools">Tools & Technologies</label>
                <input id="lab-tools" name="tools_raw" type="text" className="adminInput" defaultValue={experiment.tools?.join(", ") ?? ""} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Status & Visibility</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="lab-status">Experiment Status</label>
                <select id="lab-status" name="status" className="adminSelect" defaultValue={experiment.status}>
                  <option value="active">Active</option>
                  <option value="wip">Work in Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="adminCheckRow">
                <input id="lab-published" name="published" type="checkbox" className="adminCheckbox" value="on" defaultChecked={experiment.published} />
                <label className="adminLabel" htmlFor="lab-published" style={{ margin: 0 }}>Published</label>
              </div>
              <div style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>
                Updated: {new Date(experiment.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Experiment Details" initialValue={experiment.content ?? ""} />
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>{isPending ? "Saving…" : "Save Changes"}</button>
          <Link href="/admin/lab" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
