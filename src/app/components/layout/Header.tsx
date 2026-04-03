"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const hideHeader = pathname === "/maintainance";

  useEffect(() => {
    // initialize current hash and listen for hash changes
    const setCurrentHash = () => setHash(window.location.hash || "");
    setCurrentHash();
    window.addEventListener("hashchange", setCurrentHash);
    return () => window.removeEventListener("hashchange", setCurrentHash);
  }, []);

  const isActiveHash = (anchor: string) => {
    // anchor is like '#projects' — active when pathname is root and hash matches
    return pathname === "/" && hash === anchor;
  };

  const isActiveRoute = (route: string) =>
    pathname === route || pathname?.startsWith(route + "/");

  const linkBase = "hover:text-slate-900 transition-colors";

  if (hideHeader) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-50">
      <nav
        className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-bold text-slate-900 tracking-tight"
          aria-label="Homepage"
        >
          Tornam.<span className="text-gray-400">dev</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
            <li>
              <Link
                href="#projects"
                className={`${linkBase} ${isActiveHash("#projects") ? "text-slate-900 font-semibold" : ""}`}
                aria-current={isActiveHash("#projects") ? "page" : undefined}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className={`${linkBase} ${isActiveHash("#experience") ? "text-slate-900 font-semibold" : ""}`}
                aria-current={isActiveHash("#experience") ? "page" : undefined}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`${linkBase} ${isActiveRoute("/blog") ? "text-slate-900 font-semibold" : ""}`}
                aria-current={isActiveRoute("/blog") ? "page" : undefined}
              >
                Blog
              </Link>
            </li>
          </ul>

          <Link
            href="#contact"
            className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
