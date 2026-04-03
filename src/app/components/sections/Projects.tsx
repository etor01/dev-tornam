"use client";

import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveLink: string;
  githubLink: string;
  bgColor: string;
  accentColor: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "Mediscan",
    description:
      "An AI-powered medical imaging analysis tool designed to assist professionals in early diagnosis of breast related diseases. Built with Next.js and Llama 3.2.",
    techStack: ["Next.js", "Ollama", "Llama 3.2"],
    liveLink: "/maintainance",
    githubLink: "/maintainance",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
  },
  {
    id: 2,
    title: "AgriBoost",
    description:
      "Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration.",
    techStack: ["NestJS", "Supabase", "PayStack"],
    liveLink: "https://agriboost2-vs4s.vercel.app/",
    githubLink: "https://github.com/etor01/agriboost2",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-600",
  },
  {
    id: 3,
    title: "Cleanse Guru",
    description:
      "A platform connecting skilled cleaners to service seekers, providing an easy way to book cleaning services online.",
    techStack: ["PHP", "Bootstrap", "JS"],
    liveLink: "/maintainance",
    githubLink: "/maintainance",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-600",
  },
  {
    id: 4,
    title: "EcoCycle",
    description:
      "Smart recycling initiative platform to educate people on sustainable waste management practices.",
    techStack: ["JavaScript", "Bootstrap", "HTML"],
    liveLink: "https://etor01.github.io/HCI/",
    githubLink: "https://github.com/etor01/HCI",
    bgColor: "bg-rose-50",
    accentColor: "text-rose-600",
  },
];

export default function Projects() {
  return (
    <section className="py-20 px-6 container mx-auto max-w-5xl" id="projects">
      <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight">
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  techStack,
  liveLink,
  githubLink,
  bgColor,
  accentColor,
}: ProjectData) {
  return (
    <article
      className={`${bgColor} rounded-2xl p-8 flex flex-col justify-between group transition-all hover:shadow-xl hover:shadow-slate-200/50`}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-2xl font-bold ${accentColor}`}>{title}</h3>
          <div className="flex gap-4">
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <AiFillGithub size={20} />
            </Link>
            <Link
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <FiExternalLink size={20} />
            </Link>
          </div>
        </div>

        <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full bg-white/50 text-slate-600 text-xs font-medium border border-white/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
