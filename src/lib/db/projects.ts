import { createClient, createPublicClient } from "@/lib/supabase/server";
import type { ProjectRow, ProjectInsert, ProjectUpdate } from "@/types/database";

// ─── Public queries (published projects only) ─────────────────────────────────

export async function getPublishedProjects(): Promise<ProjectRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[db/projects] getPublishedProjects:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.warn("[db/projects] getPublishedProjects failed:", err);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<ProjectRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[db/projects] getFeaturedProjects:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.warn("[db/projects] getFeaturedProjects failed:", err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    console.warn("[db/projects] getProjectBySlug failed:", err);
    return null;
  }
}

// ─── Admin queries (all projects) ────────────────────────────────────────────

export async function getAllProjects(): Promise<ProjectRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[db/projects] getAllProjects:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectById(id: string): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createProject(project: ProjectInsert): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("[db/projects] createProject:", error.message);
    return null;
  }
  return data;
}

export async function updateProject(
  id: string,
  updates: ProjectUpdate
): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[db/projects] updateProject:", error.message);
    return null;
  }
  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("[db/projects] deleteProject:", error.message);
    return false;
  }
  return true;
}
