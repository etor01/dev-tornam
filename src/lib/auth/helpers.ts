import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns the current authenticated Supabase user or null.
 * Safe to call in server components and server actions.
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}

/**
 * Returns true only if the current user is in the admins allowlist table.
 * An authenticated Supabase user is NOT automatically an admin.
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .single();

  return !error && data !== null;
}

/**
 * Throws a redirect to /admin/login if there is no authenticated user.
 * Throws a 403 error response if the user is authenticated but not an admin.
 *
 * Use this as the first call inside every protected server action and
 * route handler. Never rely solely on middleware for security.
 *
 * Returns the user object on success.
 */
export async function requireAdmin() {
  const user = await getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: adminRow, error } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .single();

  if (error || !adminRow) {
    // Authenticated but not in the admins allowlist
    throw new Response("Forbidden", { status: 403 });
  }

  return user;
}
