"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-(--header-bg) backdrop-blur-sm border-b border-(--border)">
      <nav
        className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-bold text-(--text-primary) tracking-tight"
          aria-label="Homepage"
        >
          Tornam.<span className="text-(--muted)">dev</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-(--text-secondary)">
            <li>
              <Link href="#projects">Projects</Link>
            </li>
            <li>
              <Link href="#experience">Experience</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="bg-(--primary) text-(--on-primary) px-5 py-2 rounded-md text-sm font-semibold hover:bg-(--primary-hover) transition-all shadow-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
