import Link from "next/link";

export default function Home() {
  const fname = "etornam";
  const name = "Etornam Kordzo Ahiataku";
  const lead = "Software Engineer • Builder of functional, user-centric systems • Exploring cloud and full-stack environments.";

  return (
    <main className="container">
      <section className="hero" aria-label="Profile introduction">
        <div className="nameBox">
          <h1 className="name">{name}</h1>

          <div className="socialLinks" aria-label="Social links">
            <a
              href="https://www.linkedin.com/in/ahiatakuetornam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://github.com/etor01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img src="/github-icon.png" alt="GitHub" width={20} height={20} />
            </a>
            <a
              href="https://x.com/AhiatakuEtornam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img
                src="/twitter-icon.png"
                alt="Twitter"
                width={20}
                height={20}
              />
            </a>
          </div>

          <p className="lead">{lead}</p>
        </div>
      </section>

      <nav className="Pagelinks" aria-label="Quick links">
        <Link href="/projects">Projects</Link>
        <Link href="/documents">Documents</Link>
        <Link href="/thoughts">Thoughts</Link>
      </nav>

      <footer className="footer">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", borderBottom: "1px dashed var(--ink-border)", paddingBottom: "1rem", marginBottom: "1rem" }}>
          <div>
            <strong style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-primary)" }}>SHEET TITLE</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", fontWeight: 700 }}>PORTFOLIO CORE</p>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-primary)" }}>STYLE SPEC</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", fontWeight: 700 }}>BLUEPRINT V1.0</p>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-primary)" }}>ENGINEER</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", fontWeight: 700 }}>E. K. AHIATAKU</p>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-primary)" }}>ORIGIN ALIAS</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", fontWeight: 700 }}>&quot;{fname}&quot; (REVERSED)</p>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
          Fun Fact: I was searching for etornam.dev but it was taken, so I decided to spell my first name backwards. It had a nice ring to it, so I registered manrote.dev.
        </p>
      </footer>
    </main>
  );
}

