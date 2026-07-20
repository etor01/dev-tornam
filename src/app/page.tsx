export default function Home() {
  const fname = "etornam";
  const name = "Etornam Ahiataku";
  const lead = "Software Engineer; I build things with my computer.";

  return (
    <main className="container">
      <section className="hero" aria-label="Profile introduction">
        <div className="nameBox">
          <h1 className="name">{name}</h1>

          <div className="socialLinks" aria-label="Social links">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img src="/github-icon.png" alt="GitHub" width={24} height={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img
                src="/twitter-icon.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
          </div>

          <p className="lead">{lead}</p>
        </div>
      </section>

      <nav className="Pagelinks" aria-label="Quick links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Projects
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Documents
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          My Thoughts
        </a>
      </nav>

      <footer className="footer">
        <p>
          Fun Fact: &quot;manrote&quot; is just my name spelt backwards; {fname}
          .
        </p>
      </footer>
    </main>
  );
}
