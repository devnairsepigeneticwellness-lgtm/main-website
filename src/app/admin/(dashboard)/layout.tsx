import React, { Suspense } from "react";
import { redirect, unstable_rethrow } from "next/navigation";
import { connection } from "next/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export const instant = false;

function AdminLoading() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-[#59675F] space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
      <span className="text-xs font-medium">Loading page...</span>
    </div>
  );
}

function AdminShellFrame({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#24352D] font-sans flex flex-col lg:flex-row">
      {sidebar}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}

function AdminSidebarFallback() {
  return <aside className="w-64 bg-[#102E27] min-h-screen hidden lg:block" />;
}

async function AdminAuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defer auth cookie verification and Supabase token checks (Date.now) to request time.
  await connection();

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
      unstable_rethrow(err);
      redirect("/admin/login");
    }
  }

  return (
    <AdminShellFrame
      sidebar={
        <Suspense fallback={<AdminSidebarFallback />}>
          <AdminSidebar userEmail={userEmail} />
        </Suspense>
      }
    >
      <Suspense fallback={<AdminLoading />}>{children}</Suspense>
    </AdminShellFrame>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <AdminShellFrame sidebar={<AdminSidebarFallback />}>
          <AdminLoading />
        </AdminShellFrame>
      }
    >
      <AdminAuthenticatedShell>{children}</AdminAuthenticatedShell>
    </Suspense>
  );
}
