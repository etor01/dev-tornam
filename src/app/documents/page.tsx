"use client";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

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
    name: "Dr. Kwabena Owusu Agyemang",
    role: "KNUST Lecturer / Exams Officer - (2026)",
    email: "kwabenaoa@knust.edu.gh",
    phone: "+233 244 727 596",
  },
  {
    name: "Dr. Benjamin Tei Partey",
    role: "KNUST Lecturer / 4th Year Project Supervisor - (2026)",
    email: "benjamin.tei@knust.edu.gh",
    phone: "+233 243 663 534",
  },
  {
    name: "Dr. Anthony Tettey Junior",
    role: "KNMH - Health Administrator - (2024)",
    email: "anthonytettey@gmail.com",
    phone: "+233 246 708 030",
  },
];

export default function DocumentsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };
  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>Electronic Documents Archive</h1>
            <p>
              Professional documents and assets representing my profile. As you
              preview or download them, please note standard data and privacy
              considerations.
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
              Get a reference from colleagues or mentors I have worked with.
              Please respect their time and communication boundaries.
            </p>
            <ul className="referenceList">
              {references.map((ref) => (
                <li key={ref.name} className="referenceItem">
                  <strong>{ref.name}</strong>
                  {/* role */}
                  <div
                    style={{
                      color: "var(--accent-blue)",
                      margin: "0.25rem 0",
                      fontWeight: 700,
                    }}
                  >
                    {ref.role}
                  </div>
                  {/* email */}
                  <div>
                    Email: <span className="email link">{ref.email}</span>
                    <button
                      className=" text-gray-500 px-4 py-2 rounded active:text-green-600 cursor-copy p-0 m-0"
                      onClick={() => handleCopy(`${ref.name}-email`, ref.email)}
                    >
                      {copiedKey === `${ref.name}-email` ? (
                        <Check
                          size={16}
                          className="animate-in zoom-in duration-200 text-green-500 p-0 m-0"
                        />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  {/* phone */}
                  <div>
                    Phone: <span className="phone link">{ref.phone}</span>
                    <button
                      onClick={() => handleCopy(`${ref.name}-phone`, ref.phone)}
                      className=" text-gray-500 px-4 py-2 rounded active:text-green-600 cursor-copy p-0 m-0"
                    >
                      {copiedKey === `${ref.name}-phone` ? (
                        <Check
                          size={16}
                          className="animate-in zoom-in duration-200 *:text-green-500 p-0 m-0"
                        />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
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
