"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname();

    if (pathname === "/maintainance") {
        return null;
    }else {
            return (
                <header className="font-[inter] bg-linear-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-md shadow-md sticky top-0 z-50">
                    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                            <Link href="#hero" >
                        <span className="text-2xl font-bold text-gray-700">Tornam.<span className="text-sm">dev</span></span>
                            </Link>
                        <ul className="hidden md:flex gap-8 items-center font-bold text-gray-700">
                            <li><Link href="#about" className=" hover:text-blue-100 transition">About Me</Link></li>
                            <li><Link href="#experience" className=" hover:text-blue-100 transition">Experience</Link></li>
                            <li><Link href="#projects" className=" hover:text-blue-100 transition">Projects</Link></li>
                            <li><Link href="#contact" className="bg-slate-900 border border-slate-700  text-gray-100 font-bold px-4 py-2 rounded-lg mr-2 hover:bg-slate-800 hover:text-white transition ">Let&apos;s talk</Link></li>
                        </ul>
                        <Image
                            src="/me.png"
                            alt="picture of dev tornam"
                            width={50}
                            height={50}
                            priority
                            className="block md:hidden w-10 h-10 rounded-full shadow-2xl shadow-blue-900/20 border-2 border-slate-800"
                        />
                    </nav>
                </header>
            );
        }
}