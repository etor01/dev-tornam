import Link from "next/link";
import { getAllProjects } from "@/lib/db/projects";
import { getAllNotes } from "@/lib/db/notes";
import { getAllExperiments } from "@/lib/db/lab";
import { Code2, FileText, FlaskConical, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, notes, experiments] = await Promise.all([
    getAllProjects(),
    getAllNotes(),
    getAllExperiments(),
  ]);

  const stats = [
    {
      label: "Projects",
      total: projects.length,
      published: projects.filter((p) => p.published).length,
      href: "/admin/projects",
      icon: Code2,
    },
    {
      label: "Notes",
      total: notes.length,
      published: notes.filter((n) => n.published).length,
      href: "/admin/notes",
      icon: FileText,
    },
    {
      label: "Lab",
      total: experiments.length,
      published: experiments.filter((e) => e.published).length,
      href: "/admin/lab",
      icon: FlaskConical,
    },
  ];

  const recentProjects = projects.slice(0, 5);
  const recentNotes = notes.slice(0, 5);

  return (
    <>
      <header className="adminPageHeader">
        <div>
          <h1 className="adminPageTitle">Dashboard</h1>
          <p className="adminPageSubtitle">
            Welcome back. Here&apos;s an overview of your content.
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="adminStatGrid">
        {stats.map(({ label, total, published, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            style={{ textDecoration: "none" }}
          >
            <div className="adminStatCard">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="adminStatLabel">{label}</span>
                <Icon size={14} color="var(--muted)" />
              </div>
              <span className="adminStatValue">{total}</span>
              <span className="adminStatMeta">
                {published} published · {total - published} draft
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <Link href="/admin/projects/new" className="adminBtn primary">
          <Plus size={14} />
          New Project
        </Link>
        <Link href="/admin/notes/new" className="adminBtn primary">
          <Plus size={14} />
          New Note
        </Link>
        <Link href="/admin/lab/new" className="adminBtn primary">
          <Plus size={14} />
          New Experiment
        </Link>
      </div>

      {/* Recent content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {/* Recent Projects */}
        <div className="adminCard">
          <div className="adminCardHeader">
            <h2 className="adminCardTitle">Recent Projects</h2>
            <Link href="/admin/projects" className="adminBtn sm">
              View all
            </Link>
          </div>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="adminEmpty">
                    No projects yet.
                  </td>
                </tr>
              ) : (
                recentProjects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link
                        href={`/admin/projects/${p.id}`}
                        style={{ color: "var(--accent-blue)", textDecoration: "none" }}
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`adminBadge ${p.published ? "published" : "draft"}`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                      {p.category}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Notes */}
        <div className="adminCard">
          <div className="adminCardHeader">
            <h2 className="adminCardTitle">Recent Notes</h2>
            <Link href="/admin/notes" className="adminBtn sm">
              View all
            </Link>
          </div>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {recentNotes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="adminEmpty">
                    No notes yet.
                  </td>
                </tr>
              ) : (
                recentNotes.map((n) => (
                  <tr key={n.id}>
                    <td>
                      <Link
                        href={`/admin/notes/${n.id}`}
                        style={{ color: "var(--accent-blue)", textDecoration: "none" }}
                      >
                        {n.title}
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`adminBadge ${n.published ? "published" : "draft"}`}
                      >
                        {n.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        maxWidth: "140px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {n.tags?.join(", ") || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
