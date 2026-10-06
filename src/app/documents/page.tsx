"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2 } from "lucide-react";

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

type FormStatus = "idle" | "loading" | "success" | "error";

const TOPICS = [
  "General Question",
  "Project Collaboration",
  "Reference Request",
  "Tech Stack Inquiry",
  "Job Opportunity",
  "Other",
];

export default function DocumentsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Manual validation (noValidate disables browser built-ins)
    const data = new FormData(formRef.current);
    const name = (data.get("from_name") as string)?.trim();
    const email = (data.get("reply_to") as string)?.trim();
    const topic = (data.get("topic") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || !email || !topic || !message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields before sending.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Message failed to send. Please try again.");
      console.error("EmailJS error:", err);
    }
  };

  return (
    <main className="contentPage">
      <section className="pageShell">
        <header className="pageHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>Electronic Documents Archive</h1>
            <p>
              Here is a list of my professional documents for your review. For
              more details please use the contact form below.{" "}
              <span className=" font-bold text-blue-600 dark:text-blue-500 text-xs">
                (data privacy laws apply)
              </span>
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
                  View
                </a>
              </div>
            </article>
          ))}

          {/*  Contact Form  */}
          <article className="documentItem">
            <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>
              Transmit
            </p>
            <h2>Contact Me</h2>
            <p>
              Shoot your DM on a project collab, ask about my references, tech
              stack, or anything else. I&apos;ll get back to you as soon as
              possible.
            </p>

            <hr className="formDivider" />

            <form
              id="contact-form"
              ref={formRef}
              className="contactForm"
              onSubmit={handleSubmit}
              onChange={() => {
                if (status === "error") {
                  setStatus("idle");
                  setErrorMsg("");
                }
              }}
              noValidate
            >
              {/* Row: Name + Email */}
              <div className="formRow">
                <div className="formField">
                  <label htmlFor="from_name">Full Name</label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="formField">
                  <label htmlFor="reply_to">Email Address</label>
                  <input
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Topic */}
              <div className="formField">
                <label htmlFor="topic">Topic</label>
                <select id="topic" name="topic" required>
                  <option value="" disabled selected>
                    Select a topic…
                  </option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="formField">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here…"
                  required
                />
              </div>

              {/* Submit row */}
              <div className="formSubmitRow">
                {status === "success" && (
                  <span className="formStatusMsg success">
                    ✓ Message sent. I&apos;ll be in touch soon!
                  </span>
                )}
                {status === "error" && (
                  <span className="formStatusMsg error">✕ {errorMsg}</span>
                )}
                {status === "loading" && (
                  <span className="formStatusMsg loading">Transmitting…</span>
                )}
                {status === "idle" && <span />}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="formSubmitBtn"
                  disabled={status === "loading"}
                  aria-label="Send message"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </article>
          {/* ─────────────────────────────────────────────── */}
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
