import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  Sparkles,
  CheckCircle,
  Archive,
  FileEdit,
  Camera,
  Inbox,
  Clock,
  ArrowUpRight,
  PlusCircle,
  History,
  AlertCircle,
} from "lucide-react";
import { getDashboardStats } from "@/lib/admin/stats";
import { getPublishedEvents } from "@/lib/events/queries";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { connection } from "next/server";

export default async function AdminDashboardOverview() {
  await connection();
  const stats = await getDashboardStats();
  const recentEvents = await getPublishedEvents();
  const isConnected = isSupabaseConfigured();

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
      href: "/admin/events",
      badge: "In System",
      color: "border-[#B58B50]/30",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Sparkles,
      href: "/admin/events?filter=upcoming",
      badge: "Published",
      color: "border-emerald-500/30",
    },
    {
      title: "Completed Events",
      value: stats.completedEvents,
      icon: CheckCircle,
      href: "/admin/events?filter=completed",
      badge: "Historical",
      color: "border-blue-500/30",
    },
    {
      title: "Draft Events",
      value: stats.draftEvents,
      icon: FileEdit,
      href: "/admin/events?filter=draft",
      badge: "Unpublished",
      color: "border-amber-500/30",
    },
    {
      title: "Archived Events",
      value: stats.archivedEvents,
      icon: Archive,
      href: "/admin/events?filter=archived",
      badge: "Retained",
      color: "border-stone-500/30",
    },
    {
      title: "Gallery Photographs",
      value: stats.galleryPhotos,
      icon: Camera,
      href: "/admin/gallery",
      badge: "Storage",
      color: "border-purple-500/30",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Inbox,
      href: "/admin/bookings?status=Pending",
      badge: "Action Required",
      color: "border-amber-500/40 bg-amber-50/40",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: Clock,
      href: "/admin/bookings?status=Confirmed",
      badge: "Scheduled",
      color: "border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EDE4]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            N.E.W. Operational Command
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Upcoming Event</span>
          </Link>
          <Link
            href="/admin/events/new/previous"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#B58B50]/40 hover:border-[#B58B50] bg-white text-[#173D34] text-xs font-semibold tracking-wide transition-all"
          >
            <History className="w-3.5 h-3.5 text-[#B58B50]" />
            <span>+ Add Previous Event</span>
          </Link>
        </div>
      </div>

      {/* Supabase connection banner */}
      {!isConnected && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Local Preview Mode Active</p>
            <p className="text-amber-800/90 leading-relaxed font-light">
              Displaying local database seed data. Connect your Supabase project by adding your <code className="bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code>. Run the migration in <code className="bg-amber-100 px-1 py-0.5 rounded">supabase/migrations/</code> to create your live database tables.
            </p>
          </div>
        </div>
      )}

      {/* 8 Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-5 rounded-2xl bg-white border ${card.color} shadow-xs hover:shadow-md hover:border-[#B58B50] transition-all flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#59675F] bg-[#F7F5EF] px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
                <div className="p-2 rounded-lg bg-[#173D34]/10 text-[#173D34] group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D34] block">
                  {card.value}
                </span>
                <span className="text-xs text-[#59675F] font-medium mt-0.5 block">
                  {card.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <Link
          href="/admin/events"
          className="p-6 rounded-3xl bg-[#173D34] text-[#F7F5EF] shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#DFBD83] font-semibold uppercase tracking-wider mb-2">
              <span>Workshops &amp; Events</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-serif text-lg font-medium text-white mb-1">
              Events Management
            </h3>
            <p className="text-xs text-[#E8EDE4]/75 font-light leading-relaxed">
              Create, edit, cancel, archive or publish upcoming and historical workshops.
            </p>
          </div>
          <span className="text-xs text-[#DFBD83] font-semibold mt-4 block">
            Open Events Table &rarr;
          </span>
        </Link>

        <Link
          href="/admin/bookings"
          className="p-6 rounded-3xl bg-[#102E27] text-[#F7F5EF] shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#DFBD83] font-semibold uppercase tracking-wider mb-2">
              <span>Client Intake</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-serif text-lg font-medium text-white mb-1">
              Consultation Bookings
            </h3>
            <p className="text-xs text-[#E8EDE4]/75 font-light leading-relaxed">
              Review new client consultation requests, confirm appointments, or mark completed.
            </p>
          </div>
          <span className="text-xs text-[#DFBD83] font-semibold mt-4 block">
            Review Bookings &rarr;
          </span>
        </Link>

        <Link
          href="/admin/availability"
          className="p-6 rounded-3xl bg-white border border-[#B58B50]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#B58B50] font-semibold uppercase tracking-wider mb-2">
              <span>Calendar Rules</span>
              <ArrowUpRight className="w-4 h-4 text-[#B58B50] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#173D34] mb-1">
              Availability &amp; Slots
            </h3>
            <p className="text-xs text-[#59675F] font-light leading-relaxed">
              Configure weekly working hours, appointment durations, and block holidays.
            </p>
          </div>
          <span className="text-xs text-[#173D34] font-semibold mt-4 block">
            Manage Availability &rarr;
          </span>
        </Link>
      </div>

      {/* Recent Workshops List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8EDE4]">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#173D34]">
              Recent Events In System
            </h3>
            <p className="text-xs text-[#59675F] font-light">
              Upcoming and historical workshops currently published.
            </p>
          </div>
          <Link
            href="/admin/events"
            className="text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors"
          >
            View All ({recentEvents.length}) &rarr;
          </Link>
        </div>

        <div className="divide-y divide-[#E8EDE4]">
          {recentEvents.slice(0, 5).map((ev) => (
            <div
              key={ev.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#173D34] overflow-hidden shrink-0">
                  {ev.poster_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ev.poster_path} alt={ev.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#DFBD83] font-serif text-[10px]">
                      NEW
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={`/events/${ev.slug}`}
                    target="_blank"
                    className="font-medium text-[#173D34] hover:text-[#B58B50] transition-colors"
                  >
                    {ev.title}
                  </Link>
                  <div className="flex items-center gap-2 text-[11px] text-[#59675F] mt-0.5">
                    <span>{ev.category}</span>
                    <span>•</span>
                    <span>{ev.mode}</span>
                    <span>•</span>
                    <span>{new Date(ev.start_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Link
                  href={`/admin/events/${ev.id}/gallery`}
                  className="px-3 py-1 rounded-full bg-[#E8EDE4] text-[#173D34] text-[11px] font-medium hover:bg-[#173D34] hover:text-white transition-colors"
                >
                  Gallery ({ev.gallery_count || 0})
                </Link>
                <Link
                  href={`/admin/events/${ev.id}/edit`}
                  className="px-3 py-1 rounded-full border border-[#B58B50]/30 text-[#173D34] text-[11px] font-medium hover:border-[#B58B50] transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
