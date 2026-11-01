import Link from "next/link";
import { getAllNotes } from "@/lib/db/notes";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNotesPage() {
  const notes = await getAllNotes();

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Notes</h1>
          <p className="adminPageSubtitle">{notes.length} note{notes.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/admin/notes/new" className="adminBtn primary">
          <Plus size={14} /> New Note
        </Link>
      </header>

      <div className="adminCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="adminEmpty">
                    <div className="adminEmptyIcon">📝</div>
                    No notes yet. Create your first one.
                  </div>
                </td>
              </tr>
            ) : (
              notes.map((n) => (
                <tr key={n.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{n.title}</div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.68rem", color: "var(--muted)", marginTop: "0.15rem" }}>
                      /thoughts/{n.slug}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{n.category ?? "—"}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {n.tags?.join(", ") || "—"}
                  </td>
                  <td>
                    <span className={`adminBadge ${n.published ? "published" : "draft"}`}>
                      {n.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {n.published_at ? new Date(n.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td>
                    <div className="adminActionRow">
                      <Link href={`/admin/notes/${n.id}`} className="adminBtn sm">Edit</Link>
                      {n.published && (
                        <a href={`/thoughts/${n.slug}`} target="_blank" rel="noopener noreferrer" className="adminBtn sm">View ↗</a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
