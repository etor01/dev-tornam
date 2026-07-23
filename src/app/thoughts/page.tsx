import Link from "next/link";

const thoughts = [
  {
    title: "On building in public",
    message:
      "The most useful thing I have learned is to share progress early, even when the work is messy. It gathers input when changes are still cheap.",
    date: "2026-07-12",
  },
  {
    title: "Why design clarity matters",
    message:
      "Simple interfaces reduce cognitive friction. They make complex systems feel intuitive and welcoming.",
    date: "2026-06-28",
  },
  {
    title: "The value of small experiments",
    message:
      "I keep finding that tiny prototypes teach more than big plans made in isolation. Real feedback beat assumptions every single time.",
    date: "2026-06-10",
  },
  {
    title: "A note on patience",
    message:
      "Great software rarely appears all at once. Most of it grows incrementally through repeated, deliberate refinement.",
    date: "2026-05-22",
  },
  {
    title: "Rethinking product constraints",
    message:
      "Constraints often sharpen creativity rather than stifle it. They force you to make better choices and stick to clearer priorities.",
    date: "2026-04-15",
  },
];

export default function ThoughtsPage() {
  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Thoughts</p>
            <h1>Notes, reflections, and updates</h1>
            <p>A simple place for short updates, design lessons, and personal thoughts.</p>
          </div>
        </header>

        <div className="thoughtList">
          {thoughts.map((thought) => (
            <article key={thought.title} className="thoughtCard">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h2>{thought.title}</h2>
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  backgroundColor: "var(--badge-bg)",
                  border: "1px solid var(--ink-border)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "2px",
                  color: "var(--muted)",
                  whiteSpace: "nowrap"
                }}>
                  {thought.date}
                </span>
              </div>
              <p>{thought.message}</p>
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
