import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/db/projects";
import { renderMarkdown } from "@/lib/utils/markdown";
import ProjectDiagram from "@/app/components/diagrams/ProjectDiagram";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

// Fallback project details if DB is empty
const FALLBACK_PROJECT_DETAILS: Record<
  string,
  {
    title: string;
    description: string;
    category: string;
    tech_stack: string[];
    github_url: string | null;
    live_url: string | null;
    year: number;
    status: string;
    content: string;
  }
> = {
  mediscan: {
    title: "Mediscan",
    description:
      "An AI-powered medical imaging analysis tool designed to assist healthcare professionals in early diagnosis of breast related diseases. Integrates local AI model engines.",
    category: "software",
    tech_stack: ["REST API", "Ollama", "Llama 3.2", "HTML", "JavaScript"],
    github_url: "https://github.com/etor01/MediScan-Ai",
    live_url: "https://etor01.github.io/MediScan-Ai/",
    year: 2024,
    status: "active",
    content: `## Overview
Mediscan was created to explore how edge-hosted, privacy-first AI models can aid clinicians in preliminary medical image review without transmitting sensitive patient data over external networks.

### Architecture & Key Features
- **Local Model Execution**: Employs Ollama running quantized Llama 3.2 vision models on premises.
- **REST API Pipeline**: Lightweight Python/Node backend that processes DICOM and standard image formats.
- **Zero-Cloud Data Leaks**: All inference occurs locally on clinical hardware.

### Challenges Solved
1. **Low-latency processing** on commodity GPU hardware.
2. **Standardized structured output** formatted for EHR integration.
3. **Clinical explainability**, highlighting image attention regions.`,
  },
  agriboost: {
    title: "AgriBoost",
    description:
      "Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration. Streamlines crop listing and bulk ordering.",
    category: "software",
    tech_stack: ["NextJS", "Supabase", "PayStack", "Tailwind", "HuggingFace"],
    github_url: "https://github.com/etor01/agriboost2",
    live_url: "https://agriboost2.vercel.app/",
    year: 2023,
    status: "active",
    content: `## Problem Space
Smallholder farmers frequently face unfair intermediary pricing and lack direct access to bulk buyers and predictive crop yield forecasting.

### Solution
AgriBoost provides direct digital listings, automated escrow payments via PayStack, and weather-adjusted soil moisture analysis using HuggingFace ML models.`,
  },
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const fallback = FALLBACK_PROJECT_DETAILS[slug];

  const title = project?.title || fallback?.title;
  if (!title) return { title: "Project Not Found" };

  return {
    title: `${title} — Etornam Kordzo Ahiataku`,
    description: project?.description || fallback?.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const dbProject = await getProjectBySlug(slug);
  const fallback = FALLBACK_PROJECT_DETAILS[slug];

  if (!dbProject && !fallback) {
    notFound();
  }

  const project = dbProject || {
    id: slug,
    slug,
    title: fallback.title,
    description: fallback.description,
    category: fallback.category,
    tech_stack: fallback.tech_stack,
    github_url: fallback.github_url,
    live_url: fallback.live_url,
    year: fallback.year,
    status: fallback.status,
    content: fallback.content,
    cover_image: null,
    gallery: [],
  };

  const renderedContent = renderMarkdown(
    project.content ||
      `*Detailed case study content for **${project.title}** will be published soon.*`
  );

  return (
    <main className="contentPage">
      <article className="pageShell" style={{ maxWidth: "860px" }}>
        <header className="pageHeader" style={{ borderBottom: "2px solid var(--ink-border)", paddingBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Link
                href="/projects"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  color: "var(--accent-blue)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ← Projects
              </Link>
              <span style={{ color: "var(--muted)", fontSize: "0.72rem" }}>/</span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {project.category}
              </span>
            </div>

            <h1 style={{ margin: "0 0 0.75rem", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              {project.title}
            </h1>

            <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {project.description}
            </p>

            <div className="detailMeta">
              {project.year && (
                <span className="detailMetaItem">
                  Year: <strong>{project.year}</strong>
                </span>
              )}
              {project.status && (
                <span className={`statusPill ${project.status}`}>
                  {project.status}
                </span>
              )}
            </div>

            <div className="projectTags" style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
              {project.tech_stack?.map((tech) => (
                <span key={tech} className="techBadge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="projectActions" style={{ marginTop: "1rem" }}>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialLink"
                  style={{
                    width: "auto",
                    height: "auto",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.78rem",
                    gap: "0.4rem",
                  }}
                >
                  GitHub Repository ↗
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "4px",
                    backgroundColor: "var(--accent-blue)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  Visit Live Site ↗
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Cover Image if present */}
        {project.cover_image && (
          <div style={{ margin: "1.5rem 0", borderRadius: "4px", overflow: "hidden", border: "2px solid var(--ink-border)" }}>
            <Image
              src={project.cover_image}
              alt={project.title}
              width={800}
              height={450}
              style={{ width: "100%", height: "auto", display: "block" }}
              unoptimized
            />
          </div>
        )}

        {/* Interactive Architecture Schematic */}
        <div
          style={{
            margin: "1.75rem 0",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1.5px solid var(--ink-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <ProjectDiagram slug={slug} />
        </div>

        {/* Markdown Content */}
        <section
          className="contentBody detailArticle"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {/* Gallery images if present */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "2px dashed var(--ink-border)" }}>
            <h3 style={{ fontFamily: "var(--font-lora), serif", marginBottom: "1rem" }}>
              Gallery
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {project.gallery.map((imgUrl, i) => (
                <div key={i} style={{ border: "2px solid var(--ink-border)", borderRadius: "4px", overflow: "hidden" }}>
                  <Image
                    src={imgUrl}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={400}
                    height={260}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "2px solid var(--ink-border)" }}>
          <Link href="/projects" className="backLink">
            ← Back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
