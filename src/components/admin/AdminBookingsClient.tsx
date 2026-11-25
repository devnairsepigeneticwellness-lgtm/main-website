"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Search,
  Phone,
  Mail,
  XCircle,
  Check,
  Eye,
  Loader2,
  MessageCircle,
  RotateCcw,
  CheckCircle2,
  X,
} from "lucide-react";
import { ConsultationBooking, BookingStatus } from "@/lib/supabase/types";
import { updateBookingStatus } from "@/lib/bookings/availabilityActions";
import { buildClientWhatsAppUrl } from "@/lib/admin/helpers";
import AdminNotice from "@/components/admin/AdminNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

interface AdminBookingsClientProps {
  initialBookings: ConsultationBooking[];
  professionalsList: { id: string; name: string }[];
  initialStatus?: string;
  isPreviewMode?: boolean;
}

const VALID_STATUSES = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

export default function AdminBookingsClient({
  initialBookings,
  professionalsList,
  initialStatus = "All",
  isPreviewMode = false,
}: AdminBookingsClientProps) {
  const normalizedInitial =
    VALID_STATUSES.find((s) => s.toLowerCase() === initialStatus.toLowerCase()) || "All";

  const baseId = useId();
  const detailsDialogRef = useRef<HTMLDialogElement>(null);

  const [bookings, setBookings] = useState<ConsultationBooking[]>(initialBookings);
  const [activeStatus, setActiveStatus] = useState<string>(normalizedInitial);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProf, setSelectedProf] = useState<string>("All");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [selectedBookingDetails, setSelectedBookingDetails] =
    useState<ConsultationBooking | null>(null);
  const [cancelConfirmBooking, setCancelConfirmBooking] =
    useState<ConsultationBooking | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Open/close native <dialog> for Booking Details
  useEffect(() => {
    const dialog = detailsDialogRef.current;
    if (!dialog) return;

    if (selectedBookingDetails && !dialog.open) {
      dialog.showModal();
    } else if (!selectedBookingDetails && dialog.open) {
      dialog.close();
    }
  }, [selectedBookingDetails]);

  // Safari fallback light-dismiss for native <dialog>
  useEffect(() => {
    const dialog = detailsDialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    const onDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        setSelectedBookingDetails(null);
      }
      pressedOutside = false;
    };

    dialog.addEventListener("pointerdown", onDown);
    dialog.addEventListener("pointerup", onUp);
    return () => {
      dialog.removeEventListener("pointerdown", onDown);
      dialog.removeEventListener("pointerup", onUp);
    };
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    setIsProcessing(bookingId);
    setErrorNotice(null);

    const result = await updateBookingStatus(bookingId, newStatus);
    setIsProcessing(null);

    if (!result.success) {
      setErrorNotice(result.error || "Could not update booking status. Please try again.");
      return false;
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    setSelectedBookingDetails((prev) =>
      prev && prev.id === bookingId ? { ...prev, status: newStatus } : prev
    );
    setActionNotice(`Appointment updated to "${newStatus}".`);
    return true;
  };

  const handleConfirmCancelBooking = async () => {
    if (!cancelConfirmBooking) return;
    const ok = await handleStatusChange(cancelConfirmBooking.id, "Cancelled");
    if (ok) {
      setCancelConfirmBooking(null);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (activeStatus !== "All" && b.status !== activeStatus) return false;
      if (selectedProf !== "All" && b.professional_id !== selectedProf) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRef = b.booking_reference.toLowerCase().includes(q);
        const matchName = b.client_name.toLowerCase().includes(q);
        const matchEmail = b.email.toLowerCase().includes(q);
        const matchPhone = b.phone.toLowerCase().includes(q);
        const matchService = b.service.toLowerCase().includes(q);
        if (!matchRef && !matchName && !matchEmail && !matchPhone && !matchService) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, activeStatus, selectedProf, searchQuery]);

  const getStatusBadgeColor = (status: BookingStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatBookingDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatBookingTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const buildWhatsAppLink = (b: ConsultationBooking) =>
    buildClientWhatsAppUrl(
      b.phone,
      `Hello ${b.client_name}, thank you for booking ${b.service} with Nair's Epigenetic Wellness for ${formatBookingDate(b.start_at)} at ${formatBookingTime(b.start_at)} (Ref: ${b.booking_reference}). We are reaching out regarding your appointment.`
    );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <AdminStickyHeader>
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Client Appointments
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Consultation Bookings
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Review consultation requests from the website, confirm appointments, and contact clients directly.
          </p>
        </div>

        {isPreviewMode && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold border border-amber-300">
            Showing Demo Bookings
          </span>
        )}
      </AdminStickyHeader>

      <AdminNotice type="success" message={actionNotice} onDismiss={() => setActionNotice(null)} />
      <AdminNotice type="error" message={errorNotice} onDismiss={() => setErrorNotice(null)} />

      {/* Filter & Search Bar */}
      <search className="block bg-white rounded-3xl p-4 sm:p-5 border border-[#B58B50]/20 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {VALID_STATUSES.map((tab) => {
              const count =
                tab === "All"
                  ? bookings.length
                  : bookings.filter((b) => b.status === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveStatus(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeStatus === tab
                      ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                      : "bg-[#F7F5EF] text-[#24352D]/80 hover:bg-[#E8EDE4]"
                  }`}
                >
                  <span>{tab}</span>
                  <span className="ml-1 opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div>
              <label htmlFor={`${baseId}-prof-filter`} className="sr-only">
                Filter by practitioner
              </label>
              <select
                id={`${baseId}-prof-filter`}
                value={selectedProf}
                onChange={(e) => setSelectedProf(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2 rounded-full bg-[#F7F5EF] border border-[#B58B50]/25 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
              >
                <option value="All">All Practitioners</option>
                {professionalsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <label htmlFor={`${baseId}-search`} className="sr-only">
                Search bookings by client name, phone, email, or reference number
              </label>
              <Search className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id={`${baseId}-search`}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, reference..."
                className="w-full pl-9 pr-8 py-2 rounded-full bg-[#F7F5EF] text-xs text-[#24352D] placeholder-[#59675F]/65 border border-transparent focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#59675F] hover:text-[#173D34] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </search>

      {/* Mobile Card List */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => {
            const isBusy = isProcessing === b.id;
            const waLink = buildWhatsAppLink(b);

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-4 border border-[#B58B50]/25 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-[#9E783E] block">
                      {b.booking_reference}
                    </span>
                    <h2 className="font-serif text-base font-medium text-[#173D34]">
                      {b.client_name}
                    </h2>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeColor(b.status)}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-[#59675F] space-y-1">
                  <p className="font-medium text-[#173D34]">
                    {b.service} {b.professional_name ? `with ${b.professional_name}` : ""}
                  </p>
                  <p>
                    {formatBookingDate(b.start_at)} at {formatBookingTime(b.start_at)} &bull;{" "}
                    {b.mode.replace(" (Indore Clinic)", "")}
                  </p>
                  <p>{b.phone}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8EDE4]">
                  <button
                    type="button"
                    onClick={() => setSelectedBookingDetails(b)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F7F5EF] text-[#173D34] text-xs font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  {b.status === "Pending" && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => void handleStatusChange(b.id, "Confirmed")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}

                  {b.status === "Confirmed" && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => void handleStatusChange(b.id, "Completed")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Done</span>
                    </button>
                  )}

                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#B58B50]/20 text-xs text-[#59675F] space-y-2">
            <p className="font-medium text-[#173D34]">No consultation bookings found.</p>
            <p>
              {activeStatus !== "All" || selectedProf !== "All" || searchQuery
                ? "Try clearing your search or status filter above."
                : "New client appointment requests submitted on the website will appear here."}
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-[#B58B50]/20 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#173D34] text-[#DFBD83] uppercase tracking-wider font-semibold border-b border-[#B58B50]/30 text-[11px]">
                <th className="py-4 px-5">Client</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Service &amp; Practitioner</th>
                <th className="py-4 px-4">Appointment Time</th>
                <th className="py-4 px-4">Format</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE4] text-[#24352D]">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const isBusy = isProcessing === b.id;

                  return (
                    <tr key={b.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                      {/* Client + Ref */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedBookingDetails(b)}
                          className="text-left group cursor-pointer"
                        >
                          <span className="font-medium text-sm text-[#173D34] group-hover:text-[#9E783E] transition-colors block">
                            {b.client_name}
                          </span>
                          <span className="text-[11px] text-[#59675F] block">
                            Ref: {b.booking_reference}
                          </span>
                        </button>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4 text-[#59675F] whitespace-nowrap">
                        <a
                          href={`tel:${b.phone}`}
                          className="flex items-center gap-1.5 text-[#173D34] hover:text-[#9E783E] font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>{b.phone}</span>
                        </a>
                        <a
                          href={`mailto:${b.email}`}
                          className="flex items-center gap-1.5 text-[11px] mt-0.5 hover:text-[#173D34]"
                        >
                          <Mail className="w-3 h-3 text-[#B58B50]" />
                          <span>{b.email}</span>
                        </a>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4 max-w-[200px]">
                        <span className="font-medium text-[#173D34] line-clamp-1 block">
                          {b.service}
                        </span>
                        {b.professional_name && (
                          <span className="text-[11px] text-[#59675F] block truncate">
                            {b.professional_name}
                          </span>
                        )}
                      </td>

                      {/* Scheduled Slot */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#173D34] block">
                          {formatBookingDate(b.start_at)}
                        </span>
                        <span className="text-[11px] text-[#59675F] block">
                          {formatBookingTime(b.start_at)}
                        </span>
                      </td>

                      {/* Mode */}
                      <td className="py-4 px-4 whitespace-nowrap text-[#59675F]">
                        {b.mode.replace(" (Indore Clinic)", "")}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeColor(b.status)}`}
                        >
                          {b.status}
                        </span>
                      </td>

                      {/* Labeled Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedBookingDetails(b)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] font-semibold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {b.status === "Pending" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleStatusChange(b.id, "Confirmed")}
                              className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              {isBusy ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                              <span>Confirm</span>
                            </button>
                          )}

                          {b.status === "Confirmed" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleStatusChange(b.id, "Completed")}
                              className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                            >
                              Mark Done
                            </button>
                          )}

                          {b.status === "Cancelled" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleStatusChange(b.id, "Pending")}
                              className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#173D34] text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reopen</span>
                            </button>
                          )}

                          {b.status !== "Cancelled" && b.status !== "Completed" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => setCancelConfirmBooking(b)}
                              title="Cancel Appointment"
                              aria-label={`Cancel appointment for ${b.client_name}`}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[#59675F] space-y-2">
                    <p className="font-medium text-[#173D34]">No consultation bookings found.</p>
                    <p className="text-xs">
                      {activeStatus !== "All" || selectedProf !== "All" || searchQuery
                        ? "Try clearing your search or status filter above."
                        : "When a visitor books a consultation on your website, their request will appear here."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Details Native Modal Dialog */}
      <dialog
        ref={detailsDialogRef}
        closedby="any"
        aria-labelledby={`${baseId}-details-title`}
        onCancel={(e) => {
          e.preventDefault();
          setSelectedBookingDetails(null);
        }}
        onClose={() => {
          if (detailsDialogRef.current) detailsDialogRef.current.returnValue = "";
          if (selectedBookingDetails) setSelectedBookingDetails(null);
        }}
        className="m-auto rounded-3xl p-0 bg-white max-w-lg w-[calc(100%-2rem)] border border-[#B58B50]/30 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-xs"
      >
        {selectedBookingDetails && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E8EDE4]">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B58B50] block">
                  Appointment Details
                </span>
                <h1
                  id={`${baseId}-details-title`}
                  className="font-serif text-xl font-medium text-[#173D34]"
                >
                  {selectedBookingDetails.client_name}
                </h1>
                <span className="text-xs text-[#59675F]">
                  Reference: {selectedBookingDetails.booking_reference}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadgeColor(
                    selectedBookingDetails.status
                  )}`}
                >
                  {selectedBookingDetails.status}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedBookingDetails(null)}
                  aria-label="Close appointment details"
                  className="p-1.5 rounded-full text-[#59675F] hover:bg-[#F7F5EF] hover:text-[#173D34] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#24352D]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7F5EF]">
                <div>
                  <span className="text-[#59675F] block mb-0.5">Service Requested</span>
                  <strong className="text-[#173D34]">{selectedBookingDetails.service}</strong>
                </div>
                <div>
                  <span className="text-[#59675F] block mb-0.5">Practitioner</span>
                  <strong className="text-[#173D34]">
                    {selectedBookingDetails.professional_name || "Any Available"}
                  </strong>
                </div>
                <div>
                  <span className="text-[#59675F] block mb-0.5">Date &amp; Time</span>
                  <strong className="text-[#173D34]">
                    {formatBookingDate(selectedBookingDetails.start_at)} at{" "}
                    {formatBookingTime(selectedBookingDetails.start_at)}
                  </strong>
                </div>
                <div>
                  <span className="text-[#59675F] block mb-0.5">Consultation Format</span>
                  <strong className="text-[#173D34]">{selectedBookingDetails.mode}</strong>
                </div>
              </div>

              {/* Quick Contact Row */}
              <div className="flex flex-wrap items-center gap-2">
                {buildWhatsAppLink(selectedBookingDetails) && (
                  <a
                    href={buildWhatsAppLink(selectedBookingDetails)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Message on WhatsApp</span>
                  </a>
                )}
                <a
                  href={`tel:${selectedBookingDetails.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9E783E]" />
                  <span>Call {selectedBookingDetails.phone}</span>
                </a>
                <a
                  href={`mailto:${selectedBookingDetails.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9E783E]" />
                  <span>Email Client</span>
                </a>
              </div>

              {selectedBookingDetails.message && (
                <div>
                  <span className="text-[#59675F] block mb-1">Client Notes:</span>
                  <p className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#E8EDE4] font-light leading-relaxed">
                    &ldquo;{selectedBookingDetails.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Modal Status Actions */}
            <div className="pt-4 border-t border-[#E8EDE4] flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedBookingDetails(null)}
                className="px-5 py-2.5 rounded-full border border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:bg-[#F7F5EF] cursor-pointer"
              >
                Close
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {selectedBookingDetails.status === "Pending" && (
                  <button
                    type="button"
                    disabled={isProcessing === selectedBookingDetails.id}
                    onClick={() =>
                      void handleStatusChange(selectedBookingDetails.id, "Confirmed")
                    }
                    className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Confirm Appointment
                  </button>
                )}
                {selectedBookingDetails.status === "Confirmed" && (
                  <button
                    type="button"
                    disabled={isProcessing === selectedBookingDetails.id}
                    onClick={() =>
                      void handleStatusChange(selectedBookingDetails.id, "Completed")
                    }
                    className="px-4 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Mark as Completed
                  </button>
                )}
                {selectedBookingDetails.status === "Cancelled" && (
                  <button
                    type="button"
                    disabled={isProcessing === selectedBookingDetails.id}
                    onClick={() =>
                      void handleStatusChange(selectedBookingDetails.id, "Pending")
                    }
                    className="px-4 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Reopen Booking
                  </button>
                )}
                {selectedBookingDetails.status !== "Cancelled" &&
                  selectedBookingDetails.status !== "Completed" && (
                    <button
                      type="button"
                      disabled={isProcessing === selectedBookingDetails.id}
                      onClick={() => {
                        const target = selectedBookingDetails;
                        setSelectedBookingDetails(null);
                        setCancelConfirmBooking(target);
                      }}
                      className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
              </div>
            </div>
          </div>
        )}
      </dialog>

      {/* Cancel Booking Confirmation */}
      <ConfirmDialog
        open={Boolean(cancelConfirmBooking)}
        title="Cancel This Appointment?"
        description={
          cancelConfirmBooking
            ? `Are you sure you want to cancel ${cancelConfirmBooking.client_name}'s booking on ${formatBookingDate(
                cancelConfirmBooking.start_at
              )} at ${formatBookingTime(cancelConfirmBooking.start_at)}? This frees up the time slot on your website.`
            : ""
        }
        confirmLabel="Yes, Cancel Appointment"
        cancelLabel="Keep Appointment"
        tone="danger"
        isBusy={Boolean(cancelConfirmBooking && isProcessing === cancelConfirmBooking.id)}
        onConfirm={handleConfirmCancelBooking}
        onCancel={() => setCancelConfirmBooking(null)}
      />
    </div>
  );
}
