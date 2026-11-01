"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createProjectAction } from "@/app/admin/actions/projects";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";
import { generateSlug } from "@/lib/utils/slug";

export default function NewProjectPage() {
  const [state, formAction, isPending] = useActionState(createProjectAction, null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) {
      setSlug(generateSlug(val));
    }
  };

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="adminPageTitle">New Project</h1>
        </div>
        <Link href="/admin/projects" className="adminBtn">
          ← Back
        </Link>
      </header>

      {state?.error && (
        <div className="adminAlert error" role="alert">
          ✕ {state.error}
        </div>
      )}

      <form action={formAction} className="adminForm">
        {/* Main content */}
        <div className="adminFormGrid">
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Core details</p>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-title">Title *</label>
                <input
                  id="proj-title"
                  name="title"
                  type="text"
                  className="adminInput"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-slug">Slug *</label>
                <input
                  id="proj-slug"
                  name="slug"
                  type="text"
                  className="adminInput"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEdited(true);
                  }}
                  placeholder="my-awesome-project"
                  required
                />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>
                  /projects/{slug || "…"}
                </span>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-description">Short Description *</label>
                <textarea
                  id="proj-description"
                  name="description"
                  className="adminTextarea"
                  placeholder="A brief description shown in the projects grid…"
                  required
                  rows={3}
                />
              </div>
            </div>

            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Links & Metadata</p>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-github">GitHub URL</label>
                <input id="proj-github" name="github_url" type="url" className="adminInput" placeholder="https://github.com/…" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-live">Live URL</label>
                <input id="proj-live" name="live_url" type="url" className="adminInput" placeholder="https://…" />
              </div>
              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-tech">Tech Stack</label>
                <input id="proj-tech" name="tech_stack_raw" type="text" className="adminInput" placeholder="React, Node.js, PostgreSQL" />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>Comma-separated list</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Classification</p>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-category">Category *</label>
                <select id="proj-category" name="category" className="adminSelect" required>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="design">Design</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-status">Project Status</label>
                <select id="proj-status" name="status" className="adminSelect">
                  <option value="active">Active</option>
                  <option value="wip">Work in Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-year">Year</label>
                <input id="proj-year" name="year" type="number" className="adminInput" placeholder={String(new Date().getFullYear())} min="2000" max="2099" />
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="proj-order">Display Order</label>
                <input id="proj-order" name="display_order" type="number" className="adminInput" placeholder="0" min="0" />
              </div>
            </div>

            <div className="adminFormSection">
              <p className="adminFormSectionTitle">Visibility</p>

              <div className="adminCheckRow">
                <input id="proj-featured" name="featured" type="checkbox" className="adminCheckbox" value="on" />
                <label className="adminLabel" htmlFor="proj-featured" style={{ margin: 0 }}>Featured on homepage</label>
              </div>

              <div className="adminCheckRow">
                <input id="proj-published" name="published" type="checkbox" className="adminCheckbox" value="on" />
                <label className="adminLabel" htmlFor="proj-published" style={{ margin: 0 }}>Publish immediately</label>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width markdown editor */}
        <div className="adminFormSection">
          <MarkdownEditor name="content" label="Full Project Content" placeholder="Write a detailed description, technical notes, and anything else about this project…" />
        </div>

        {/* Submit */}
        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>
            {isPending ? "Saving…" : "Save Project"}
          </button>
          <Link href="/admin/projects" className="adminBtn">Cancel</Link>
        </div>
      </form>
    </>
  );
}
