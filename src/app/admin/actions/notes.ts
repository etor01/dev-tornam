"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/helpers";
import { createNote, updateNote, deleteNote } from "@/lib/db/notes";
import type { NoteInsert, NoteUpdate } from "@/types/database";
import { NoteSchema } from "@/lib/validation/schemas";

function parseNoteForm(formData: FormData): {
  data?: NoteInsert;
  errors?: Record<string, string>;
} {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    cover_image: formData.get("cover_image") as string,
    category: formData.get("category") as string,
    tags_raw: formData.get("tags_raw") as string,
    published: formData.get("published") as string,
  };

  const result = NoteSchema.safeParse(raw);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((e) => {
      errors[e.path[0] as string] = e.message;
    });
    return { errors };
  }

  const d = result.data;
  const isPublished = d.published === "on";
  const now = new Date().toISOString();

  return {
    data: {
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt || null,
      content: d.content,
      cover_image: d.cover_image || null,
      category: d.category || null,
      tags: d.tags_raw
        ? d.tags_raw.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      published: isPublished,
      published_at: isPublished ? now : null,
      updated_at: now,
    },
  };
}

export async function createNoteAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const { data, errors } = parseNoteForm(formData);
  if (errors) return { error: Object.values(errors)[0] };

  const note = await createNote(data!);
  if (!note) return { error: "Failed to create note. The slug may already be in use." };

  revalidatePath("/thoughts");
  revalidatePath(`/thoughts/${note.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/notes");

  redirect(`/admin/notes/${note.id}?saved=true`);
}

export async function updateNoteAction(
  id: string,
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const { data, errors } = parseNoteForm(formData);
  if (errors) return { error: Object.values(errors)[0] };

  const updates: NoteUpdate = { ...data };
  if (!updates.published) updates.published_at = null;

  const note = await updateNote(id, updates);
  if (!note) return { error: "Failed to update note." };

  revalidatePath("/thoughts");
  revalidatePath(`/thoughts/${note.slug}`);
  revalidatePath("/admin/notes");

  return { success: true };
}

export async function deleteNoteAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteNote(id);

  revalidatePath("/thoughts");
  revalidatePath("/admin");
  revalidatePath("/admin/notes");

  redirect("/admin/notes");
}

export async function toggleNotePublished(
  id: string,
  slug: string,
  published: boolean
): Promise<{ error?: string }> {
  await requireAdmin();

  const ok = await updateNote(id, {
    published,
    published_at: published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  });

  if (!ok) return { error: "Update failed." };

  revalidatePath("/thoughts");
  revalidatePath(`/thoughts/${slug}`);
  revalidatePath("/admin/notes");

  return {};
}
