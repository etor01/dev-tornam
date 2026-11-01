"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/helpers";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/db/projects";
import type { ProjectInsert, ProjectUpdate } from "@/types/database";
import { ProjectSchema } from "@/lib/validation/schemas";

function parseProjectForm(formData: FormData): {
  data?: ProjectInsert;
  errors?: Record<string, string>;
} {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    cover_image: formData.get("cover_image") as string,
    tech_stack_raw: formData.get("tech_stack_raw") as string,
    category: formData.get("category") as string,
    github_url: formData.get("github_url") as string,
    live_url: formData.get("live_url") as string,
    year: formData.get("year") as string,
    status: formData.get("status") as string,
    featured: formData.get("featured") as string,
    display_order: formData.get("display_order") as string,
    published: formData.get("published") as string,
  };

  const result = ProjectSchema.safeParse(raw);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((e) => {
      errors[e.path[0] as string] = e.message;
    });
    return { errors };
  }

  const d = result.data;
  const now = new Date().toISOString();
  const isPublished = d.published === "on";

  return {
    data: {
      title: d.title,
      slug: d.slug,
      description: d.description,
      content: d.content || null,
      cover_image: d.cover_image || null,
      tech_stack: d.tech_stack_raw
        ? d.tech_stack_raw.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      category: d.category,
      github_url: d.github_url || null,
      live_url: d.live_url || null,
      year: d.year ? parseInt(d.year, 10) : null,
      status: d.status as "active" | "archived" | "wip",
      featured: d.featured === "on",
      display_order: d.display_order ? parseInt(d.display_order, 10) : 0,
      published: isPublished,
      published_at: isPublished ? now : null,
      updated_at: now,
    },
  };
}

// ─── Server actions ───────────────────────────────────────────────────────────

export async function createProjectAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const { data, errors } = parseProjectForm(formData);
  if (errors) {
    return { error: Object.values(errors)[0] };
  }

  const project = await createProject(data!);
  if (!project) {
    return { error: "Failed to create project. The slug may already be in use." };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect(`/admin/projects/${project.id}?saved=true`);
}

export async function updateProjectAction(
  id: string,
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const { data, errors } = parseProjectForm(formData);
  if (errors) {
    return { error: Object.values(errors)[0] };
  }

  const updates: ProjectUpdate = { ...data };
  // Preserve published_at only if toggling to published
  if (!updates.published) {
    updates.published_at = null;
  }

  const project = await updateProject(id, updates);
  if (!project) {
    return { error: "Failed to update project. The slug may already be in use." };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");

  return { success: true };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdmin();

  await deleteProject(id);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}

export async function toggleProjectPublished(
  id: string,
  slug: string,
  published: boolean
): Promise<{ error?: string }> {
  await requireAdmin();

  const ok = await updateProject(id, {
    published,
    published_at: published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  });

  if (!ok) return { error: "Update failed." };

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");

  return {};
}
