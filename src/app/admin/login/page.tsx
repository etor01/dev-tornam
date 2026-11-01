"use client";

import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid email or password.");
        return;
      }

      window.location.href = redirectTo;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="adminLoginForm" noValidate>
      <div className="formField">
        <label htmlFor="admin-email">Email Address</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@etornam.me"
          required
          autoComplete="email"
          disabled={isPending}
        />
      </div>

      <div className="formField">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          disabled={isPending}
        />
      </div>

      {error && (
        <p className="formStatusMsg error" role="alert">
          ✕ {error}
        </p>
      )}

      <button
        id="admin-login-btn"
        type="submit"
        className="adminLoginBtn"
        disabled={isPending}
      >
        {isPending ? "Signing in…" : "Sign In →"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="adminLoginPage">
      <div className="adminLoginCard">
        {/* Header */}
        <div className="adminLoginHeader">
          <p className="eyebrow" style={{ textAlign: "center" }}>
            etornam.me
          </p>
          <h1 className="adminLoginTitle">CMS Admin</h1>
          <p className="adminLoginSubtitle">
            Sign in to manage your content.
          </p>
        </div>

        {/* Form wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "var(--muted)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.85rem",
              }}
            >
              Loading sign in form…
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="adminLoginNote">
          Access is restricted to authorised administrators.
        </p>
      </div>
    </div>
  );
}
