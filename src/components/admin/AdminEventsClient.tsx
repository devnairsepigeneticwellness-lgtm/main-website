"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  PlusCircle,
  History,
  Search,
  Eye,
  Edit,
  Trash2,
  Camera,
  Archive,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Event } from "@/lib/supabase/types";
import {
  togglePublishEvent,
  toggleArchiveEvent,
  toggleCancelEvent,
  deleteEvent,
} from "@/lib/events/actions";

interface AdminEventsClientProps {
  initialEvents: Event[];
}

export default function AdminEventsClient({ initialEvents }: AdminEventsClientProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [deleteModalEvent, setDeleteModalEvent] = useState<Event | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const [now, setNow] = useState<Date>(() => new Date("2026-11-09T00:00:00Z"));
  React.useEffect(() => {
    setNow(new Date());
  }, []);

  // Helper to determine status
  const getEventStatus = (ev: Event) => {
    if (ev.is_archived) return "Archived";
    if (ev.is_cancelled) return "Cancelled";
    if (!ev.is_published) return "Draft";
    if (new Date(ev.end_at) < now) return "Completed";
    return "Upcoming";
  };

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const status = getEventStatus(ev);

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchCategory = ev.category.toLowerCase().includes(q);
        const matchSpeaker = ev.speaker_name?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchCategory && !matchSpeaker) return false;
      }

      // Tab filter
      if (activeFilter === "all") return true;
      if (activeFilter === "upcoming") return status === "Upcoming";
      if (activeFilter === "completed") return status === "Completed";
      if (activeFilter === "draft") return status === "Draft";
      if (activeFilter === "cancelled") return status === "Cancelled";
      if (activeFilter === "archived") return status === "Archived";

      return true;
    });
  }, [events, activeFilter, searchQuery, now]);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Action handlers
  const handleTogglePublish = async (ev: Event) => {
    setIsProcessing(ev.id);
    const newStatus = !ev.is_published;
    await togglePublishEvent(ev.id, newStatus);
    setEvents((prev) =>
      prev.map((e) => (e.id === ev.id ? { ...e, is_published: newStatus } : e))
    );
    setIsProcessing(null);
    showNotice(newStatus ? `"${ev.title}" is now Published.` : `"${ev.title}" is now in Draft.`);
  };

  const handleToggleArchive = async (ev: Event) => {
    setIsProcessing(ev.id);
    const newStatus = !ev.is_archived;
    await toggleArchiveEvent(ev.id, newStatus);
    setEvents((prev) =>
      prev.map((e) => (e.id === ev.id ? { ...e, is_archived: newStatus } : e))
    );
    setIsProcessing(null);
    showNotice(newStatus ? `"${ev.title}" moved to Archive.` : `"${ev.title}" unarchived.`);
  };

  const handleToggleCancel = async (ev: Event) => {
    setIsProcessing(ev.id);
    const newStatus = !ev.is_cancelled;
    await toggleCancelEvent(ev.id, newStatus);
    setEvents((prev) =>
      prev.map((e) => (e.id === ev.id ? { ...e, is_cancelled: newStatus } : e))
    );
    setIsProcessing(null);
    showNotice(newStatus ? `"${ev.title}" marked as Cancelled.` : `"${ev.title}" restored.`);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalEvent) return;
    setIsProcessing(deleteModalEvent.id);
    await deleteEvent(deleteModalEvent.id);
    setEvents((prev) => prev.filter((e) => e.id !== deleteModalEvent.id));
    setIsProcessing(null);
    const title = deleteModalEvent.title;
    setDeleteModalEvent(null);
    showNotice(`Event "${title}" has been deleted.`);
  };

  const filterTabs = [
    { id: "all", label: "All Events", count: events.length },
    { id: "upcoming", label: "Upcoming", count: events.filter((e) => getEventStatus(e) === "Upcoming").length },
    { id: "completed", label: "Completed", count: events.filter((e) => getEventStatus(e) === "Completed").length },
    { id: "draft", label: "Draft", count: events.filter((e) => getEventStatus(e) === "Draft").length },
    { id: "cancelled", label: "Cancelled", count: events.filter((e) => getEventStatus(e) === "Cancelled").length },
    { id: "archived", label: "Archived", count: events.filter((e) => getEventStatus(e) === "Archived").length },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EDE4]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Workshops &amp; Events
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Events Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Upcoming Event</span>
          </Link>
          <Link
            href="/admin/events/new/previous"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#B58B50]/40 hover:border-[#B58B50] bg-white text-[#173D34] text-xs font-semibold tracking-wide transition-all"
          >
            <History className="w-3.5 h-3.5 text-[#B58B50]" />
            <span>+ Add Previous Event</span>
          </Link>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#B58B50]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === tab.id
                  ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                  : "bg-[#F7F5EF] text-[#24352D]/80 hover:bg-[#E8EDE4]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F7F5EF] text-xs text-[#24352D] placeholder-[#59675F]/60 border border-transparent focus:border-[#B58B50] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-3xl border border-[#B58B50]/20 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#173D34] text-[#DFBD83] uppercase tracking-wider font-semibold border-b border-[#B58B50]/30 text-[11px]">
                <th className="py-4 px-4 sm:px-6">Poster</th>
                <th className="py-4 px-4">Event Title</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Category / Mode</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Photos</th>
                <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE4] text-[#24352D]">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((ev) => {
                  const status = getEventStatus(ev);
                  const isBusy = isProcessing === ev.id;

                  const statusBadgeColor = () => {
                    switch (status) {
                      case "Upcoming":
                        return "bg-emerald-100 text-emerald-800 border-emerald-300";
                      case "Completed":
                        return "bg-blue-100 text-blue-800 border-blue-300";
                      case "Draft":
                        return "bg-amber-100 text-amber-800 border-amber-300";
                      case "Cancelled":
                        return "bg-red-100 text-red-800 border-red-300";
                      case "Archived":
                        return "bg-stone-100 text-stone-700 border-stone-300";
                      default:
                        return "bg-gray-100 text-gray-800";
                    }
                  };

                  return (
                    <tr key={ev.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                      {/* Poster */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="w-12 h-12 rounded-xl bg-[#173D34] overflow-hidden shrink-0 border border-[#B58B50]/30">
                          {ev.poster_path ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={ev.poster_path}
                              alt={ev.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#DFBD83] font-serif text-[10px]">
                              NEW
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4 font-medium max-w-xs">
                        <span className="font-serif text-sm text-[#173D34] line-clamp-1 block">
                          {ev.title}
                        </span>
                        <span className="text-[11px] text-[#59675F] font-mono block">
                          /events/{ev.slug}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#59675F]">
                        <div className="flex items-center gap-1.5 font-medium text-[#173D34]">
                          <Calendar className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>
                            {new Date(ev.start_at).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#59675F] block">
                          {new Date(ev.start_at).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </td>

                      {/* Category / Mode */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#173D34] block">{ev.category}</span>
                        <span className="text-[11px] text-[#59675F] block">{ev.mode}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadgeColor()}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Photo Count */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <Link
                          href={`/admin/events/${ev.id}/gallery`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8EDE4] hover:bg-[#173D34] hover:text-white transition-colors text-[11px] font-semibold text-[#173D34]"
                        >
                          <Camera className="w-3 h-3 text-[#B58B50]" />
                          <span>{ev.gallery_count || 0}</span>
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View public */}
                          <Link
                            href={`/events/${ev.slug}`}
                            target="_blank"
                            title="View Public Event Page"
                            className="p-1.5 rounded-lg text-[#173D34] hover:bg-[#E8EDE4] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/admin/events/${ev.id}/edit`}
                            title="Edit Event"
                            className="p-1.5 rounded-lg text-[#173D34] hover:bg-[#E8EDE4] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          {/* Gallery Photos */}
                          <Link
                            href={`/admin/events/${ev.id}/gallery`}
                            title="Upload / Manage Photos"
                            className="p-1.5 rounded-lg text-[#173D34] hover:bg-[#E8EDE4] transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                          </Link>

                          {/* Toggle Publish */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleTogglePublish(ev)}
                            title={ev.is_published ? "Unpublish (Save Draft)" : "Publish Event"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              ev.is_published
                                ? "text-emerald-700 hover:bg-emerald-100"
                                : "text-amber-700 hover:bg-amber-100"
                            }`}
                          >
                            {isBusy ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>

                          {/* Cancel */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleToggleCancel(ev)}
                            title={ev.is_cancelled ? "Restore Event" : "Cancel Event"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              ev.is_cancelled
                                ? "text-red-700 bg-red-100"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            <Ban className="w-4 h-4" />
                          </button>

                          {/* Archive */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleToggleArchive(ev)}
                            title={ev.is_archived ? "Unarchive" : "Archive Event"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              ev.is_archived
                                ? "text-stone-800 bg-stone-200"
                                : "text-stone-500 hover:bg-stone-100"
                            }`}
                          >
                            <Archive className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteModalEvent(ev)}
                            title="Delete Event"
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#59675F]">
                    No events match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-medium text-[#173D34]">
                Confirm Permanent Deletion
              </h3>
              <p className="text-xs text-[#59675F] mt-2 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <strong className="text-[#173D34]">{deleteModalEvent.title}</strong>? All associated gallery photographs and records will be deleted. This cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalEvent(null)}
                className="w-1/2 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-[#173D34] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-1/2 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
