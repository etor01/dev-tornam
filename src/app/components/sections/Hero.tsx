import Image from "next/image";

export default function Hero() {
    return (
        <section className="container mx-auto p-8 text-center md:text-left text-white grid place-items-center grid-cols-1 md:grid-cols-2 h-130">
            <div>
                <h4 className="font-bold">Hi, I am Tornam 👋</h4>
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-yellow-500 text-pretty ">Software Engineer</h1>
                <h4 className="text-pretty font-bold my-2">Student • Fullstack Developer • AI & ML Enthusiast</h4>
                <p className="text-sm text-balance">I love building functional and user-centric digital experiences. With a strong understanding of the entire development lifecycle, I transform complex problems into efficient software systems.</p>
                <div className="mt-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition">Contact Me</button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">View Portfolio</button> 
                </div>
            </div>
            <div>
                {/* Placeholder for an image or graphic */}
                
                    <Image
                        src="/me.png"
                        alt="picture of dev tornam"
                        width={200}
                        height={200}
                        priority
                        className="w-48 h-48 rounded-full mx-auto shadow-2xl"
                    />
            </div>
        </section>
    );
}