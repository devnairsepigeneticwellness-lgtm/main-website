import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !url.startsWith("http")) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Calling getUser refreshes expired auth tokens and validates the active session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/admin/reset-password" ||
    pathname === "/admin/update-password";

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  // Protect admin routes: redirect unauthenticated users to login
  if (isAdminRoute && !isAuthPage && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If already authenticated and visiting login page, redirect to admin console
  if (isAuthPage && user && pathname !== "/admin/update-password") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.searchParams.delete("redirect");
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

