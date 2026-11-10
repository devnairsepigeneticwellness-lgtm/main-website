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
  ShieldCheck,
  Menu,
  X,
  User,
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
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Manage Events", href: "/admin/events", icon: CalendarDays },
    { label: "Add New Event", href: "/admin/events/new", icon: PlusCircle },
    { label: "Add Previous Event", href: "/admin/events/new/previous", icon: History },
    { label: "Event Galleries", href: "/admin/gallery", icon: Images },
    { label: "Consultation Bookings", href: "/admin/bookings", icon: Inbox },
    { label: "Availability Settings", href: "/admin/availability", icon: Clock },
  ];

  return (
    <>
      {/* Mobile Bar */}
      <div className="lg:hidden bg-[#102E27] text-white p-4 flex items-center justify-between border-b border-[#B58B50]/30 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-xs font-bold border border-[#B58B50]/40">
            NEW
          </div>
          <span className="font-serif text-sm font-medium tracking-tight">
            N.E.W. Admin Console
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#173D34] text-[#DFBD83]"
          aria-label="Toggle admin sidebar"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#102E27] text-[#E8EDE4] border-r border-[#B58B50]/20 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Logo Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-[#173D34]">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-xs font-semibold border border-[#B58B50]/40 shadow-xs">
                N.E.W.
              </div>
              <div>
                <span className="font-serif text-sm font-medium text-white block leading-tight">
                  Nair&apos;s Epigenetics
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#DFBD83] block">
                  Admin Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Connection Status Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-[#173D34]/70 border border-[#B58B50]/20 text-[11px] flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-[#E8EDE4]/90 truncate">
              {isConnected ? "Supabase Connected" : "Local Preview Mode"}
            </span>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#173D34] text-[#DFBD83] font-semibold shadow-xs border-l-2 border-[#DFBD83]"
                      : "text-[#E8EDE4]/70 hover:bg-[#173D34]/50 hover:text-white"
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
                  Administrator
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
            className="flex items-center justify-between text-xs text-[#E8EDE4]/70 hover:text-[#DFBD83] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Events</span>
            </span>
            <span>&rarr;</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-300 text-xs font-medium transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
