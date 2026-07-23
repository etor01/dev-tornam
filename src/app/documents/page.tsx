import Link from "next/link";

const documents = [
  {
    title: "Resume",
    description: "A concise overview of my experience, skills, and background.",
    downloadHref: "/Etornam_Kordzo_Ahiataku_Resume.pdf",
    viewHref: "/Etornam_Kordzo_Ahiataku_Resume.pdf",
  },
  {
    title: "Curriculum Vitae",
    description:
      "A more detailed professional record for academic and career use.",
    downloadHref: "/Etornam_Kordzo_Ahiataku_CV.pdf",
    viewHref: "/Etornam_Kordzo_Ahiataku_CV.pdf",
  },
  {
    title: "Certificates",
    description: "A collection of professional and technical certifications.",
    downloadHref: "/Etornam_Kordzo_Ahiataku_Certificates.pdf",
    viewHref: "/Etornam_Kordzo_Ahiataku_Certificates.pdf",
  },
];

const references = [
  {
    name: "Dev Kweku",
    role: "Software Engineer at Google",
    email: "kweku.dev@google.com",
    phone: "(123) 456-7890",
  },
  {
    name: "Nana Kofi",
    role: "Project Lead at Meta",
    email: "nana.kofi@meta.org",
    phone: "(123) 456-7890",
  },
  {
    name: "Tornam Kojo",
    role: "Software Engineer at Intel",
    email: "tee.dev@intel.com",
    phone: "(123) 456-7890",
  },
];

export default function DocumentsPage() {
  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>Electronic Documents Archive</h1>
            <p>
              Professional documents and assets representing my profile. As you preview or download them, please note standard data and privacy considerations.
            </p>
          </div>
        </header>

        <div className="documentList">
          {documents.map((doc) => (
            <article key={doc.title} className="documentItem">
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
              <div className="documentActions">
                <a href={doc.downloadHref} download>
                  Download ↓
                </a>
                <a
                  href={doc.viewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View ↗
                </a>
              </div>
            </article>
          ))}

          <article className="documentItem">
            <h2>Quick References</h2>
            <p>
              Get a reference from colleagues or mentors I have worked with. Please respect their time and communication boundaries.
            </p>
            <ul className="referenceList">
              {references.map((ref) => (
                <li key={ref.name} className="referenceItem">
                  <strong>{ref.name}</strong>
                  <div style={{ color: "var(--accent-blue)", margin: "0.25rem 0", fontWeight: 700 }}>{ref.role}</div>
                  <div>Email: {ref.email}</div>
                  <div>Phone: {ref.phone}</div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p style={{ marginTop: "2rem" }}>
          <Link href="/" className="backLink">
            Back home
          </Link>
        </p>
      </section>
    </main>
  );
}
