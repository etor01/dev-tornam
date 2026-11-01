import { createClient, createPublicClient } from "@/lib/supabase/server";

// ─── Known setting keys ───────────────────────────────────────────────────────

export type SettingKey =
  | "hero_name"
  | "hero_lead"
  | "hero_bio"
  | "hero_availability"
  | "contact_email"
  | "social_linkedin"
  | "social_github"
  | "social_twitter"
  | "footer_text";

/**
 * Returns all site settings as a typed key→value map.
 * Falls back to empty strings for missing keys.
 */
export async function getSiteSettings(): Promise<Record<SettingKey, string>> {
  const defaults: Record<SettingKey, string> = {
    hero_name: "Etornam Kordzo Ahiataku",
    hero_lead:
      "Software Engineer • I build functional, User-centric systems • Covering cloud and backend environments.",
    hero_bio: "",
    hero_availability: "true",
    contact_email: "",
    social_linkedin: "https://www.linkedin.com/in/ahiatakuetornam/",
    social_github: "https://github.com/etor01",
    social_twitter: "https://x.com/AhiatakuEtornam",
    footer_text: "",
  };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaults;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error || !data) return defaults;

    const result = { ...defaults };
    for (const row of data) {
      if (row.key in result) {
        (result as Record<string, string>)[row.key] = row.value ?? "";
      }
    }

    return result;
  } catch (err) {
    console.warn("[db/settings] getSiteSettings failed, using defaults:", err);
    return defaults;
  }
}

/**
 * Upserts a single setting by key. Admin-only — callers must call requireAdmin().
 */
export async function upsertSetting(key: string, value: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

  if (error) {
    console.error("[db/settings] upsertSetting:", error.message);
    return false;
  }
  return true;
}

/**
 * Bulk-upserts multiple settings at once.
 */
export async function upsertSettings(
  settings: Partial<Record<SettingKey, string>>
): Promise<boolean> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value: value ?? "",
    updated_at: now,
  }));

  const { error } = await supabase
    .from("site_settings")
    .upsert(rows, { onConflict: "key" });

  if (error) {
    console.error("[db/settings] upsertSettings:", error.message);
    return false;
  }
  return true;
}
