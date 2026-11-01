import { Brain, Code, FileText, FlaskConical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/db/settings";
import { getFeaturedProjects } from "@/lib/db/projects";

// Revalidate public homepage every 60 seconds (ISR) or on demand via CMS mutations
export const revalidate = 60;

// Fallback featured projects if DB is not seeded yet
const FALLBACK_FEATURED = [
  {
    id: "1",
    title: "Mediscan",
    slug: "mediscan",
    description:
      "An AI-powered medical imaging analysis tool designed to assist healthcare professionals in early diagnosis of breast related diseases. Integrates local AI model engines.",
    tech_stack: ["REST API", "Ollama", "Llama 3.2", "HTML", "JavaScript"],
    category: "software",
    github_url: "https://github.com/etor01/MediScan-Ai",
    live_url: "https://etor01.github.io/MediScan-Ai/",
    year: 2024,
    status: "active",
  },
  {
    id: "2",
    title: "AgriBoost",
    slug: "agriboost",
    description:
      "Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration. Streamlines crop listing and bulk ordering.",
    tech_stack: ["NextJS", "Supabase", "PayStack", "Tailwind", "HuggingFace"],
    category: "software",
    github_url: "https://github.com/etor01/agriboost2",
    live_url: "https://agriboost2.vercel.app/",
    year: 2023,
    status: "active",
  },
];

export default async function Home() {
  const settings = await getSiteSettings();
  const dbFeatured = await getFeaturedProjects();

  const name = settings.hero_name || "Etornam Kordzo Ahiataku";
  const lead =
    settings.hero_lead ||
    "Software Engineer • I build functional, User-centric systems • Covering cloud and backend environments.";
  const bio = settings.hero_bio;

  const linkedinUrl =
    settings.social_linkedin || "https://www.linkedin.com/in/ahiatakuetornam/";
  const githubUrl = settings.social_github || "https://github.com/etor01";
  const twitterUrl =
    settings.social_twitter || "https://x.com/AhiatakuEtornam";

  const featured = dbFeatured.length > 0 ? dbFeatured : FALLBACK_FEATURED;

  return (
    <main className="container">
      <section className="hero" aria-label="Profile introduction">
        <div className="heroInner">
          <div className="nameBox">
            <h1 className="name">{name}</h1>

            <div className="socialLinks" aria-label="Social links">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
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
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
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
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
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
              )}
            </div>

            <p className="lead">{lead}</p>
            {bio && (
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {bio}
              </p>
            )}
          </div>

          <div className="profilePhotoWrapper">
            <Image
              src="/me.png"
              alt={name}
              width={180}
              height={180}
              className="profilePhoto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featured.length > 0 && (
        <section
          className="featuredProjectsSection"
          aria-label="Featured projects"
        >
          <div className="featuredProjectsHeader">
            <h2 className="featuredProjectsTitle">Featured Work</h2>
            <Link href="/projects" className="featuredProjectsViewAll">
              All Projects →
            </Link>
          </div>
          <div className="featuredGrid">
            {featured.slice(0, 2).map((project) => (
              <article
                key={project.id}
                className="projectCard"
                style={{ height: "auto" }}
              >
                <div className="projectBody" style={{ padding: "1.1rem" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-mono), monospace",
                          textTransform: "uppercase",
                          color: "var(--accent-blue)",
                          fontWeight: 700,
                        }}
                      >
                        {project.category}
                      </span>
                      {project.year && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono), monospace",
                            color: "var(--muted)",
                          }}
                        >
                          {project.year}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        margin: "0 0 0.4rem",
                        fontFamily: "var(--font-lora), Georgia, serif",
                        fontSize: "1.15rem",
                      }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        style={{
                          color: "var(--text-primary)",
                          textDecoration: "none",
                        }}
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        margin: "0 0 0.8rem",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <div className="projectTags" style={{ marginBottom: "0.8rem" }}>
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="techBadge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="projectActions">
                      <Link href={`/projects/${project.slug}`}>
                        Details →
                      </Link>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live site for ${project.title}`}
                        >
                          Live Site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Quick Navigation Links */}
      <nav
        className="Pagelinks"
        aria-label="Quick links"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.9rem",
        }}
      >
        <Link href="/projects" className="pageLinkItem">
          <Code size={20} className="pageLinkIcon" /> Projects
        </Link>
        <Link href="/documents" className="pageLinkItem">
          <FileText size={20} className="pageLinkIcon" /> Documents
        </Link>
        <Link href="/thoughts" className="pageLinkItem">
          <Brain size={20} className="pageLinkIcon" /> Thoughts
        </Link>
        <Link href="/lab" className="pageLinkItem">
          <FlaskConical size={20} className="pageLinkIcon" /> Lab
        </Link>
      </nav>

      <footer className="footer">
        <p className="footerCopyright">
          {settings.footer_text || (
            <>
              &copy; {new Date().getFullYear()} {name} &mdash; etornam.me
            </>
          )}
        </p>
      </footer>
    </main>
  );
}
