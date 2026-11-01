import { createClient, createPublicClient } from "@/lib/supabase/server";
import type { NoteRow, NoteInsert, NoteUpdate } from "@/types/database";

// ─── Public queries ───────────────────────────────────────────────────────────

export async function getPublishedNotes(): Promise<NoteRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("[db/notes] getPublishedNotes:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.warn("[db/notes] getPublishedNotes failed:", err);
    return [];
  }
}

export async function getNoteBySlug(slug: string): Promise<NoteRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    console.warn("[db/notes] getNoteBySlug failed:", err);
    return null;
  }
}

// ─── Admin queries ────────────────────────────────────────────────────────────

export async function getAllNotes(): Promise<NoteRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[db/notes] getAllNotes:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getNoteById(id: string): Promise<NoteRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createNote(note: NoteInsert): Promise<NoteRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .insert(note)
    .select()
    .single();

  if (error) {
    console.error("[db/notes] createNote:", error.message);
    return null;
  }
  return data;
}

export async function updateNote(
  id: string,
  updates: NoteUpdate
): Promise<NoteRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[db/notes] updateNote:", error.message);
    return null;
  }
  return data;
}

export async function deleteNote(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.error("[db/notes] deleteNote:", error.message);
    return false;
  }
  return true;
}
