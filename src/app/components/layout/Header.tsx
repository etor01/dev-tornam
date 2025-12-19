import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">DevTornam.</span>
                <ul className="hidden md:flex gap-8 items-center">
                    <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition">About</Link></li>
                    <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition">Experience</Link></li>
                    <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition">Projects</Link></li>
                    <li><Link href="#" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Let&apos;s talk</Link></li>
                </ul>
            </nav>
        </header>
    );
}