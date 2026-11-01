"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/helpers";
import { upsertSettings } from "@/lib/db/settings";
import type { SettingKey } from "@/lib/db/settings";

const SETTING_KEYS: SettingKey[] = [
  "hero_name",
  "hero_lead",
  "hero_bio",
  "hero_availability",
  "contact_email",
  "social_linkedin",
  "social_github",
  "social_twitter",
  "footer_text",
];

export async function updateSettingsAction(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const settings: Partial<Record<SettingKey, string>> = {};
  for (const key of SETTING_KEYS) {
    const value = formData.get(key);
    if (value !== null) {
      settings[key] = value as string;
    }
  }

  const ok = await upsertSettings(settings);
  if (!ok) return { error: "Failed to save settings." };

  revalidatePath("/");
  revalidatePath("/admin/settings");

  return { success: true };
}
