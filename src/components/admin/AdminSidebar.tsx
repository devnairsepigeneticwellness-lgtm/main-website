"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  History,
  Images,
  Inbox,
  Clock,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AdminSidebarProps {
  userEmail?: string;
}

export default function AdminSidebar({ userEmail: initialUserEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | undefined>(initialUserEmail);
  const isConnected = isSupabaseConfigured();

  useEffect(() => {
    if (!initialUserEmail && isConnected) {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user?.email) {
          setCurrentEmail(data.user.email);
        }
      });
    }
  }, [initialUserEmail, isConnected]);

  // Allow Esc key to dismiss mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Home Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Workshops & Events", href: "/admin/events", icon: CalendarDays },
    { label: "Add Upcoming Event", href: "/admin/events/new", icon: PlusCircle },
    { label: "Add Past Event", href: "/admin/events/new/previous", icon: History },
    { label: "Photo Galleries", href: "/admin/gallery", icon: Images },
    { label: "Client Bookings", href: "/admin/bookings", icon: Inbox },
    { label: "Clinic Hours & Leave", href: "/admin/availability", icon: Clock },
  ];

  // Match the single most specific navigation route so nested routes never highlight multiple links
  const activeHref = navItems
    .filter((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname === item.href || pathname.startsWith(item.href + "/")
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-[#102E27] text-white px-4 h-14 flex items-center justify-between border-b border-[#B58B50]/30 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-xs font-bold border border-[#B58B50]/40">
            NEW
          </div>
          <span className="font-serif text-sm font-medium tracking-tight">
            Clinic Admin Panel
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar-drawer"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#173D34] text-[#DFBD83] text-xs font-semibold cursor-pointer"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {/* Tap-to-close mobile backdrop */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        id="admin-sidebar-drawer"
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#102E27] text-[#E8EDE4] border-r border-[#B58B50]/20 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Brand Logo */}
          <div className="flex items-center justify-between pb-5 border-b border-[#173D34]">
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-xs font-semibold border border-[#B58B50]/40 shadow-xs">
                N.E.W.
              </div>
              <div>
                <span className="font-serif text-sm font-medium text-white block leading-tight">
                  Nair&apos;s Wellness
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#DFBD83] block">
                  Clinic Admin Panel
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-lg text-[#E8EDE4]/70 hover:text-white hover:bg-[#173D34] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Plain-English System Mode Pill */}
          <div className="mt-4 px-3 py-2 rounded-xl bg-[#173D34]/70 border border-[#B58B50]/20 text-[11px] flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isConnected ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span className="text-[#E8EDE4]/90 truncate">
              {isConnected ? "Live Website Connected" : "Demo Preview Mode"}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#173D34] text-[#DFBD83] font-semibold shadow-xs border-l-2 border-[#DFBD83]"
                      : "text-[#E8EDE4]/75 hover:bg-[#173D34]/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#B58B50]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#173D34] space-y-3">
          {currentEmail && (
            <div className="p-2.5 rounded-xl bg-[#173D34]/80 border border-[#B58B50]/20 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#B58B50] text-[#102E27] font-bold flex items-center justify-center text-xs shrink-0">
                {currentEmail.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase tracking-wider text-[#DFBD83] block font-semibold">
                  Signed In As
                </span>
                <span className="text-xs text-white/90 truncate block" title={currentEmail}>
                  {currentEmail}
                </span>
              </div>
            </div>
          )}

          <Link
            href="/events"
            target="_blank"
            className="flex items-center justify-between px-2 py-1 text-xs text-[#E8EDE4]/75 hover:text-[#DFBD83] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </span>
            <span>&rarr;</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-950/35 hover:bg-red-900/45 text-red-200 text-xs font-medium transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
