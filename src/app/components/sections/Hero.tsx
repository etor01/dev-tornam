'use client';
import Image from "next/image";
import Link from "next/link";

export default function Hero() {

const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg>;
    const ProjectIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">
                        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184A3.12 3.12 0 0 0 8.598 3h5.902a1.5 1.5 0 0 1 1.5 1.5v.64l-7.682-1.28a2.12 2.12 0 0 0-1.02.026L1 5.083V3.5z"/>
                        <path d="M0 6.293V12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-7.707l-7.918 1.32a3.12 3.12 0 0 1-1.02-.026L0 6.293z"/>
                    </svg>;
    const GithubIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>;
    const EmailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                    </svg>;
    const LinkedinIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>;

    return (
        <section className="container p-8 md:p-6 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-12 items-center md:h-1vh h-screen pt-10 md:m-auto mb-0 md:mb-0 " id="hero">
            <div className="md:col-span-8 space-y-5 text-center md:text-left">

                <h4 className="text-lg md:text-2xl font-semibold text-slate-400 my-0 md:my-5 tracking-wide">Hi, I&apos;m Tornam 👋</h4>
                
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 text-pretty drop-shadow-sm md:py-4 py-2">Software Engineer</h1>
                
                {/* Subtitle: Crisp slate-200 */}
                <h4 className="text-sm md:text-2xl font-bold text-slate-200">Student • Fullstack Developer • AI & ML Enthusiast</h4>
                
                {/* Description: Relaxed slate-400 for readability */}
                <p className="text-lg text-slate-400 leading-relaxed md:text-lg text-pretty max-w-2xl">I love building functional and user-centric digital experiences. With a strong understanding of the entire development lifecycle, I transform complex problems into efficient software systems.</p>
                
                {/* Social Icons: Unified style with slate backgrounds and hover effects */}
                <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                    <Link href="mailto:ahiataku1@gmail.com">
                        <span className="inline-flex items-center justify-center w-10 h-10 px-0 py-0 bg-slate-800/50 border border-slate-700 text-blue-400 rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300">{EmailIcon}</span>
                    </Link>

                    <Link href="#">
                        <span className="inline-flex items-center justify-center w-10 h-10 px-0 py-0 bg-slate-800/50 border border-slate-700 text-blue-400 rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300">{LinkedinIcon}</span>
                    </Link>

                    <Link href="#">
                        <span className="inline-flex items-center justify-center w-10 h-10 px-0 py-0 bg-slate-800/50 border border-slate-700 text-blue-400 rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300">{GithubIcon}</span>
                    </Link>
                </div>
                
                {/* CTA buttons */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
                    <Link href="#contact">
                        {/* Primary Button: Solid blue with shadow glow */}
                        <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-300 font-semibold cursor-pointer border border-transparent">
                            <span className="inline-flex items-center gap-2">Contact Me {infoIcon} </span>
                        </button>
                    </Link>
                    <Link href="#projects">    
                        {/* Secondary Button: Slate surface with border, much cleaner than yellow/gray */}
                        <button className="w-full sm:w-auto bg-slate-900 text-slate-300 border border-slate-700 px-8 py-3 rounded-lg shadow-md hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-300 font-semibold cursor-pointer">
                            <span className="inline-flex items-center gap-2 cursor-pointer"> Download CV {ProjectIcon}</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="col-span-0 md:col-span-4 md:top-8 text-center md:text-right mb-0">
                {/* My Image: Refined shadow and changed border to match dark theme */}
                <Image
                    src="/me.png"
                    alt="picture of dev tornam"
                    width={200}
                    height={200}
                    priority
                    className="hidden md:block md:w-85 md:h-70 rounded-full mx-auto shadow-2xl shadow-blue-900/20 border-4 border-slate-800"
                />
            </div>
        </section>
    );
}