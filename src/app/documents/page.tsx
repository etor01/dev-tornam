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
  {
    title: "Quick References",
    description:
      "Get a quick word about me from the contacts below. Please be kind and respect their time",
  },
];

export default function DocumentsPage() {
  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>My Electronic Documents Archive</h1>
            <p>
              This files that represent my professional profile. As you preview
              or download them bare in mind laws regarding data collection and
              user data safety.
            </p>
          </div>
        </header>

        <div className="documentList">
          {documents.map((document) => (
            <article key={document.title} className="documentItem">
              <h2>{document.title}</h2>
              <p>{document.description}</p>
              {document.title !== "Quick References" ? (
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
                  {/*a nice ul of the references, name, company, and contact information(email and telephone) */}
                  <div>
                    <ul>
                      <li>
                        <strong>Dev Kweku</strong> - Software Engineer at Google
                        <br />
                        Email: kweku.dev@google.com
                        <br />
                        Phone: (123) 456-7890
                      </li>
                      <br />
                      <li>
                        <strong>Nana Kofi</strong> - Project Lead at Meta
                        <br />
                        Email: nana.kof@meta.org
                        <br />
                        Phone: (123) 456-7890
                      </li>
                      <br />
                      <li>
                        <strong>Tornam Kojo</strong> - Software Engineer at
                        Intel
                        <br />
                        Email: tee.dev@intel.com
                        <br />
                        Phone: (123) 456-7890
                      </li>
                    </ul>
                  </div>
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
