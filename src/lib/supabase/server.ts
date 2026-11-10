import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabaseClient() {
  let cookieStore: Awaited<ReturnType<typeof cookies>> | null = null;
  try {
    cookieStore = await cookies();
  } catch {
    // When running during static generation / generateStaticParams, cookies() throws.
    // In that context, we proceed without request cookies for public queries.
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore ? cookieStore.getAll() : [];
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        if (!cookieStore) return;
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore?.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
