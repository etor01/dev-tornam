"use client";

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";

// --- 1. Zod Validation Schema ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

// --- 2. Custom Toast Component ---
type ToastType = "success" | "error" | null;

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 5000); // Auto close after 5s
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`font-[inter] fixed bottom-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-slide-in ${
        isSuccess
          ? "bg-slate-900/90 border-green-500/50 text-green-400"
          : "bg-slate-900/90 border-red-500/50 text-red-400"
      }`}
    >
      {/* Icon based on type */}
      {isSuccess ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-exclamation-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      )}
      <div>
        <h4 className="font-bold text-sm">{isSuccess ? "Success" : "Error"}</h4>
        <p className="text-xs text-slate-300">{message}</p>
      </div>
      <button onClick={onClose} className="ml-2 hover:text-white">
        ✕
      </button>
    </div>
  );
};

// --- 3. Main Contact Component ---
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: "",
    type: null,
  });

  const sendIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-send"
      viewBox="0 0 16 16"
    >
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
    </svg>
  );

  const loadingIcon = (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    if (!formRef.current) return;

    // 1. Extract Data
    const formData = new FormData(formRef.current);
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    // 2. Validate with Zod
    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) formattedErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(formattedErrors);
      setToast({ message: "Please check the form for errors.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    // 3. Send via EmailJS
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setToast({ message: "Message sent successfully!", type: "success" });
      formRef.current.reset(); // Clear form
    } catch (error) {
      console.log(error);
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="font-[inter] py-16 px-6 relative" id="contact">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: null })}
      />

      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* LEFT COLUMN: Title */}
        <div className="md:col-span-4 md:sticky md:top-8 text-center md:text-right">
          <h2 className="font-[poppins] text-4xl md:text-6xl font-extrabold text-(--text-primary) hover:text-(--text-secondary) tracking-tighter uppercase mb-2 transition-colors">
            Contact
          </h2>
          <span className="font-[poppins] block text-2xl md:text-3xl font-bold text-(--secondary) -mt-4 md:-mt-5 mr-0 md:mr-2">
            Me
          </span>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="md:col-span-8 space-y-6 text-center md:text-left">
          <h3 className="text-2xl font-bold text-(--text-primary) mb-1">
            Send me a message
          </h3>
          <p className="text-(--text-secondary) leading-relaxed text-lg text-pretty">
            I&apos;m currently open to discussing new projects, creative ideas,
            or opportunities to be part of your visions.
            <span className="px-3 py-1 bg-(--badge-bg) text-(--text-primary) rounded-full text-sm font-medium ml-1.5 animate-pulse">
              Open to Work
            </span>
          </p>

          <form ref={formRef} onSubmit={handleSend} noValidate>
            <div>
              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-(--text-secondary) font-medium text-left"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`mt-2 block w-full px-4 py-2.5 bg-(--input-bg) border rounded-lg text-(--text-primary) placeholder-(--muted) focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none transition ${fieldErrors.name ? "border-red-500" : "border-(--border)"}`}
                  placeholder="Your Name"
                />
                {fieldErrors.name && (
                  <p className="text-red-400 text-sm mt-1 text-left">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-(--text-secondary) font-medium text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`mt-2 block w-full px-4 py-2.5 bg-(--input-bg) border rounded-lg text-(--text-primary) placeholder-(--muted) focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none transition ${fieldErrors.email ? "border-red-500" : "border-(--border)"}`}
                  placeholder="you@example.com"
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-sm mt-1 text-left">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-(--text-secondary) font-medium text-left"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`mt-2 block w-full px-4 py-2.5 bg-(--input-bg) border rounded-lg text-(--text-primary) placeholder-(--muted) focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none transition ${fieldErrors.message ? "border-red-500" : "border-(--border)"}`}
                  rows={4}
                  placeholder="How can I help you?"
                ></textarea>
                {fieldErrors.message && (
                  <p className="text-red-400 text-sm mt-1 text-left">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-(--primary) hover:bg-(--primary-hover) text-(--on-primary) px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto md:mx-0"
              >
                {isSubmitting ? (
                  <>Sending... {loadingIcon}</>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Send {sendIcon}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
