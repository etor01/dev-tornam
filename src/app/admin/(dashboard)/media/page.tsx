import { requireAdmin } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import MediaManager from "./MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  await requireAdmin();

  const supabase = await createClient();
  const { data: files } = await supabase.storage.from("media").list("public", {
    sortBy: { column: "created_at", order: "desc" },
  });

  const initialFiles =
    files?.map((f) => {
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(`public/${f.name}`);
      return {
        name: f.name,
        url: urlData.publicUrl,
        created_at: f.created_at ?? "",
        size: (f.metadata as { size?: number } | null)?.size ?? 0,
      };
    }) ?? [];

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Media</h1>
          <p className="adminPageSubtitle">
            Upload and manage images for use in your content.
          </p>
        </div>
      </header>

      <MediaManager initialFiles={initialFiles} />
    </>
  );
}
