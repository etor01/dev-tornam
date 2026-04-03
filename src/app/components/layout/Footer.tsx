import Link from "next/link";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-slate-50 bg-white">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
          Let&apos;s build something great together.
        </h2>
        <Link
          href="mailto:ahiataku1@gmail.com"
          className="text-slate-500 hover:text-blue-600 transition-colors text-lg font-medium"
        >
          ahiataku1@gmail.com
        </Link>

        <div className="flex justify-center gap-6 mt-12 mb-12">
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

        <p className="text-sm text-slate-400 font-medium">
          &copy; {currentYear}. Built with care.
        </p>
      </div>
    </footer>
  );
}
