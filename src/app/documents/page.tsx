import Link from "next/link";

const documents = [
  {
    title: "Resume",
    description: "A concise overview of my experience, skills, and background.",
    downloadHref: "/resume.pdf",
    viewHref: "/resume.pdf",
  },
  {
    title: "Curriculum Vitae",
    description:
      "A more detailed professional record for academic and career use.",
    downloadHref: "/cv.pdf",
    viewHref: "/cv.pdf",
  },
  {
    title: "Certificates",
    description: "A collection of professional and technical certifications.",
    downloadHref: "/certificates.pdf",
    viewHref: "/certificates.pdf",
  },
  {
    title: "References",
    description: "A list of professional contacts and recommendations.",
    downloadHref: "#",
    viewHref: "#",
  },
];

export default function DocumentsPage() {
  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>Certificates, CV, and references</h1>
            <p>
              Download or preview the files that represent my professional
              profile.
            </p>
          </div>
        </header>

        <div className="documentList">
          {documents.map((document) => (
            <article key={document.title} className="documentItem">
              <h2>{document.title}</h2>
              <p>{document.description}</p>
              {document.title !== "References" ? (
                <div className="documentActions">
                  <a href={document.downloadHref} download>
                    Download
                  </a>
                  <a
                    href={document.viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </div>
              ) : (
                <div className="documentActions">
                  <a href="#">View references</a>
                </div>
              )}
            </article>
          ))}
        </div>

        <p style={{ marginTop: "1rem" }}>
          <Link href="/" className="backLink">
            Back home
          </Link>
        </p>
      </section>
    </main>
  );
}
