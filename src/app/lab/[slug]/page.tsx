import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getExperimentBySlug } from "@/lib/db/lab";
import { renderMarkdown } from "@/lib/utils/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

const FALLBACK_LABS: Record<
  string,
  {
    title: string;
    slug?: string;
    description: string;
    tools: string[];
    status: string;
    content: string;
  }
> = {
  "distributed-heartbeat-monitor": {
    title: "Distributed Heartbeat Monitor",
    description:
      "A zero-dependency distributed node failure detector implemented over UDP with probabilistic ping-req gossip.",
    tools: ["Go", "UDP", "Gossip Protocol", "Docker"],
    status: "wip",
    content: `## Motivation
In distributed clusters, node failure detection via centralized polling introduces single points of failure and quadratic network overhead $O(N^2)$. This experiment implements a SWIM-inspired gossip failure detector in Go.

### Protocol Mechanics
- **Direct Ping**: A node randomly selects a peer and sends a \`PING\` over UDP every $T$ interval.
- **Indirect Ping-Req**: If no \`ACK\` is received within timeout, the node requests $k$ random peers to ping the target.
- **Suspicion Period**: Nodes enter a suspicious state before being marked dead, giving transient network partitions time to recover.

\`\`\`go
type Member struct {
    Addr   net.UDPAddr
    State  NodeState
    Incarnation uint32
}
\`\`\`

### Status & Findings
Under simulated packet drop conditions (up to 15%), the indirect ping mechanism successfully eliminated 94% of false-positive node evictions.`,
  },
  "custom-time-series-storage-engine": {
    title: "Custom Time-Series Storage Engine",
    slug: "custom-time-series-storage-engine",
    description:
      "An append-only log structured storage engine optimized for IoT sensor readings with delta-of-delta timestamp compression.",
    tools: ["Rust", "MMAP", "Bit Manipulation"],
    status: "active",
    content: `## Architecture
Standard relational databases incur heavy B-tree index maintenance costs on high-frequency time-series ingest. This experiment implements an append-only log with Gorilla-style floating point and delta-of-delta timestamp bitpacking.

### Compression Benchmarks
- Timestamps: 64-bit integer $\\to$ avg 1.37 bits per sample
- Floating point values: XOR delta compression achieves >70% size reduction on telemetry streams.`,
  },
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const exp = await getExperimentBySlug(slug);
  const fallback = FALLBACK_LABS[slug];

  const title = exp?.title || fallback?.title;
  if (!title) return { title: "Experiment Not Found" };

  return {
    title: `${title} — Lab — Etornam Kordzo Ahiataku`,
    description: exp?.description || fallback?.description,
  };
}

export default async function LabDetailPage({ params }: Props) {
  const { slug } = await params;

  const dbExp = await getExperimentBySlug(slug);
  const fallback = FALLBACK_LABS[slug];

  if (!dbExp && !fallback) {
    notFound();
  }

  const exp = dbExp || {
    id: slug,
    slug,
    title: fallback.title,
    description: fallback.description,
    tools: fallback.tools,
    status: fallback.status,
    content: fallback.content,
    images: [],
    created_at: new Date().toISOString(),
  };

  const renderedContent = renderMarkdown(
    exp.content ||
      `*Detailed technical notes and implementation benchmarks for **${exp.title}** will be published soon.*`
  );

  return (
    <main className="contentPage">
      <article className="pageShell" style={{ maxWidth: "860px" }}>
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
                href="/lab"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  color: "var(--accent-blue)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ← Lab
              </Link>
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
                Experiment
              </span>
            </div>

            <h1
              style={{
                margin: "0 0 0.75rem",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              {exp.title}
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {exp.description}
            </p>

            <div className="detailMeta">
              <span className={`statusPill ${exp.status}`}>
                Status: {exp.status}
              </span>
            </div>

            <div className="projectTags" style={{ marginTop: "0.8rem" }}>
              {exp.tools?.map((tool) => (
                <span key={tool} className="techBadge">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Experiment Images */}
        {exp.images && exp.images.length > 0 && (
          <div
            style={{
              margin: "1.5rem 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {exp.images.map((imgUrl, i) => (
              <div
                key={i}
                style={{
                  border: "2px solid var(--ink-border)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={imgUrl}
                  alt={`${exp.title} diagram ${i + 1}`}
                  width={600}
                  height={340}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  unoptimized
                />
              </div>
            ))}
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
          <Link href="/lab" className="backLink">
            ← Back to lab
          </Link>
        </div>
      </article>
    </main>
  );
}
