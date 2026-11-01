"use client";

import { useActionState } from "react";
import { updateSettingsAction } from "@/app/admin/actions/settings";

interface Props {
  settings: Record<string, string>;
}

export default function SettingsForm({ settings }: Props) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, null);

  return (
    <>
      {state?.success && <div className="adminAlert success" role="status">✓ Settings saved successfully.</div>}
      {state?.error && <div className="adminAlert error" role="alert">✕ {state.error}</div>}

      <form action={formAction} className="adminForm">
        <div className="adminFormSection">
          <p className="adminFormSectionTitle">Hero / Homepage</p>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-hero-name">Your Name</label>
            <input id="set-hero-name" name="hero_name" type="text" className="adminInput" defaultValue={settings.hero_name} placeholder="Etornam Kordzo Ahiataku" />
          </div>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-hero-lead">Lead / Tagline</label>
            <textarea id="set-hero-lead" name="hero_lead" className="adminTextarea" defaultValue={settings.hero_lead} rows={2} placeholder="Software Engineer • …" />
          </div>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-hero-bio">Bio (optional)</label>
            <textarea id="set-hero-bio" name="hero_bio" className="adminTextarea" defaultValue={settings.hero_bio} rows={3} placeholder="A short paragraph about yourself…" />
          </div>

          <div className="adminCheckRow">
            <input
              id="set-availability"
              name="hero_availability"
              type="checkbox"
              className="adminCheckbox"
              value="true"
              defaultChecked={settings.hero_availability === "true"}
            />
            <label className="adminLabel" htmlFor="set-availability" style={{ margin: 0 }}>
              Available for freelance / work
            </label>
          </div>
        </div>

        <div className="adminFormSection">
          <p className="adminFormSectionTitle">Contact & Social Links</p>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-email">Contact Email</label>
            <input id="set-email" name="contact_email" type="email" className="adminInput" defaultValue={settings.contact_email} placeholder="you@example.com" />
          </div>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-linkedin">LinkedIn URL</label>
            <input id="set-linkedin" name="social_linkedin" type="url" className="adminInput" defaultValue={settings.social_linkedin} placeholder="https://linkedin.com/in/…" />
          </div>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-github">GitHub URL</label>
            <input id="set-github" name="social_github" type="url" className="adminInput" defaultValue={settings.social_github} placeholder="https://github.com/…" />
          </div>

          <div className="adminField">
            <label className="adminLabel" htmlFor="set-twitter">Twitter / X URL</label>
            <input id="set-twitter" name="social_twitter" type="url" className="adminInput" defaultValue={settings.social_twitter} placeholder="https://x.com/…" />
          </div>
        </div>

        <div className="adminFormSection">
          <p className="adminFormSectionTitle">Footer</p>
          <div className="adminField">
            <label className="adminLabel" htmlFor="set-footer">Footer Text (optional override)</label>
            <input id="set-footer" name="footer_text" type="text" className="adminInput" defaultValue={settings.footer_text} placeholder="Leave blank to use default copyright text" />
          </div>
        </div>

        <div className="adminActionRow">
          <button type="submit" className="adminBtn primary" disabled={isPending}>
            {isPending ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </>
  );
}
