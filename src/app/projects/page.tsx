import { getPublishedProjects } from "@/lib/db/projects";
import ProjectsClient, { type ProjectItem } from "./ProjectsClient";

export const revalidate = 60;

export const metadata = {
  title: "Projects — Etornam Kordzo Ahiataku",
  description:
    "A catalog of digital tools and physical prototypes that I have designed and engineered.",
};

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "Mediscan",
    slug: "mediscan",
    description:
      "An AI-powered medical imaging analysis tool designed to assist healthcare professionals in early diagnosis of breast related diseases. Integrates local AI model engines.",
    type: "software",
    techStack: ["REST API", "Ollama", "Llama 3.2", "HTML", "JavaScript"],
    github: "https://github.com/etor01/MediScan-Ai",
    live: "https://etor01.github.io/MediScan-Ai/",
    year: 2024,
  },
  {
    id: 2,
    name: "AgriBoost",
    slug: "agriboost",
    description:
      "Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration. Streamlines crop listing and bulk ordering.",
    type: "software",
    techStack: ["NextJS", "Supabase", "PayStack", "Tailwind", "HuggingFace"],
    github: "https://github.com/etor01/agriboost2",
    live: "https://agriboost2.vercel.app/",
    year: 2023,
  },
  {
    id: 3,
    name: "Cleanse Guru",
    slug: "cleanse-guru",
    description:
      "A service-booking platform connecting independent cleaners to customers, facilitating automated scheduling, notifications, and secure payment processing.",
    type: "software",
    techStack: ["PHP", "Bootstrap", "JavaScript"],
    github: "https://github.com/etor01",
    live: "#",
    year: 2023,
  },
  {
    id: 4,
    name: "EcoCycle",
    slug: "ecocycle",
    description:
      "Smart recycling educational platform developed for Human Computer Interaction to teach local communities sustainable waste management practices.",
    type: "software",
    techStack: ["JavaScript", "Bootstrap", "HTML5"],
    github: "https://github.com/etor01/HCI",
    live: "https://etor01.github.io/HCI/",
    year: 2022,
  },
  {
    id: 5,
    name: "Github Project Card",
    slug: "github-project-card",
    description:
      "A simple web component that pulls public repository information from GitHub and displays it as a styled card for portfolio inclusion.",
    type: "software",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/etor01",
    live: "https://etor01.github.io/Github-Projects-Card/",
    year: 2022,
  },
  {
    id: 6,
    name: "Pulse Check API",
    slug: "pulse-check-api",
    description:
      "A lightweight system monitoring API featuring a dead-man's switch mechanism to instantly notify maintainers of service downtime.",
    type: "software",
    techStack: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/etor01",
    live: "https://pulse-check-api.onrender.com/",
    year: 2023,
  },
];

export default async function ProjectsPage() {
  const dbProjects = await getPublishedProjects();

  const projects: ProjectItem[] =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          id: p.id,
          name: p.title,
          slug: p.slug,
          description: p.description,
          type: p.category,
          techStack: p.tech_stack,
          github: p.github_url || "#",
          live: p.live_url || "#",
          year: p.year,
        }))
      : FALLBACK_PROJECTS;

  return <ProjectsClient initialProjects={projects} />;
}
