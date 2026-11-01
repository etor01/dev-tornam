import Link from "next/link";
import { getAllProjects } from "@/lib/db/projects";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Projects</h1>
          <p className="adminPageSubtitle">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/admin/projects/new" className="adminBtn primary">
          <Plus size={14} />
          New Project
        </Link>
      </header>

      <div className="adminCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="adminEmpty">
                    <div className="adminEmptyIcon">📁</div>
                    No projects yet. Create your first one.
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.68rem",
                        color: "var(--muted)",
                        marginTop: "0.15rem",
                      }}
                    >
                      /projects/{p.slug}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    {p.category}
                  </td>
                  <td>
                    <span className={`adminBadge ${p.published ? "published" : "draft"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    {p.featured && (
                      <span className="adminBadge featured">Featured</span>
                    )}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                    }}
                  >
                    {p.display_order}
                  </td>
                  <td>
                    <div className="adminActionRow">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="adminBtn sm"
                      >
                        Edit
                      </Link>
                      {p.published && (
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="adminBtn sm"
                        >
                          View ↗
                        </a>
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
