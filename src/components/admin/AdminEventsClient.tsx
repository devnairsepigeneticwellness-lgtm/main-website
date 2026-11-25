"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  PlusCircle,
  History,
  Search,
  Edit,
  Trash2,
  Camera,
  Archive,
  Ban,
  CheckCircle2,
  EyeOff,
  Loader2,
  ExternalLink,
  X,
} from "lucide-react";
import { Event } from "@/lib/supabase/types";
import {
  togglePublishEvent,
  toggleArchiveEvent,
  toggleCancelEvent,
  deleteEvent,
} from "@/lib/events/actions";
import AdminNotice from "@/components/admin/AdminNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

interface AdminEventsClientProps {
  initialEvents: Event[];
  initialFilter?: string;
  serverNowIso?: string;
}

type ConfirmActionState =
  | { type: "delete"; event: Event }
  | { type: "cancel"; event: Event }
  | { type: "archive"; event: Event }
  | null;

const VALID_FILTERS = ["all", "upcoming", "completed", "draft", "cancelled", "archived"];

function computeStatus(ev: Event, now: Date): string {
  if (ev.is_archived) return "Archived";
  if (ev.is_cancelled) return "Cancelled";
  if (!ev.is_published) return "Draft";
  if (new Date(ev.end_at) < now) return "Completed";
  return "Upcoming";
}

export default function AdminEventsClient({
  initialEvents,
  initialFilter = "all",
  serverNowIso,
}: AdminEventsClientProps) {
  const normalizedInitial = VALID_FILTERS.includes(initialFilter.toLowerCase())
    ? initialFilter.toLowerCase()
    : "all";

  const searchInputId = useId();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [activeFilter, setActiveFilter] = useState<string>(normalizedInitial);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmActionState>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const now = useMemo(
    () => (serverNowIso ? new Date(serverNowIso) : new Date()),
    [serverNowIso]
  );

  const getEventStatus = (ev: Event) => computeStatus(ev, now);

  const getStatusBadgeClasses = (status: string) => {
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

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const status = computeStatus(ev, now);

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchCategory = ev.category.toLowerCase().includes(q);
        const matchSpeaker = ev.speaker_name?.toLowerCase().includes(q) || false;
        const matchVenue = ev.venue?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchCategory && !matchSpeaker && !matchVenue) return false;
      }

      if (activeFilter === "all") return true;
      if (activeFilter === "upcoming") return status === "Upcoming";
      if (activeFilter === "completed") return status === "Completed";
      if (activeFilter === "draft") return status === "Draft";
      if (activeFilter === "cancelled") return status === "Cancelled";
      if (activeFilter === "archived") return status === "Archived";

      return true;
    });
  }, [events, activeFilter, searchQuery, now]);

  const showSuccess = (msg: string) => {
    setErrorNotice(null);
    setActionNotice(msg);
  };

  const handleTogglePublish = async (ev: Event) => {
    setIsProcessing(ev.id);
    setErrorNotice(null);
    const newStatus = !ev.is_published;
    const res = await togglePublishEvent(ev.id, newStatus);
    setIsProcessing(null);

    if (!res.success) {
      setErrorNotice(res.error || "Could not update event visibility. Please try again.");
      return;
    }

    setEvents((prev) =>
      prev.map((e) => (e.id === ev.id ? { ...e, is_published: newStatus } : e))
    );
    showSuccess(
      newStatus
        ? `"${ev.title}" is now visible on the public website.`
        : `"${ev.title}" moved to Drafts (hidden from the public website).`
    );
  };

  const handleConfirmedAction = async () => {
    if (!confirmAction) return;
    const { type, event } = confirmAction;
    setIsProcessing(event.id);
    setErrorNotice(null);

    if (type === "delete") {
      const res = await deleteEvent(event.id);
      setIsProcessing(null);
      if (!res.success) {
        setErrorNotice(res.error || "Could not delete the event. Please try again.");
        setConfirmAction(null);
        return;
      }
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      setConfirmAction(null);
      showSuccess(`"${event.title}" has been permanently deleted.`);
      return;
    }

    if (type === "cancel") {
      const nextCancelled = !event.is_cancelled;
      const res = await toggleCancelEvent(event.id, nextCancelled);
      setIsProcessing(null);
      if (!res.success) {
        setErrorNotice(res.error || "Could not update event status. Please try again.");
        setConfirmAction(null);
        return;
      }
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, is_cancelled: nextCancelled } : e))
      );
      setConfirmAction(null);
      showSuccess(
        nextCancelled
          ? `"${event.title}" marked as Cancelled.`
          : `"${event.title}" has been restored.`
      );
      return;
    }

    if (type === "archive") {
      const nextArchived = !event.is_archived;
      const res = await toggleArchiveEvent(event.id, nextArchived);
      setIsProcessing(null);
      if (!res.success) {
        setErrorNotice(res.error || "Could not archive the event. Please try again.");
        setConfirmAction(null);
        return;
      }
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, is_archived: nextArchived } : e))
      );
      setConfirmAction(null);
      showSuccess(
        nextArchived
          ? `"${event.title}" moved to Archive (hidden from public pages).`
          : `"${event.title}" restored from Archive.`
      );
    }
  };

  const filterTabs = [
    { id: "all", label: "All", count: events.length },
    { id: "upcoming", label: "Upcoming", count: events.filter((e) => getEventStatus(e) === "Upcoming").length },
    { id: "completed", label: "Past / Completed", count: events.filter((e) => getEventStatus(e) === "Completed").length },
    { id: "draft", label: "Drafts", count: events.filter((e) => getEventStatus(e) === "Draft").length },
    { id: "cancelled", label: "Cancelled", count: events.filter((e) => getEventStatus(e) === "Cancelled").length },
    { id: "archived", label: "Archived", count: events.filter((e) => getEventStatus(e) === "Archived").length },
  ];

  const getDialogProps = () => {
    if (!confirmAction) return null;
    const { type, event } = confirmAction;

    if (type === "delete") {
      return {
        title: "Delete Event Permanently?",
        description: `Are you sure you want to delete "${event.title}"? Its details and all uploaded gallery photos will be permanently removed and cannot be recovered.`,
        confirmLabel: "Yes, Delete Permanently",
        tone: "danger" as const,
      };
    }

    if (type === "cancel") {
      return event.is_cancelled
        ? {
            title: "Restore Cancelled Event?",
            description: `"${event.title}" will be restored as an active event on the website.`,
            confirmLabel: "Restore Event",
            tone: "default" as const,
          }
        : {
            title: "Mark Event as Cancelled?",
            description: `Visitors on the public website will see a Cancelled notice for "${event.title}" instead of a registration button. You can restore it later if needed.`,
            confirmLabel: "Mark as Cancelled",
            tone: "warning" as const,
          };
    }

    return event.is_archived
      ? {
          title: "Restore From Archive?",
          description: `"${event.title}" will move back into active listings (if published).`,
          confirmLabel: "Restore Event",
          tone: "default" as const,
        }
      : {
          title: "Archive This Event?",
          description: `"${event.title}" will be hidden from the public Events page while keeping all details and gallery photos safely stored.`,
          confirmLabel: "Move to Archive",
          tone: "warning" as const,
        };
  };

  const dialogProps = getDialogProps();

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <AdminStickyHeader>
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Events &amp; Workshops
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Manage Workshops &amp; Events
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Publish upcoming workshops, edit event details, or upload photos from past events.
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

      <AdminNotice type="success" message={actionNotice} onDismiss={() => setActionNotice(null)} />
      <AdminNotice type="error" message={errorNotice} onDismiss={() => setErrorNotice(null)} />

      {/* Filters & Search Bar */}
      <search className="block bg-white rounded-3xl p-4 sm:p-5 border border-[#B58B50]/20 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                    : "bg-[#F7F5EF] text-[#24352D]/80 hover:bg-[#E8EDE4]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor={searchInputId} className="sr-only">
              Search events by title, category, speaker, or venue
            </label>
            <Search className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={searchInputId}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, category, speaker..."
              className="w-full pl-9 pr-8 py-2 rounded-full bg-[#F7F5EF] text-xs text-[#24352D] placeholder-[#59675F]/65 border border-transparent focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#59675F] hover:text-[#173D34] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </search>

      {/* Mobile Cards View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => {
            const status = getEventStatus(ev);
            const isBusy = isProcessing === ev.id;
            return (
              <div
                key={ev.id}
                className="bg-white rounded-2xl p-4 border border-[#B58B50]/25 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#173D34] overflow-hidden shrink-0 border border-[#B58B50]/30">
                    {ev.poster_path ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ev.poster_path} alt={ev.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#DFBD83] font-serif text-[10px]">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-serif text-base font-medium text-[#173D34] leading-snug">
                        {ev.title}
                      </h2>
                      <span
                        className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClasses(status)}`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-xs text-[#59675F]">
                      {new Date(ev.start_at).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      &bull; {ev.category} ({ev.mode})
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8EDE4]">
                  <Link
                    href={`/admin/events/${ev.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#173D34] text-white text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#DFBD83]" />
                    <span>Edit</span>
                  </Link>
                  <Link
                    href={`/admin/events/${ev.id}/gallery`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#9E783E]" />
                    <span>Photos ({ev.gallery_count || 0})</span>
                  </Link>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleTogglePublish(ev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B58B50]/35 text-xs font-medium text-[#173D34] cursor-pointer disabled:opacity-50"
                  >
                    {ev.is_published ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setConfirmAction({ type: "cancel", event: ev })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-stone-300 text-xs text-[#59675F] cursor-pointer"
                  >
                    {ev.is_cancelled ? "Restore" : "Cancel"}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setConfirmAction({ type: "delete", event: ev })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-medium cursor-pointer ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#B58B50]/20 text-xs text-[#59675F] space-y-3">
            <p>No workshops or events match your current filter.</p>
            {(activeFilter !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-full bg-[#E8EDE4] text-[#173D34] font-semibold cursor-pointer"
              >
                Show All Events
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-3xl border border-[#B58B50]/20 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#173D34] text-[#DFBD83] uppercase tracking-wider font-semibold border-b border-[#B58B50]/30 text-[11px]">
                <th className="py-4 px-5">Event</th>
                <th className="py-4 px-4">Date &amp; Time</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Gallery</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE4] text-[#24352D]">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((ev) => {
                  const status = getEventStatus(ev);
                  const isBusy = isProcessing === ev.id;

                  return (
                    <tr key={ev.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                      {/* Poster + Title */}
                      <td className="py-4 px-5 max-w-sm">
                        <div className="flex items-center gap-3.5">
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
                          <div className="min-w-0">
                            <Link
                              href={`/admin/events/${ev.id}/edit`}
                              className="font-serif text-sm font-medium text-[#173D34] hover:text-[#B58B50] transition-colors line-clamp-1 block"
                            >
                              {ev.title}
                            </Link>
                            <span className="text-[11px] text-[#59675F] line-clamp-1 block mt-0.5">
                              {ev.venue || ev.speaker_name || "Clinic Event"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-[#59675F]">
                        <div className="flex items-center gap-1.5 font-medium text-[#173D34]">
                          <Calendar className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>
                            {new Date(ev.start_at).toLocaleDateString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#59675F] block">
                          {new Date(ev.start_at).toLocaleTimeString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </td>

                      {/* Category / Mode */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#173D34] block">{ev.category}</span>
                        <span className="text-[11px] text-[#59675F] block">{ev.mode}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClasses(status)}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Photo Count */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <Link
                          href={`/admin/events/${ev.id}/gallery`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8EDE4] hover:bg-[#173D34] hover:text-white transition-colors text-[11px] font-semibold text-[#173D34]"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>Photos ({ev.gallery_count || 0})</span>
                        </Link>
                      </td>

                      {/* Clear Labeled Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/events/${ev.id}/edit`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] font-semibold transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleTogglePublish(ev)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 ${
                              ev.is_published
                                ? "bg-amber-50 hover:bg-amber-100 text-amber-800"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {isBusy ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : ev.is_published ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>{ev.is_published ? "Hide" : "Publish"}</span>
                          </button>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setConfirmAction({ type: "cancel", event: ev })}
                            title={ev.is_cancelled ? "Restore event" : "Mark event as cancelled"}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 ${
                              ev.is_cancelled
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "hover:bg-stone-100 text-[#59675F]"
                            }`}
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>{ev.is_cancelled ? "Restore" : "Cancel"}</span>
                          </button>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setConfirmAction({ type: "archive", event: ev })}
                            title={ev.is_archived ? "Unarchive event" : "Archive event"}
                            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50"
                            aria-label={ev.is_archived ? "Unarchive event" : "Archive event"}
                          >
                            <Archive className="w-4 h-4" />
                          </button>

                          <Link
                            href={`/events/${ev.slug}`}
                            target="_blank"
                            title="Open public page in new tab"
                            aria-label={`View ${ev.title} on public website`}
                            className="p-1.5 rounded-lg text-[#173D34] hover:bg-[#E8EDE4] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setConfirmAction({ type: "delete", event: ev })}
                            title="Delete permanently"
                            aria-label={`Delete ${ev.title}`}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
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
                  <td colSpan={6} className="py-12 text-center text-[#59675F] space-y-2">
                    <p>No workshops or events match your current filter.</p>
                    {(activeFilter !== "all" || searchQuery) && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveFilter("all");
                          setSearchQuery("");
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] font-semibold text-xs cursor-pointer"
                      >
                        Show All Events
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(confirmAction)}
        title={dialogProps?.title || ""}
        description={dialogProps?.description || ""}
        confirmLabel={dialogProps?.confirmLabel || "Confirm"}
        tone={dialogProps?.tone || "danger"}
        isBusy={Boolean(confirmAction && isProcessing === confirmAction.event.id)}
        onConfirm={handleConfirmedAction}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
