import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNoteBySlug } from "@/lib/db/notes";
import { renderMarkdown } from "@/lib/utils/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

const FALLBACK_NOTES: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category?: string;
  }
> = {
  "on-building-in-public": {
    title: "On building in public",
    excerpt:
      "The most useful thing I have learned is to share progress early, even when the work is messy.",
    content: `The most useful thing I have learned is to share progress early, even when the work is messy. It gathers input when changes are still cheap.

When you wait until a project feels "complete" to share it with the world, two things happen:
1. You fall in love with decisions that might be flawed.
2. The cost to pivot or rethink your assumptions becomes exponentially higher.

Building in public isn't about performative updates or vanity metrics. It's about engineering in daylight. Real systems benefit from early feedback loops.`,
    date: "2026-07-12",
    category: "workflow",
  },
  "i-love-design-clarity": {
    title: "I love design clarity",
    excerpt: "Simple interfaces reduce cognitive friction.",
    content: `Simple interfaces reduce cognitive friction. They make complex systems feel intuitive and welcoming.

When designing tools for developers or end users, the goal should never be to demonstrate how clever the software is. The goal is to make the software invisible so the user's intent flows unobstructed.

Every border, shadow, and color choice should carry deliberate purpose.`,
    date: "2026-06-28",
    category: "design",
  },
  "value-of-small-experiments": {
    title: "The value of small experiments",
    excerpt: "Tiny prototypes teach more than big plans made in isolation.",
    content: `I keep finding that tiny prototypes teach more than big plans made in isolation. Real feedback beat assumptions every single time.

A working spike written in an afternoon reveals architectural constraints, API ergonomics, and UX bottlenecks that dozens of design documents could never anticipate. Prototype early, test assumptions, and discard fearlessly.`,
    date: "2026-06-10",
    category: "engineering",
  },
  "a-note-on-patience": {
    title: "A note on patience",
    excerpt: "Great software rarely appears all at once.",
    content: `Great software rarely appears all at once. Most of it grows incrementally through repeated, deliberate refinement.

The temptation to rewrite everything from scratch is pervasive. But mature systems are built by compound interest: small, consistent architectural improvements made day after day.`,
    date: "2026-05-22",
    category: "philosophy",
  },
  "rethinking-product-constraints": {
    title: "Rethinking product constraints",
    excerpt: "Constraints often sharpen creativity rather than stifle it.",
    content: `Constraints often sharpen creativity rather than stifle it. They force you to make better choices and stick to clearer priorities.

When resource limits, memory boundaries, or design tokens constrain your solution space, you stop over-engineering and focus on what genuinely delivers value.`,
    date: "2026-04-15",
    category: "product",
  },
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  const fallback = FALLBACK_NOTES[slug];

  const title = note?.title || fallback?.title;
  if (!title) return { title: "Note Not Found" };

  return {
    title: `${title} — Etornam Kordzo Ahiataku`,
    description: note?.excerpt || fallback?.excerpt,
  };
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;

  const dbNote = await getNoteBySlug(slug);
  const fallback = FALLBACK_NOTES[slug];

  if (!dbNote && !fallback) {
    notFound();
  }

  const note = dbNote || {
    id: slug,
    title: fallback.title,
    slug,
    excerpt: fallback.excerpt,
    content: fallback.content,
    cover_image: null,
    category: fallback.category || null,
    tags: [],
    published_at: fallback.date,
    created_at: fallback.date,
  };

  const displayDate = note.published_at
    ? note.published_at.slice(0, 10)
    : note.created_at.slice(0, 10);

  const renderedContent = renderMarkdown(note.content);

  return (
    <main className="contentPage">
      <article className="pageShell" style={{ maxWidth: "800px" }}>
        <header
          className="pageHeader"
          style={{
            borderBottom: "2px solid var(--ink-border)",
            paddingBottom: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                href="/thoughts"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  color: "var(--accent-blue)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ← Thoughts
              </Link>
              {note.category && (
                <>
                  <span style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                    /
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    {note.category}
                  </span>
                </>
              )}
            </div>

            <h1
              style={{
                margin: "0 0 0.75rem",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              {note.title}
            </h1>

            <div className="detailMeta">
              <span className="detailMetaItem">
                Published: <strong>{displayDate}</strong>
              </span>
              {note.tags && note.tags.length > 0 && (
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono), monospace",
                        color: "var(--muted)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {note.cover_image && (
          <div
            style={{
              margin: "1.5rem 0",
              borderRadius: "4px",
              overflow: "hidden",
              border: "2px solid var(--ink-border)",
            }}
          >
            <Image
              src={note.cover_image}
              alt={note.title}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto", display: "block" }}
              unoptimized
            />
          </div>
        )}

        <section
          className="contentBody detailArticle"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "2px solid var(--ink-border)",
          }}
        >
          <Link href="/thoughts" className="backLink">
            ← Back to thoughts
          </Link>
        </div>
      </article>
    </main>
  );
}
