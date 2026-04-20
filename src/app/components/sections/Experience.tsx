import React from "react";

interface ExperienceData {
  id: number;
  year: string;
  company: string;
  role: string;
  description: string;
}

const EXPERIENCES: ExperienceData[] = [
  {
    id: 1,
    year: "2025 - Present",
    company: "Tornam.dev",
    role: "Full Stack Developer (Freelance)",
    description:
      "Building custom scalable web applications with React and Node.js for clients.",
  },
  {
    id: 2,
    year: "2025",
    company: "The Pius Kode",
    role: "Junior Frontend Developer",
    description:
      "Developed responsive UIs and fixed critical bugs in production environment.",
  },
  {
    id: 3,
    year: "2022 - 2023",
    company: "Ketu North Municipal Hospital",
    role: "IT Admin Assistant",
    description:
      "Managed client data entry and hospital information systems maintenance.",
  },
];

export default function Experience() {
  return (
    <section className="py-20 px-6 container mx-auto max-w-5xl" id="experience">
      <h2 className="text-3xl font-bold text-(--text-primary) mb-12 tracking-tight">
        Experience
      </h2>

      <div className="space-y-12">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-8"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-(--text-primary)">
                {exp.company}
              </h3>
              <p className="text-(--primary) font-medium">{exp.role}</p>
              <p className="text-(--text-secondary) max-w-2xl text-sm leading-relaxed mt-2">
                {exp.description}
              </p>
            </div>
            <span className="text-(--muted) text-sm font-medium whitespace-nowrap order-first md:order-last">
              {exp.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
