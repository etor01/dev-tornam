'use client';
import Image from "next/image";

export default function Hero() {
    const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg>;
    
    const ProjectIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">
                        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184A3.12 3.12 0 0 0 8.598 3h5.902a1.5 1.5 0 0 1 1.5 1.5v.64l-7.682-1.28a2.12 2.12 0 0 0-1.02.026L1 5.083V3.5z"/>
                        <path d="M0 6.293V12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-7.707l-7.918 1.32a3.12 3.12 0 0 1-1.02-.026L0 6.293z"/>
                    </svg>;
    return (
        <section className="container p-8 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center md:h-150 h-150 mt-10 md:mt-auto mb-50 md:mb-0" id="hero">
        

            <div className="md:col-span-8 space-y-5 text-center md:text-left">
                <h4 className="text-2xl font-bold text-gray-900">Hi, I&apos;m Tornam 👋</h4>
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-blue-500 text-pretty ">Software Engineer</h1>
                <h4 className="text-2xl font-bold text-gray-400 ">Student • Fullstack Developer • AI & ML Enthusiast</h4>
                <p className="text-gray-600 leading-relaxed text-lg text-pretty ">I love building functional and user-centric digital experiences. With a strong understanding of the entire development lifecycle, I transform complex problems into efficient software systems.</p>
                
                {/* CTA buttons */}
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded  hover:bg-yellow-500 hover:text-gray-800 transition font-bold">
                        <span className="inline-flex items-center gap-2">Contact Me {infoIcon} </span>
                    </button>

                    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 hover:text-yellow-500 transition font-bold">
                        <span className="inline-flex items-center gap-2"> View Projects {ProjectIcon}</span>
                    </button> 
                </div>

            </div>

            <div className="md:col-span-4 md:top-8 text-center md:text-right">
               
                {/* My Image */}
                
                    <Image
                        src="/me.png"
                        alt="picture of dev tornam"
                        width={200}
                        height={200}
                        priority
                        className="w-55 h-55 md:w-85 md:h-70 rounded-full mx-auto shadow-2xl md:mt-8"
                    />
            </div>
        </section>
    );
}