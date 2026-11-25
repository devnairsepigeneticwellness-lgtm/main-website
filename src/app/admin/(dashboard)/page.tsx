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
  BellRing,
} from "lucide-react";
import { getDashboardStats } from "@/lib/admin/stats";
import { getAllAdminEvents, computeEventStatus } from "@/lib/events/queries";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { connection } from "next/server";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

export default async function AdminDashboardOverview() {
  await connection();
  const [stats, allEvents] = await Promise.all([
    getDashboardStats(),
    getAllAdminEvents(),
  ]);
  const isConnected = isSupabaseConfigured();

  const statCards = [
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Inbox,
      href: "/admin/bookings?status=Pending",
      badge: stats.pendingBookings > 0 ? "Needs Review" : "All Caught Up",
      color:
        stats.pendingBookings > 0
          ? "border-amber-400 bg-amber-50/50"
          : "border-[#B58B50]/30",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: Clock,
      href: "/admin/bookings?status=Confirmed",
      badge: "Scheduled",
      color: "border-emerald-500/30",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Sparkles,
      href: "/admin/events?filter=upcoming",
      badge: "Live on Site",
      color: "border-emerald-500/30",
    },
    {
      title: "Hidden Drafts",
      value: stats.draftEvents,
      icon: FileEdit,
      href: "/admin/events?filter=draft",
      badge: "Not Public",
      color: "border-amber-500/30",
    },
    {
      title: "Completed Events",
      value: stats.completedEvents,
      icon: CheckCircle,
      href: "/admin/events?filter=completed",
      badge: "Past Archive",
      color: "border-blue-500/30",
    },
    {
      title: "Gallery Photos",
      value: stats.galleryPhotos,
      icon: Camera,
      href: "/admin/gallery",
      badge: "Uploaded",
      color: "border-purple-500/30",
    },
    {
      title: "Archived Events",
      value: stats.archivedEvents,
      icon: Archive,
      href: "/admin/events?filter=archived",
      badge: "Archived",
      color: "border-stone-400/40",
    },
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
      href: "/admin/events",
      badge: "All Time",
      color: "border-[#B58B50]/30",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <AdminStickyHeader>
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Nair&apos;s Epigenetic Wellness
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Clinic Dashboard
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Manage your upcoming workshops, past event photos, client appointments, and clinic schedule.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Upcoming Event</span>
          </Link>
          <Link
            href="/admin/events/new/previous"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#B58B50]/40 hover:border-[#B58B50] bg-white text-[#173D34] text-xs font-semibold tracking-wide transition-all"
          >
            <History className="w-3.5 h-3.5 text-[#B58B50]" />
            <span>Add Past Event</span>
          </Link>
        </div>
      </AdminStickyHeader>

      {/* Attention Banner for Pending Bookings */}
      {stats.pendingBookings > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold">
                {stats.pendingBookings} new consultation {stats.pendingBookings === 1 ? "request awaits" : "requests await"} your confirmation
              </p>
              <p className="text-xs text-amber-800 font-light">
                Review client details and confirm or follow up via WhatsApp or email.
              </p>
            </div>
          </div>
          <Link
            href="/admin/bookings?status=Pending"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <span>Review Pending Bookings</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
          </Link>
        </div>
      )}

      {/* Demo Preview Mode Banner (only shown if backend is not yet connected) */}
      {!isConnected && (
        <div className="p-4 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] text-xs text-[#24352D] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#9E783E] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#173D34]">Demo Preview Mode</p>
            <p className="text-[#59675F] leading-relaxed font-light">
              You are viewing sample clinic data. Changes you test here will reset when the page reloads because the live website database is not connected on this environment.
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
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#59675F] bg-[#F7F5EF] px-2 py-0.5 rounded-full truncate">
                  {card.badge}
                </span>
                <div className="p-2 rounded-lg bg-[#173D34]/10 text-[#173D34] group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors shrink-0">
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

      {/* Quick Access Action Cards */}
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
            <h2 className="font-serif text-lg font-medium text-white mb-1">
              Manage Events &amp; Photos
            </h2>
            <p className="text-xs text-[#E8EDE4]/80 font-light leading-relaxed">
              Add new workshops, edit details, upload event photos, or save drafts.
            </p>
          </div>
          <span className="text-xs text-[#DFBD83] font-semibold mt-4 block">
            Open Events &rarr;
          </span>
        </Link>

        <Link
          href="/admin/bookings"
          className="p-6 rounded-3xl bg-[#102E27] text-[#F7F5EF] shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#DFBD83] font-semibold uppercase tracking-wider mb-2">
              <span>Appointments</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h2 className="font-serif text-lg font-medium text-white mb-1">
              Client Bookings
            </h2>
            <p className="text-xs text-[#E8EDE4]/80 font-light leading-relaxed">
              View consultation requests, confirm times, and message or call clients.
            </p>
          </div>
          <span className="text-xs text-[#DFBD83] font-semibold mt-4 block">
            Open Bookings &rarr;
          </span>
        </Link>

        <Link
          href="/admin/availability"
          className="p-6 rounded-3xl bg-white border border-[#B58B50]/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#B58B50] font-semibold uppercase tracking-wider mb-2">
              <span>Schedule</span>
              <ArrowUpRight className="w-4 h-4 text-[#B58B50] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h2 className="font-serif text-lg font-medium text-[#173D34] mb-1">
              Clinic Hours &amp; Holidays
            </h2>
            <p className="text-xs text-[#59675F] font-light leading-relaxed">
              Set each practitioner&apos;s weekly working hours and block leave dates.
            </p>
          </div>
          <span className="text-xs text-[#173D34] font-semibold mt-4 block">
            Manage Hours &rarr;
          </span>
        </Link>
      </div>

      {/* Recent Events List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8EDE4]">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-medium text-[#173D34]">
              Recent Workshops &amp; Events
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Quick links to update details or upload photos.
            </p>
          </div>
          <Link
            href="/admin/events"
            className="text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors"
          >
            View All ({allEvents.length}) &rarr;
          </Link>
        </div>

        {allEvents.length > 0 ? (
          <div className="divide-y divide-[#E8EDE4]">
            {allEvents.slice(0, 5).map((ev) => {
              const status = computeEventStatus(ev);
              return (
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
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/events/${ev.id}/edit`}
                          className="font-medium text-[#173D34] hover:text-[#B58B50] transition-colors"
                        >
                          {ev.title}
                        </Link>
                        <span className="px-2 py-0.5 rounded-full bg-[#F7F5EF] text-[#59675F] text-[10px] font-semibold">
                          {status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#59675F] mt-0.5">
                        <span>{ev.category}</span>
                        <span>&bull;</span>
                        <span>{ev.mode}</span>
                        <span>&bull;</span>
                        <span>
                          {new Date(ev.start_at).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Link
                      href={`/admin/events/${ev.id}/gallery`}
                      className="px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-[11px] font-semibold hover:bg-[#173D34] hover:text-white transition-colors"
                    >
                      Photos ({ev.gallery_count || 0})
                    </Link>
                    <Link
                      href={`/admin/events/${ev.id}/edit`}
                      className="px-3.5 py-1.5 rounded-full border border-[#B58B50]/35 text-[#173D34] text-[11px] font-semibold hover:border-[#B58B50] transition-colors"
                    >
                      Edit Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center space-y-3">
            <p className="text-xs text-[#59675F]">No workshops or events have been added yet.</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173D34] text-white text-xs font-semibold"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>Create Your First Event</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
