import React from 'react';

// 1. BEST PRACTICE: Define interfaces for type safety
interface ExperienceData {
    id: number;
    year: string;
    company: string;
    role: string;
    description: string;
}

interface StatsData {
    label: string;
    value: string;
}

// 2. BEST PRACTICE: Move static data outside the component to prevent re-creation on render
const EXPERIENCES: ExperienceData[] = [
    { id: 1, year: "Dec 2025 - Present", company: "Tornam.dev", role: "Full Stack Developer (Freelance)", description: "Building custom scalable web applications with React and Node.js for clients" },
    { id: 2, year: "Oct 2025 - Dec 2025", company: "The Pius Kode - Kumasi", role: "Junior Frontend Developer - Intern", description: "Developed responsive UIs and fixed critical bugs in production" },
    { id: 3, year: "Sept 2023 - Nov 2022", company: "Ketu North Municipal Hospital", role: "IT Admin Assistant - Intern ", description: "Provided technically assistance; entry of client details into HIMS, processing tickets and facilitating data manipulation in hospital database" },
];

const STATS: StatsData[] = [
    { label: "Major Deployments", value: "4" },
    { label: "Success Rate", value: "98.5%" },
    { label: "Lines of Code", value: "250K+" },
    { label: "Code Quality", value: "95%" },
];

export default function Experience() {
    return (
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto space-y-16" id="experience">
            {/* WORK EXPERIENCE SECTION */}
            <div>
                <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-slate-300 to-blue-300 bg-clip-text text-transparent mb-10 md:mb-20 text-center">Work Experience</h2>
                
                {/* RESPONSIVE FIX: 
                   Changed from horizontal scroll to a vertical timeline.
                   This involves a relative container to draw the vertical line.
                */}
                <div className="relative border-l-4 border-blue-500 ml-4 md:ml-6 space-y-8">
                    {EXPERIENCES.map((exp) => (
                        <TimelineItem key={exp.id} {...exp} />
                    ))}
                </div>
            </div>

            {/* STATS SECTION */}
            <div>
                <h2 className="text-3xl font-semibold text-slate-200 mb-10 text-center uppercase">My Stats</h2>
                
                
                <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-lg shadow-xl overflow-hidden border border-slate-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700">
                        {STATS.map((stat) => (
                            <StatsCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ year, company, role, description }: Omit<ExperienceData, 'id'>) {
    return (
        <article className="relative pl-8 md:pl-12 py-1">
            {/* The Timeline Dot */}
            <div className="absolute -left-2.5 top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-900 shadow-sm ring-1 ring-blue-400"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="font-bold text-lg text-blue-400">{company}</h3>
                <span className="text-slate-300 font-semibold text-sm bg-slate-800 px-2 py-1 rounded-full border border-slate-700">{year}</span>
            </div>
            
            <p className="text-md text-slate-200 font-semibold mb-1">{role}</p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{description}</p>
        </article>
    );
}

function StatsCard({ label, value }: StatsData) {
    return (
        <div className="flex flex-col items-center justify-center bg-slate-800 p-6 hover:bg-slate-700 transition-colors duration-200 border border-slate-700">
            <p className="text-3xl font-bold text-blue-400">{value}</p>
            <p className="text-sm text-slate-400 font-medium mt-1">{label}</p>
        </div>
    );
}