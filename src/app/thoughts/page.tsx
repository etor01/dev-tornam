import Link from "next/link";
import { Thoughts } from "../data/thougths";
import { thoughts } from "../data/thougths";

export default function ThoughtsPage() {
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
          {thoughts.map((thought: Thoughts) => (
            <article key={thought.title} className="thoughtCard">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <h2>{thought.title}</h2>
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
