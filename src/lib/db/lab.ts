import { createClient, createPublicClient } from "@/lib/supabase/server";
import type { LabExperimentRow, LabInsert, LabUpdate } from "@/types/database";

// ─── Public queries ───────────────────────────────────────────────────────────

export async function getPublishedExperiments(): Promise<LabExperimentRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("lab_experiments")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[db/lab] getPublishedExperiments:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.warn("[db/lab] getPublishedExperiments failed:", err);
    return [];
  }
}

export async function getExperimentBySlug(slug: string): Promise<LabExperimentRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("lab_experiments")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    console.warn("[db/lab] getExperimentBySlug failed:", err);
    return null;
  }
}

// ─── Admin queries ────────────────────────────────────────────────────────────

export async function getAllExperiments(): Promise<LabExperimentRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lab_experiments")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[db/lab] getAllExperiments:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getExperimentById(id: string): Promise<LabExperimentRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lab_experiments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createExperiment(exp: LabInsert): Promise<LabExperimentRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lab_experiments")
    .insert(exp)
    .select()
    .single();

  if (error) {
    console.error("[db/lab] createExperiment:", error.message);
    return null;
  }
  return data;
}

export async function updateExperiment(
  id: string,
  updates: LabUpdate
): Promise<LabExperimentRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lab_experiments")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[db/lab] updateExperiment:", error.message);
    return null;
  }
  return data;
}

export async function deleteExperiment(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("lab_experiments").delete().eq("id", id);

  if (error) {
    console.error("[db/lab] deleteExperiment:", error.message);
    return false;
  }
  return true;
}
