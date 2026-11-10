import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export const instant = false;

function AdminLoading() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-[#59675F] space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
      <span className="text-xs font-medium">Loading console view...</span>
    </div>
  );
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | undefined;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/admin/login");
      }
      userEmail = user.email;
    } catch (err: unknown) {
      // If redirect was called, re-throw it so Next.js handles the redirect
      if (err instanceof Error && "digest" in err && typeof (err as { digest: unknown }).digest === "string" && (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      redirect("/admin/login");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#24352D] font-sans flex flex-col lg:flex-row">
      <Suspense fallback={<aside className="w-64 bg-[#102E27] min-h-screen hidden lg:block" />}>
        <AdminSidebar userEmail={userEmail} />
      </Suspense>
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<AdminLoading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
