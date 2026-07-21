import Link from "next/link";

const thoughts = [
  {
    title: "On building in public",
    message:
      "The most useful thing I have learned is to share progress early, even when the work is messy.",
    date: "2026-07-12",
  },
  {
    title: "Why design clarity matters",
    message:
      "Simple interfaces reduce friction and make complex systems feel easier to understand.",
    date: "2026-06-28",
  },
  {
    title: "The value of small experiments",
    message:
      "I keep finding that tiny prototypes teach more than big plans made in isolation.",
    date: "2026-06-10",
  },
  {
    title: "A note on patience",
    message:
      "Great software rarely appears all at once. Most of it grows through repeated refinement.",
    date: "2026-05-22",
  },
  {
    title: "Rethinking product constraints",
    message:
      "Constraints often sharpen creativity. They force better choices and clearer priorities.",
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
            <h1>Notes, reflections, and occasional rants</h1>
            <p>A simple place for short updates and personal thoughts.</p>
          </div>
        </header>

        <div className="thoughtList">
          {thoughts.map((thought) => (
            <article key={thought.title} className="thoughtCard">
              <h2>{thought.title}</h2>
              <p>{thought.message}</p>
              <p className="meta">{thought.date}</p>
            </article>
          ))}
        </div>

        <p style={{ marginTop: "1rem" }}>
          <Link href="/" className="backLink">
            Back home
          </Link>
        </p>
      </section>
    </main>
  );
}
