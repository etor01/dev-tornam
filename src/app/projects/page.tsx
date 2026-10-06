"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const projects = [
  {
    id: 1,
    name: "Mediscan",
    description:
      "An AI-powered medical imaging analysis tool designed to assist healthcare professionals in early diagnosis of breast related diseases. Integrates local AI model engines.",
    type: "software",
    techStack: ["REST API", "Ollama", "Llama 3.2", "HTML", "JavaScript"],
    github: "https://github.com/etor01/MediScan-Ai",
    live: "https://etor01.github.io/MediScan-Ai/",
  },
  {
    id: 2,
    name: "AgriBoost",
    description:
      "Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration. Streamlines crop listing and bulk ordering.",
    type: "software",
    techStack: ["NextJS", "Supabase", "PayStack", "Tailwind", "HuggingFace"],
    github: "https://github.com/etor01/agriboost2",
    live: "https://agriboost2.vercel.app/",
  },
  {
    id: 3,
    name: "Cleanse Guru",
    description:
      "A service-booking platform connecting independent cleaners to customers, facilitating automated scheduling, notifications, and secure payment processing.",
    type: "software",
    techStack: ["PHP", "Bootstrap", "JavaScript"],
    github: "https://github.com/etor01",
    live: "#",
  },
  {
    id: 4,
    name: "EcoCycle",
    description:
      "Smart recycling educational platform developed for Human Computer Interaction to teach local communities sustainable waste management practices.",
    type: "software",
    techStack: ["JavaScript", "Bootstrap", "HTML5"],
    github: "https://github.com/etor01/HCI",
    live: "https://etor01.github.io/HCI/",
  },
  {
    id: 5,
    name: "Github Project Card",
    description:
      "A simple web component that pulls public repository information from GitHub and displays it as a styled card for portfolio inclusion.",
    type: "software",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/etor01",
    live: "https://etor01.github.io/Github-Projects-Card/",
  },
  {
    id: 6,
    name: "Pulse Check API",
    description:
      "A lightweight system monitoring API featuring a dead-man's switch mechanism to instantly notify maintainers of service downtime.",
    type: "software",
    techStack: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/etor01",
    live: "https://pulse-check-api.onrender.com/",
  },

];

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
          ></span>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1.5px solid var(--ink-border)",
              background: "transparent",
            }}
          ></span>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1.5px solid var(--ink-border)",
              background: "transparent",
            }}
          ></span>
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
            {/*i will implement a date feature to indicate when the project was created*/}
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
          ></div>
          <div
            style={{
              width: "55%",
              height: "3px",
              backgroundColor: "rgba(37, 99, 235, 0.2)",
              borderRadius: "2px",
            }}
          ></div>
          <div
            style={{
              width: "40%",
              height: "3px",
              backgroundColor: "rgba(17, 17, 17, 0.08)",
              borderRadius: "2px",
            }}
          ></div>
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
          {/* Grid lines in background */}
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

          {/* Circuit tracks */}
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

          {/* Solder Nodes */}
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

          {/* Chip Center */}
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

export default function ProjectsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "software",
    "hardware",
  ]);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => selectedTypes.includes(project.type));
  }, [selectedTypes]);

  const toggleType = (type: string) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.length > 1
          ? current.filter((item) => item !== type)
          : current
        : [...current, type],
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

          <div
            className="filterGroup"
            aria-label="Project filters"
            style={{ display: "flex", gap: "0.8rem" }}
          >
            <button
              onClick={() => toggleType("software")}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.38rem 0.95rem",
                border: "2px solid var(--ink-border)",
                borderRadius: "999px",
                backgroundColor: selectedTypes.includes("software")
                  ? "var(--accent-blue)"
                  : "var(--surface-card)",
                color: selectedTypes.includes("software")
                  ? "var(--surface-card)"
                  : "var(--text-primary)",
                boxShadow: "2px 2px 0px 0px var(--ink-border)",
                cursor: "pointer",
                transition: "all 120ms ease",
              }}
            >
              Software
            </button>
            <button
              onClick={() => toggleType("hardware")}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.38rem 0.95rem",
                border: "2px solid var(--ink-border)",
                borderRadius: "999px",
                backgroundColor: selectedTypes.includes("hardware")
                  ? "var(--accent-blue)"
                  : "var(--surface-card)",
                color: selectedTypes.includes("hardware")
                  ? "var(--surface-card)"
                  : "var(--text-primary)",
                boxShadow: "2px 2px 0px 0px var(--ink-border)",
                cursor: "pointer",
                transition: "all 120ms ease",
              }}
            >
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
                  <h2>{project.name}</h2>
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
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository →
                      </a>
                    )}
                    {project.live !== "#" && (
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
