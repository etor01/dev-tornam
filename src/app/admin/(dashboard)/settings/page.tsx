import { getSiteSettings } from "@/lib/db/settings";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Site Settings</h1>
          <p className="adminPageSubtitle">
            Edit editable homepage content and site-wide configuration.
          </p>
        </div>
      </header>

      <SettingsForm settings={settings} />
    </>
  );
}
