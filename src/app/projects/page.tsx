"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const projects = [
  {
    id: 1,
    name: "Github- Project Card",
    description:
      "A simple webpage that loads your github projects for you so you can integrate them into your porfolio website or anywhere you want. Built with vanilla JS, HTML and CSS.",
    type: "software",
    link: "#",
    img: "/github-project-card.png",
  },
  {
    id: 2,
    name: "Human Computer Interaction - Assignment",
    description:
      "A simple one paged website assingment done in KNUST. (ecocycle - recycling educatiion website). Built with Next.js, React, Tailwind CSS and TypeScript. ",
    type: "hardware",
    link: "#",
    img: "/human-computer-interaction-assignment.png",
  },
  {
    id: 3,
    name: "Pulse Check API",
    description:
      "A lightweight API for monitoring and reporting system health. Built with Node.js, Express, and MongoDB. THe core of it is a dead mans switch that quickly alerts engineers when a service is down",
    type: "software",
    link: "#",
    img: "/pulse-check-api.png",
  },
  {
    id: 4,
    name: "VOP Church Website",
    description:
      "A complete church management system for my local church. Built with Next.js, React, Tailwind CSS and TypeScript. Is has a complete admin dashboard for managing church members, events, and donations.",
    type: "software",
    link: "#",
    img: "/vop-church-website.png",
  },
  {
    id: 5,
    name: "Bored Canvas",
    description:
      "A one page website for showcasing creative work. Built with Next.js, React, Tailwind CSS and TypeScript. It has a simple and clean design that focuses on the work being showcased.",
    type: "software",
    link: "#",
    img: "/bored-canvas.png",
  },
  {
    id: 6,
    name: "Agriboost",
    description:
      "An agricultural technology project focused on sustainable farming solutions for Ghanaian farmers. It has AI disease detection, weather forecasting, and a marketplace for farmers to sell their produce. Built with Next.js, React, Tailwind CSS and TypeScript.",
    type: "software",
    link: "#",
    img: "/agriboost.png",
  },
  {
    id: 7,
    name: "Quiet Queue",
    description: "A workflow engine that simplifies async collaboration.",
    type: "software",
    link: "#",
    img: "/quiet-queue.png",
  },
  {
    id: 8,
    name: "Cleanse Guru",
    description:
      "An e-commerce platform for luandry and dry cleaning services. You can book a laundry service and have your clothes picked up and delivered to you. Built with Next.js, React, Tailwind CSS and TypeScript.",
    type: "software",
    link: "#",
    img: "/cleanse-guru.png",
  },
  {
    id: 9,
    name: "Byte Studio",
    description: "An all-in-one workspace for building side projects.",
    type: "software",
    link: "#",
    img: "/byte-studio.png",
  },
  {
    id: 10,
    name: "Signal Loop",
    description: "A compact control board for interactive installations.",
    type: "hardware",
    link: "#",
    img: "/signal-loop.png",
  },
  {
    id: 11,
    name: "Nova Notes",
    description:
      "A note-taking system designed around fast capture and recall.",
    type: "software",
    link: "#",
    img: "/nova-notes.png",
  },
  {
    id: 12,
    name: "Pulse Case",
    description:
      "A rugged enclosure concept for small electronics experiments.",
    type: "hardware",
    link: "#",
    img: "/pulse-case.png",
  },
  {
    id: 13,
    name: "Stack Vault",
    description:
      "A personal project archive for keeping experiments organized.",
    type: "software",
    link: "#",
    img: "/stack-vault.png",
  },
  {
    id: 14,
    name: "Motion Rail",
    description:
      "A compact motion test rig built to validate prototypes quickly.",
    type: "hardware",
    link: "#",
    img: "/motion-rail.png",
  },
  {
    id: 15,
    name: "Relay Studio",
    description:
      "A creative environment for shaping product ideas into execution.",
    type: "software",
    link: "#",
    img: "/relay-studio.png",
  },
  {
    id: 16,
    name: "Temp Atlas",
    description: "A sensor board for environmental monitoring and logging.",
    type: "hardware",
    link: "#",
    img: "/temp-atlas.png",
  },
  {
    id: 17,
    name: "Parse Garden",
    description: "A data shaping toolkit for messy product inputs.",
    type: "software",
    link: "#",
    img: "/parse-garden.png",
  },
  {
    id: 18,
    name: "Anchor Module",
    description: "A modular hardware rig for rapid experimentation.",
    type: "hardware",
    link: "#",
    img: "/anchor-module.png",
  },
  {
    id: 19,
    name: "Flux Lab",
    description: "A prototype workspace for testing UI ideas in real time.",
    type: "software",
    link: "#",
    img: "/flux-lab.png",
  },
  {
    id: 20,
    name: "Drift Board",
    description: "A portable electronics board built for field testing.",
    type: "hardware",
    link: "#",
    img: "/drift-board.png",
  },
];

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
        ? current.filter((item) => item !== type)
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
            <p>Filter by project type to explore the collection.</p>
          </div>

          <div className="filterGroup" aria-label="Project filters">
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.includes("software")}
                onChange={() => toggleType("software")}
              />
              <span>Software</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.includes("hardware")}
                onChange={() => toggleType("hardware")}
              />
              <span>Hardware</span>
            </label>
          </div>
        </header>

        <div className="projectGrid">
          {visibleProjects.map((project) => (
            <article key={project.id} className="projectCard">
              <img
                src="/twitter-icon.png"
                alt={project.name}
                className="projectImage"
              />
              <div className="projectBody">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>
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
