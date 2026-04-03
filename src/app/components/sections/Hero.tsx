"use client";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Hero() {
  return (
    <section
      className="container mx-auto max-w-5xl px-6 py-20 md:py-32"
      id="hero"
    >
      <div className="space-y-6 max-w-2xl">
        {/* Available for work badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for work
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
          Etornam Ahiataku
        </h1>

        <h2 className="text-xl md:text-2xl font-medium text-slate-500">
          Engineer • Student • AWS Cloud Practitioner
        </h2>

        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
          I love building functional and user-centric digital experiences. With
          a strong understanding of the entire development lifecycle, I
          transform complex problems into efficient software systems.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="#contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
          >
            Get in touch
          </Link>

          <div className="flex gap-4">
            <Link
              href="https://www.github.com/etor01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <AiFillGithub size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahiatakuetornam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <AiFillLinkedin size={24} />
            </Link>
            <Link
              href="mailto:ahiataku1@gmail.com"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <AiOutlineMail size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
