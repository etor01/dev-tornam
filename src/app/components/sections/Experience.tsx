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
    { id: 2, year: "Oct 2025 - Dec 2025", company: "The Pius Kode - Kumasi", role: "Frontend Junior Developer", description: "Developed responsive UIs and fixed critical bugs in production" },
    { id: 3, year: "Sept 2023 - Nov 2022", company: "Ketu North Municipal Hospital", role: "Intern IT Admin Assistant ", description: "Provided technically assistance; entry of client details into HIMS, processing tickets and facilitating data manipulation in hospital database" },
];

const STATS: StatsData[] = [
    { label: "Deployments", value: "8" },
    { label: "Success Rate", value: "98.5%" },
    { label: "Lines of Code", value: "2.5K" },
    { label: "Code Quality", value: "95%" },
];

export default function Experience() {
    return (
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto space-y-16">
            {/* WORK EXPERIENCE SECTION */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Work Experience</h2>
                
                {/* RESPONSIVE FIX: 
                   Changed from horizontal scroll to a vertical timeline.
                   This involves a relative container to draw the vertical line.
                */}
                <div className="relative border-l-4 border-yellow-500 ml-4 md:ml-6 space-y-8">
                    {EXPERIENCES.map((exp) => (
                        <TimelineItem key={exp.id} {...exp} />
                    ))}
                </div>
            </div>

            {/* STATS SECTION */}
            <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">My Stats</h2>
                
                
                <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
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
            {/* The Timeline Dot - Positioned absolutely to sit on the line */}
            <div className="absolute -left-2.5 top-2 w-5 h-5 bg-gray-700 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-200"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-700">{company}</h3>
                <span className="text-blue-800 font-bold text-sm bg-blue-50 px-2 py-1 rounded-full">{year}</span>
            </div>
            
            <p className="text-md text-gray-400 font-semibold mb-1">{role}</p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{description}</p>
        </article>
    );
}

function StatsCard({ label, value }: StatsData) {
    return (
        <div className="flex flex-col items-center justify-center bg-white p-6 hover:bg-blue-50 transition-colors duration-200">
            <p className="text-3xl font-bold text-yellow-500">{value}</p>
            <p className="text-sm text-gray-600 font-medium mt-1">{label}</p>
        </div>
    );
}