"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/helpers";
import {
  createExperiment,
  updateExperiment,
  deleteExperiment,
} from "@/lib/db/lab";
import type { LabInsert, LabUpdate } from "@/types/database";
import { LabSchema } from "@/lib/validation/schemas";

function parseLabForm(formData: FormData): {
  data?: LabInsert;
  errors?: Record<string, string>;
} {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    tools_raw: formData.get("tools_raw") as string,
    status: formData.get("status") as string,
    published: formData.get("published") as string,
  };

  const result = LabSchema.safeParse(raw);
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
      description: d.description,
      content: d.content || null,
      tools: d.tools_raw
        ? d.tools_raw.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      status: d.status as "active" | "archived" | "wip",
      images: [],
      published: isPublished,
      updated_at: now,
    },
  };
}

export async function createLabAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const { data, errors } = parseLabForm(formData);
  if (errors) return { error: Object.values(errors)[0] };

  const exp = await createExperiment(data!);
  if (!exp) return { error: "Failed to create experiment. The slug may already be in use." };

  revalidatePath("/lab");
  revalidatePath(`/lab/${exp.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/lab");

  redirect(`/admin/lab/${exp.id}?saved=true`);
}

export async function updateLabAction(
  id: string,
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const { data, errors } = parseLabForm(formData);
  if (errors) return { error: Object.values(errors)[0] };

  const updates: LabUpdate = { ...data };
  const exp = await updateExperiment(id, updates);
  if (!exp) return { error: "Failed to update experiment." };

  revalidatePath("/lab");
  revalidatePath(`/lab/${exp.slug}`);
  revalidatePath("/admin/lab");

  return { success: true };
}

export async function deleteLabAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteExperiment(id);

  revalidatePath("/lab");
  revalidatePath("/admin");
  revalidatePath("/admin/lab");

  redirect("/admin/lab");
}

export async function toggleLabPublished(
  id: string,
  slug: string,
  published: boolean
): Promise<{ error?: string }> {
  await requireAdmin();

  const ok = await updateExperiment(id, {
    published,
    updated_at: new Date().toISOString(),
  });

  if (!ok) return { error: "Update failed." };

  revalidatePath("/lab");
  revalidatePath(`/lab/${slug}`);
  revalidatePath("/admin/lab");

  return {};
}
