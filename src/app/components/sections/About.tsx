import Link from "next/link";

export default function About() {
    return (
        <section className="text-center">
            
            <span className="container mx-auto py-4 text-center md:text-left text-gray-800 grid place-items-center grid-cols-1 md:grid-cols-2 h-130">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold md:mb-2 text-yellow-500 text-pretty ">About me</h1>
                </div>

                <div>
                    <h4 className="font-bold">Etornam Kordzo Ahiataku</h4>
                    <h5 className="text-sm md:text-md font-bold mb-2 text-yellow-500 text-pretty "> <span className="text-gray-400 font-medium">Coding Since</span> 2018 - {new Date().getFullYear()} </h5>
                    <h4 className="text-pretty font-bold my-2">Christian • Family Guy • Sometimes a Nerd</h4>
                    <p className="text-base text-balance font-medium text-gray-500">With a foundation in General Science from Keta SHTS, I am currently pursuing my degree at <Link href="https://www.knust.edu.gh" className="text-green-600 hover:font-bold">KNUST</Link>. My journey has been defined by resilience; I believe my background has instilled in me the dedication required to solve complex problems. I value efficiency and clear communication, and I am committed to leveraging these strengths to become a world-class software engineer.</p>
                    <div className="mt-2 text-sm">Critical Thinker &nbsp; | &nbsp; Team Player &nbsp; | &nbsp;  Adaptability</div>
                </div>

            </span>
        </section>
    );
}