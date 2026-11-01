"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { updateProjectAction, deleteProjectAction, toggleProjectPublished } from "@/app/admin/actions/projects";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import ContentActions from "@/app/admin/components/ContentActions";
import type { ProjectRow } from "@/types/database";

interface Props {
  project: ProjectRow;
}

export default function EditProjectForm({ project }: Props) {
  const searchParams = useSearchParams();
  const justSaved = searchParams.get("saved") === "true";

  const boundAction = updateProjectAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(boundAction, null);
  const [slug, setSlug] = useState(project.slug);
  const [title, setTitle] = useState(project.title);

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="adminPageTitle">Edit Project</h1>
          <p className="adminPageSubtitle" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem" }}>
            ID: {project.id}
          </p>
        </div>
        <div className="adminActionRow">
          <ContentActions
            id={project.id}
            slug={project.slug}
            published={project.published}
            onToggle={toggleProjectPublished}
            deleteAction={deleteProjectAction}
            previewHref={`/projects/${project.slug}`}
          />
          <Link href="/admin/projects" className="adminBtn">← Back</Link>
        </div>
      </header>

      {(justSaved || state?.success) && (
        <div className="adminAlert success" role="status">
          ✓ Project saved successfully.
        </div>
      )}
      {state?.error && (
        <div className="adminAlert error" role="alert">
          ✕ {state.error}
        </div>
      )}

      <form action={formAction} className="adminForm">
        <div className="adminFormGrid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-title">Title *</label>
                <input id="proj-title" name="title" type="text" className="adminInput" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-slug">Slug *</label>
                <input id="proj-slug" name="slug" type="text" className="adminInput" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>/projects/{slug}</span>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-description">Short Description *</label>
                <textarea id="proj-description" name="description" className="adminTextarea" defaultValue={project.description} required rows={3} />
              </div>
            </div>

            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Links & Metadata</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-github">GitHub URL</label>
                <input id="proj-github" name="github_url" type="url" className="adminInput" defaultValue={project.github_url ?? ""} placeholder="https://github.com/…" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-live">Live URL</label>
                <input id="proj-live" name="live_url" type="url" className="adminInput" defaultValue={project.live_url ?? ""} placeholder="https://…" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-tech">Tech Stack</label>
                <input id="proj-tech" name="tech_stack_raw" type="text" className="adminInput" defaultValue={project.tech_stack?.join(", ") ?? ""} placeholder="React, Node.js, PostgreSQL" />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>Comma-separated</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Classification</p>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-category">Category *</label>
                <select id="proj-category" name="category" className="adminSelect" defaultValue={project.category} required>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="design">Design</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-status">Project Status</label>
                <select id="proj-status" name="status" className="adminSelect" defaultValue={project.status}>
                  <option value="active">Active</option>
                  <option value="wip">Work in Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-year">Year</label>
                <input id="proj-year" name="year" type="number" className="adminInput" defaultValue={project.year ?? ""} min="2000" max="2099" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-order">Display Order</label>
                <input id="proj-order" name="display_order" type="number" className="adminInput" defaultValue={project.display_order} min="0" />
              </div>
            </div>

            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Visibility</p>
              <div className="adminCheckRow">
                <input id="proj-featured" name="featured" type="checkbox" className="adminCheckbox" value="on" defaultChecked={project.featured} />
                <label className="adminLabel" htmlFor="proj-featured" style={{ margin: 0 }}>Featured on homepage</label>
              </div>
              <div className="adminCheckRow">
                <input id="proj-published" name="published" type="checkbox" className="adminCheckbox" value="on" defaultChecked={project.published} />
                <label className="adminLabel" htmlFor="proj-published" style={{ margin: 0 }}>Published</label>
              </div>
              <div style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>
                {project.published_at && <>Published: {new Date(project.published_at).toLocaleDateString()}</>}
                {!project.published_at && "Not yet published"}
                <br />
                Updated: {new Date(project.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Full Project Content" initialValue={project.content ?? ""} />
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>
            {isPending ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/projects" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
