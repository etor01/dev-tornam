import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className=" bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-100">Tornam.<span className="text-sm">dev</span></span>
                <ul className="hidden md:flex gap-8 items-center font-bold text-gray-100">
                    <li><Link href="#about" className=" hover:text-blue-400 transition">About</Link></li>
                    <li><Link href="#experience" className=" hover:text-blue-400 transition">Experience</Link></li>
                    <li><Link href="#projects" className=" hover:text-blue-400 transition">Projects</Link></li>
                    <li><Link href="#contact" className="bg-yellow-400 text-gray-600 font-bold px-4 py-2 rounded mr-2 hover:bg-yellow-400 hover:text-gray-800 transition ">Let&apos;s talk</Link></li>
                </ul>
                 <Image
                    src="/me.png"
                    alt="picture of dev tornam"
                    width={50}
                    height={50}
                    priority
                    className="block md:hidden w-10 h-10 rounded-full shadow-2xl border-2 border-yellow-500"
                />
            </nav>
        </header>
    );
}