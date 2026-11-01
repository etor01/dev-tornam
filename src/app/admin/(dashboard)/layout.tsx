import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/auth/helpers";
import AdminNav from "@/app/admin/components/AdminNav";
import { logout } from "@/app/admin/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    return (
      <div
        className="adminShell"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div
          className="adminCard"
          style={{
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            padding: "2.5rem 2rem",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔒</div>
          <h1
            style={{
              fontSize: "1.4rem",
              fontFamily: "var(--font-lora), serif",
              margin: "0 0 0.5rem",
            }}
          >
            Access Restricted
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            Signed in as <strong>{user.email}</strong>, but this account has not
            been added to the administrator allowlist table.
          </p>
          <form action={logout}>
            <button className="adminBtn danger" type="submit">
              Sign Out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="adminShell">
      <AdminNav />
      <main className="adminMain">{children}</main>
    </div>
  );
}
