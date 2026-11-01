import Link from "next/link";
import { getPublishedNotes } from "@/lib/db/notes";
import { thoughts as fallbackThoughts } from "../data/thougths";

export const revalidate = 60;

export const metadata = {
  title: "Thoughts — Etornam Kordzo Ahiataku",
  description:
    "A simple place for short updates, design lessons, and personal thoughts.",
};

interface ThoughtDisplay {
  id: string;
  title: string;
  slug: string;
  message: string;
  date: string;
  category?: string | null;
  tags?: string[];
}

const FALLBACK_SLUGS: Record<string, string> = {
  "On building in public": "on-building-in-public",
  "I love design clarity": "i-love-design-clarity",
  "The value of small experiments": "value-of-small-experiments",
  "A note on patience": "a-note-on-patience",
  "Rethinking product constraints": "rethinking-product-constraints",
};

export default async function ThoughtsPage() {
  const dbNotes = await getPublishedNotes();

  const notes: ThoughtDisplay[] =
    dbNotes.length > 0
      ? dbNotes.map((n) => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          message: n.excerpt || n.content.slice(0, 180) + "…",
          date: n.published_at ? n.published_at.slice(0, 10) : n.created_at.slice(0, 10),
          category: n.category,
          tags: n.tags,
        }))
      : fallbackThoughts.map((t) => ({
          id: t.title,
          title: t.title,
          slug: FALLBACK_SLUGS[t.title] || t.title.toLowerCase().replace(/\s+/g, "-"),
          message: t.message,
          date: t.date,
        }));

  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Thoughts</p>
            <h1>Notes, reflections, and updates</h1>
            <p>
              A simple place for short updates, design lessons, and personal
              thoughts.
            </p>
          </div>
        </header>

        <div className="thoughtList">
          {notes.map((thought) => (
            <article key={thought.slug} className="thoughtCard">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                  gap: "1rem",
                }}
              >
                <h2>
                  <Link
                    href={`/thoughts/${thought.slug}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {thought.title}
                  </Link>
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    backgroundColor: "var(--badge-bg)",
                    border: "1px solid var(--ink-border)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "2px",
                    color: "var(--thought-date-color)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {thought.date}
                </span>
              </div>
              <p>{thought.message}</p>
              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {thought.category && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.68rem",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      #{thought.category}
                    </span>
                  )}
                  {thought.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.68rem",
                        color: "var(--muted)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/thoughts/${thought.slug}`}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.75rem",
                    color: "var(--accent-blue)",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Read note →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p style={{ marginTop: "2rem" }}>
          <Link href="/" className="backLink">
            Back home
          </Link>
        </p>
      </section>
    </main>
  );
}
