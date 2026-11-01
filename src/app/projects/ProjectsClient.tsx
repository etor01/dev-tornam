"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface ProjectItem {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  type: string;
  techStack: string[];
  github: string;
  live: string;
  year?: number | null;
}

function ProjectVisual({ type, name }: { type: string; name: string }) {
  if (type === "software") {
    return (
      <div
        className="projectImage"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Editor Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 9px",
            borderBottom: "1.5px solid var(--ink-border)",
            background: "var(--badge-bg)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1.5px solid var(--ink-border)",
              background: "transparent",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1.5px solid var(--ink-border)",
              background: "transparent",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1.5px solid var(--ink-border)",
              background: "transparent",
            }}
          />
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.58rem",
              fontFamily: "var(--font-mono), monospace",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            src/{name.toLowerCase().replace(/\s+/g, "-")}.sh
          </span>
        </div>
        {/* Code Layout Lines */}
        <div
          style={{
            padding: "7px 9px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            color: "var(--text-secondary)",
            backgroundColor: "#ffffff",
          }}
        >
          <div>
            <span style={{ color: "var(--accent-blue)" }}>$</span> npm run build
          </div>
          <div
            style={{
              width: "80%",
              height: "3px",
              backgroundColor: "rgba(17, 17, 17, 0.08)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "55%",
              height: "3px",
              backgroundColor: "rgba(37, 99, 235, 0.2)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "40%",
              height: "3px",
              backgroundColor: "rgba(17, 17, 17, 0.08)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="projectImage"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Hardware Schematic Drawing */}
        <svg
          width="100%"
          height="100%"
          style={{ opacity: 0.85, minHeight: "72px" }}
          viewBox="0 0 300 120"
        >
          <defs>
            <pattern
              id="dotGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.5" fill="rgba(17, 17, 17, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />

          <line
            x1="20"
            y1="60"
            x2="100"
            y2="60"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="60"
            x2="130"
            y2="30"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="130"
            y1="30"
            x2="220"
            y2="30"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />

          <line
            x1="20"
            y1="20"
            x2="70"
            y2="20"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="70"
            y1="20"
            x2="110"
            y2="60"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />

          <line
            x1="50"
            y1="100"
            x2="160"
            y2="100"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="100"
            x2="190"
            y2="70"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="190"
            y1="70"
            x2="260"
            y2="70"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />

          <circle
            cx="100"
            cy="60"
            r="3.5"
            fill="#ffffff"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <circle
            cx="130"
            cy="30"
            r="3.5"
            fill="#ffffff"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <circle
            cx="70"
            cy="20"
            r="3.5"
            fill="#ffffff"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <circle
            cx="160"
            cy="100"
            r="3.5"
            fill="#ffffff"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />

          <rect
            x="220"
            y="18"
            width="24"
            height="24"
            rx="2"
            fill="var(--badge-bg)"
            stroke="var(--ink-border)"
            strokeWidth="1.5"
          />
          <line
            x1="220"
            y1="23"
            x2="212"
            y2="23"
            stroke="var(--ink-border)"
            strokeWidth="1"
          />
          <line
            x1="220"
            y1="31"
            x2="212"
            y2="31"
            stroke="var(--ink-border)"
            strokeWidth="1"
          />
          <line
            x1="232"
            y1="42"
            x2="232"
            y2="48"
            stroke="var(--ink-border)"
            strokeWidth="1"
          />
        </svg>
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            fontSize: "0.6rem",
            fontFamily: "var(--font-mono), monospace",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          pcb_rev_a
        </span>
      </div>
    );
  }
}

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: ProjectItem[];
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "software",
    "hardware",
  ]);

  const visibleProjects = useMemo(() => {
    return initialProjects.filter((project) =>
      selectedTypes.includes(project.type)
    );
  }, [initialProjects, selectedTypes]);

  const toggleType = (type: string) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.length > 1
          ? current.filter((item) => item !== type)
          : current
        : [...current, type]
    );
  };

  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Projects</p>
            <h1>Selected work and prototypes</h1>
            <p>
              A catalog of digital tools and physical prototypes that I have
              designed and engineered.
            </p>
          </div>

          <div className="filterTrack" role="group" aria-label="Project filters">
            <button
              onClick={() => toggleType("software")}
              className={`filterToggleBtn ${
                selectedTypes.includes("software") ? "is-active" : ""
              }`}
              aria-pressed={selectedTypes.includes("software")}
            >
              <span className="toggleDot" aria-hidden="true" />
              Software
            </button>
            <button
              onClick={() => toggleType("hardware")}
              className={`filterToggleBtn ${
                selectedTypes.includes("hardware") ? "is-active" : ""
              }`}
              aria-pressed={selectedTypes.includes("hardware")}
            >
              <span className="toggleDot" aria-hidden="true" />
              Hardware
            </button>
          </div>
        </header>

        <div className="projectGrid">
          {visibleProjects.map((project) => (
            <article key={project.id} className="projectCard">
              <ProjectVisual type={project.type} name={project.name} />
              <div className="projectBody">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-mono), monospace",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {project.type}
                    </span>
                    {project.year && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-mono), monospace",
                          color: "var(--muted)",
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>
                  <h2>
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {project.name}
                    </Link>
                  </h2>
                  <p>{project.description}</p>
                </div>
                <div>
                  <div className="projectTags">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="techBadge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="projectActions">
                    <Link href={`/projects/${project.slug}`}>
                      Case Study →
                    </Link>
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository →
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Site ↗
                      </a>
                    )}
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
