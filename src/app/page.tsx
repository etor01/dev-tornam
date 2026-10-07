import { Brain, Code, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const name = "Etornam Kordzo Ahiataku";
  const lead =
    "Software Engineer • I build functional, User-centric systems • Covering cloud and backend environments.";

  return (
    <main className="container">
      <section className="hero" aria-label="Profile introduction">
        <div className="heroInner">
          <div className="nameBox">
            <h1 className="name">{name}</h1>

            <div className="socialLinks" aria-label="Social links">
              <a
                href="https://www.linkedin.com/in/ahiatakuetornam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="socialLink"
              >
                <img
                  src="/linkedin-icon.png"
                  alt="LinkedIn"
                  className="socialIcon"
                />
              </a>
              <a
                href="https://github.com/etor01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="socialLink"
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className="socialIcon"
                />
              </a>
              <a
                href="https://x.com/AhiatakuEtornam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="socialLink"
              >
                <img
                  src="/twitter-icon.png"
                  alt="Twitter"
                  className="socialIcon"
                />
              </a>
            </div>

            <p className="lead">{lead}</p>
          </div>

          <div className="profilePhotoWrapper">
            <Image
              src="/me.png"
              alt="Etornam Kordzo Ahiataku"
              width={180}
              height={180}
              className="profilePhoto"
              priority
            />
          </div>
        </div>
      </section>

      <nav className="Pagelinks" aria-label="Quick links">
        <Link href="/projects" className="pageLinkItem">
          <Code size={24} className="pageLinkIcon" /> Projects
        </Link>
        <Link href="/documents" className="pageLinkItem">
          <FileText size={24} className="pageLinkIcon" /> Documents
        </Link>
        <Link href="/thoughts" className="pageLinkItem">
          <Brain size={24} className="pageLinkIcon" /> Thoughts
        </Link>
      </nav>

      <footer className="footer">
        <p className="footerCopyright">
          &copy; {new Date().getFullYear()} Etornam Kordzo Ahiataku &mdash; etornam.me
        </p>
      </footer>
    </main>
  );
}
