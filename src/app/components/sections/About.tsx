import Link from "next/link";

export default function About() {
    const currentYear = new Date().getFullYear();

    return (
        <section className="py-16 px-6 bg-linear-to-b from-blue-950/20 to-transparent" id="about">
           
            <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* LEFT COLUMN: Title  */}
                <div className="md:col-span-4 md:sticky md:top-8 text-center md:text-right">
                    <h2 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-400 tracking-tighter uppercase mb-2 transition-all">
                        About
                    </h2>
                    <span className="block text-2xl md:text-3xl font-bold text-yellow-400 -mt-4 md:-mt-6 mr-0 md:mr-2">
                        Me
                    </span>
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="md:col-span-8 space-y-6 text-center md:text-left">
                    
                    {/* Header Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-white">Etornam Kordzo Ahiataku</h3>
                        <p className="text-cyan-400 font-semibold mt-1">
                            Coding Since &nbsp; 2022 <span className="text-gray-500 font-normal mx-2">- • -</span> {currentYear}
                        </p>
                        <p className="text-sm text-gray-400 font-medium mt-1">
                            Christian • Family Guy • Lifelong Learner
                        </p>
                    </div>

                    {/* Main Bio */}
                    <p className="text-gray-300 leading-relaxed text-lg text-pretty">
                        With a foundation in General Science from <span className="font-semibold text-gray-400 hover:text-blue-300 cursor-default transition-colors">Keta SHTS</span>, 
                        I am currently pursuing my degree at{' '}
                        
                        <Link 
                            href="https://www.knust.edu.gh" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-semibold hover:text-emerald-300 underline decoration-2 underline-offset-2 transition-colors"
                        >
                            KNUST
                        </Link>.
                        My journey has been defined by resilience; I believe my background has instilled in me 
                        the dedication required to solve complex problems. I value efficiency and clear communication, 
                        and I am committed to leveraging these strengths to become a world-class software engineer.
                    </p>

                    {/* Skills / Attributes as Badges */}
                    <div className="pt-4 border-t border-gray-700">
                        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Core Attributes</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <AttributeBadge label="Critical Thinker" />
                            <AttributeBadge label="Team Player" />
                            <AttributeBadge label="Adaptability" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AttributeBadge({ label }: { label: string }) {
    return (
        <span className="px-3 py-1.5 bg-linear-to-r from-blue-900/40 to-cyan-900/40 text-gray-200 rounded-full text-sm font-medium border border-cyan-500/30 shadow-lg hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all duration-200">
            {label}
        </span>
    );
}
