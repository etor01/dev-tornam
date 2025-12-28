import Link from "next/link";

export default function About() {
    const currentYear = new Date().getFullYear();

    return (
        <section className="py-16 px-6 " id="about">
           
            <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* LEFT COLUMN: Title  */}
                <div className="md:col-span-4 md:sticky md:top-8 text-center md:text-right">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-blue-200 hover:text-yellow-500 tracking-tighter uppercase mb-2">
                        About
                    </h2>
                    <span className="block text-2xl md:text-3xl font-bold text-yellow-500 -mt-4 md:-mt-6 mr-0 md:mr-2">
                        Me
                    </span>
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="md:col-span-8 space-y-6 text-center md:text-left">
                    
                    {/* Header Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">Etornam Kordzo Ahiataku</h3>
                        <p className=" text-blue-500 font-semibold mt-1">
                            Coding Since &nbsp; 2022 <span className="text-gray-400 font-normal mx-2">- • -</span> {currentYear}
                        </p>
                        <p className="text-sm text-gray-500 font-bold mt-1">
                            Christian • Family Guy • Lifelong Learner
                        </p>
                    </div>

                    {/* Main Bio - using text-pretty for better word wrapping */}
                    <p className="text-gray-600 leading-relaxed text-lg text-pretty">
                        With a foundation in General Science from <span className="font-semibold text-gray-800/50 hover:text-gray-800 cursor-not-allowed">Keta SHTS</span>, 
                        I am currently pursuing my degree at{' '}
                        
                        <Link 
                            href="https://www.knust.edu.gh" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600/50 font-semibold hover:text-green-700 hover:underline decoration-2 underline-offset-2 transition-all"
                        >
                            KNUST
                        </Link>.
                        My journey has been defined by resilience; I believe my background has instilled in me 
                        the dedication required to solve complex problems. I value efficiency and clear communication, 
                        and I am committed to leveraging these strengths to become a world-class software engineer.
                    </p>

                    {/* Skills / Attributes as Badges */}
                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">Core Attributes</p>
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

// Micro-component for attribute badges
function AttributeBadge({ label }: { label: string }) {
    return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-not-allowed">
            {label}
        </span>
    );
}