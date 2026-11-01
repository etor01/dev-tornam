import Link from "next/link";
import { getPublishedExperiments } from "@/lib/db/lab";

export const revalidate = 60;

export const metadata = {
  title: "Lab & Experiments — Etornam Kordzo Ahiataku",
  description:
    "Experimental prototypes, technical explorations, and work-in-progress software systems.",
};

const SAMPLE_EXPERIMENTS = [
  {
    id: "exp-1",
    title: "Distributed Heartbeat Monitor",
    slug: "distributed-heartbeat-monitor",
    description:
      "A zero-dependency distributed node failure detector implemented over UDP with probabilistic ping-req gossip.",
    tools: ["Go", "UDP", "Gossip Protocol", "Docker"],
    status: "wip",
    published: true,
  },
  {
    id: "exp-2",
    title: "Custom Time-Series Storage Engine",
    slug: "custom-time-series-storage-engine",
    description:
      "An append-only log structured storage engine optimized for IoT sensor readings with delta-of-delta timestamp compression.",
    tools: ["Rust", "MMAP", "Bit Manipulation"],
    status: "active",
    published: true,
  },
];

export default async function LabPage() {
  const dbExperiments = await getPublishedExperiments();
  const experiments =
    dbExperiments.length > 0 ? dbExperiments : SAMPLE_EXPERIMENTS;

  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Lab</p>
            <h1>Experiments & Prototypes</h1>
            <p>
              Exploratory code spikes, architectural proofs of concept, and
              experimental backend tools.
            </p>
          </div>
        </header>

        <div className="projectGrid">
          {experiments.map((exp) => (
            <article key={exp.slug} className="projectCard">
              <div
                style={{
                  padding: "0.6rem 0.9rem",
                  background: "var(--badge-bg)",
                  borderBottom: "1.5px solid var(--ink-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                <span
                  style={{
                    fontSize: "0.62rem",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}
                >
                  exp/{exp.slug}
                </span>
                <span className={`statusPill ${exp.status}`}>{exp.status}</span>
              </div>

              <div className="projectBody">
                <div>
                  <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                    <Link
                      href={`/lab/${exp.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {exp.title}
                    </Link>
                  </h2>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                    {exp.description}
                  </p>
                </div>

                <div>
                  <div className="projectTags" style={{ marginBottom: "0.8rem" }}>
                    {exp.tools?.map((tool) => (
                      <span key={tool} className="techBadge">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="projectActions">
                    <Link href={`/lab/${exp.slug}`}>Read Experiment →</Link>
                  </div>
                </div>
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
