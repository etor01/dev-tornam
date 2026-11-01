import Link from "next/link";
import { getAllExperiments } from "@/lib/db/lab";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLabPage() {
  const experiments = await getAllExperiments();

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Lab</h1>
          <p className="adminPageSubtitle">{experiments.length} experiment{experiments.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/admin/lab/new" className="adminBtn primary">
          <Plus size={14} /> New Experiment
        </Link>
      </header>

      <div className="adminCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tools</th>
              <th>Status</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiments.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="adminEmpty">
                    <div className="adminEmptyIcon">🧪</div>
                    No experiments yet. Create your first one.
                  </div>
                </td>
              </tr>
            ) : (
              experiments.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{e.title}</div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.68rem", color: "var(--muted)", marginTop: "0.15rem" }}>
                      /lab/{e.slug}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.tools?.join(", ") || "—"}
                  </td>
                  <td>
                    <span className="adminBadge draft">{e.status}</span>
                  </td>
                  <td>
                    <span className={`adminBadge ${e.published ? "published" : "draft"}`}>
                      {e.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="adminActionRow">
                      <Link href={`/admin/lab/${e.id}`} className="adminBtn sm">Edit</Link>
                      {e.published && (
                        <a href={`/lab/${e.slug}`} target="_blank" rel="noopener noreferrer" className="adminBtn sm">View ↗</a>
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
