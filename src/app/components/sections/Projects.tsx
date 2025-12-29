"use client";

import Link from "next/link";
interface ProjectData {
    id: number;
    title: string;
    description: string;
    logoChar: string;
    techStack: string[];
    liveLink: string;
    githubLink: string;
    featured?: boolean;
}

const PROJECTS: ProjectData[] = [
    {
        id: 1,
        title: "Mediscan - AI Breast Cancer Predictor",
        description: "An AI-powered medical imaging analysis tool designed to assist professionals in early diagnosis of breast related diseases. Has a chat bot for clients to educate them on breast cancer prevention and care.",
        logoChar: "M",
        techStack: ["Next.js 14", "Ollama", "Bootstrap", "LM Studio", "Git", "Lama 3.2 Model"],
        liveLink: "/maintainance",
        githubLink: "/maintainance",
        featured: false,
    },
    {
        id: 2,
        title: "Cleanse Guru",
        description: "A semester course assignment built with php, bootstrap and vanilla js. Cleanse guru is a platform that connects skilled cleaners to service seekers, providing an easy way to book cleaning services online.",
        logoChar: "C",
        techStack: ["php", "Javascript", "Git", "Bootrap"],
        liveLink: "/maintainance",
        githubLink: "/maintainance",
    },
    {
        id: 3,
        title: "AgriBoost",
        description: "Agricultural management platform connecting local farmers with distributors and also provide a simplified way of managing farms through data-driven insights with AI and IoT integration.",
        logoChar: "A",
        techStack: ["TypeScript", "NestJS", "Supabase", "HuggingFace", "PayStack", "Vercel"],
        liveLink: "https://agriboost2-vs4s.vercel.app/",
        githubLink: "https://github.com/etor01/agriboost2",
    },
    {
        id: 4,
        title: "EcoCycle",
        description: "Smart recycling initiative platform to educate people on sustainable waste management practices.",
        logoChar: "C",
        techStack: ["JavaScript", "Bootstrap", "Git", "HTML"],
        liveLink: "https://etor01.github.io/HCI/",
        githubLink: "https://github.com/etor01/HCI",
    },
];

export default function Projects() {
    return (
        <section className="py-16 px-4 md:px-8 " id="projects">
            <div className="container mx-auto max-w-5xl">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
                        Showcase <span className="text-cyan-400">Projects</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        A selection of my recent work, focusing on scalable architecture and user-centric design.
                    </p>
                </div>

                {/* The Project List Structure */}
                <div className="flex flex-col space-y-6">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ title, description, logoChar, techStack, liveLink, githubLink }: ProjectData) {
    return (
        <article className="group relative bg-slate-800/60 rounded-2xl border border-slate-700 p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all flex flex-col md:flex-row gap-6 md:items-center backdrop-blur-sm">
            
            {/* 1. LOGO COLUMN (Left Side) */}
            <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 flex items-center justify-center text-2xl md:text-3xl font-bold group-hover:scale-105 transition-transform group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                    {logoChar}
                </div>
            </div>

            {/* 2. CONTENT COLUMN (Middle - Grows to fill space) */}
            <div className="flex-1 flex flex-col justify-center space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h3>
                </div>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed text-pretty">
                    {description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {techStack.map((tech, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-cyan-500/50 transition-colors">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* 3. ACTIONS COLUMN (Right Side on Desktop, Bottom on Mobile) */}
            <div className="shrink-0 flex flex-row md:flex-col gap-3 pt-4 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-slate-700 md:pl-6">
                
                <Link href={liveLink} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/50">
                    Live Demo 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                    </svg>
                </Link>

                <Link href={githubLink} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700 hover:text-slate-100 hover:border-cyan-500/50 transition-all">
                    View Code
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </Link>
            </div>
        </article>
    );
}
