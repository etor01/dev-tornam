import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js middleware — runs at the edge before every request.
 *
 * Responsibilities:
 * 1. Refresh the Supabase session cookie when it expires (required by @supabase/ssr).
 * 2. Protect /admin/** routes: redirect unauthenticated visitors to /admin/login.
 * 3. Redirect already-authenticated admin users away from /admin/login to /admin.
 *
 * NOTE: Middleware is a UX convenience, not the primary security boundary.
 * Protected server actions and route handlers independently call requireAdmin().
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — important: do not remove this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rawPathname = request.nextUrl.pathname;
  const pathname = rawPathname.length > 1 && rawPathname.endsWith("/")
    ? rawPathname.slice(0, -1)
    : rawPathname;

  // Helper to construct a redirect response that preserves refreshed cookies
  function redirectWithCookies(destinationUrl: URL) {
    const redirectResponse = NextResponse.redirect(destinationUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("redirectTo", rawPathname);
      return redirectWithCookies(loginUrl);
    }
  }

  // Redirect authenticated admin users away from login page
  if (pathname === "/admin/login" && user) {
    try {
      const { data: adminRow } = await supabase
        .from("admins")
        .select("id")
        .eq("id", user.id)
        .single();

      if (adminRow) {
        const dashboardUrl = request.nextUrl.clone();
        dashboardUrl.pathname = "/admin";
        dashboardUrl.search = "";
        return redirectWithCookies(dashboardUrl);
      }
    } catch {
      // In case of error querying admins in middleware, let the user view the page
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
