"use client";

import React, { useState, useMemo } from "react";
import {
  Inbox,
  Search,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  Check,
  AlertCircle,
  Eye,
  Loader2,
  User,
  Filter,
} from "lucide-react";
import { ConsultationBooking, BookingStatus } from "@/lib/supabase/types";
import { updateBookingStatus } from "@/lib/bookings/availabilityActions";

interface AdminBookingsClientProps {
  initialBookings: ConsultationBooking[];
  professionalsList: { id: string; name: string }[];
}

export default function AdminBookingsClient({
  initialBookings,
  professionalsList,
}: AdminBookingsClientProps) {
  const [bookings, setBookings] = useState<ConsultationBooking[]>(initialBookings);
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProf, setSelectedProf] = useState<string>("All");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<ConsultationBooking | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    setIsProcessing(bookingId);
    await updateBookingStatus(bookingId, newStatus);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBookingDetails && selectedBookingDetails.id === bookingId) {
      setSelectedBookingDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setIsProcessing(null);
    showNotice(`Booking status updated to "${newStatus}".`);
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (activeStatus !== "All" && b.status !== activeStatus) return false;

      // Professional filter
      if (selectedProf !== "All" && b.professional_id !== selectedProf) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRef = b.booking_reference.toLowerCase().includes(q);
        const matchName = b.client_name.toLowerCase().includes(q);
        const matchEmail = b.email.toLowerCase().includes(q);
        const matchPhone = b.phone.toLowerCase().includes(q);
        const matchService = b.service.toLowerCase().includes(q);
        if (!matchRef && !matchName && !matchEmail && !matchPhone && !matchService) return false;
      }

      return true;
    });
  }, [bookings, activeStatus, selectedProf, searchQuery]);

  const statusTabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EDE4]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Client Appointments &amp; Intake
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Consultation Bookings
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Review incoming requests from the public booking engine, confirm time slots, and manage client communications.
          </p>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#B58B50]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statusTabs.map((tab) => {
            const count =
              tab === "All"
                ? bookings.length
                : bookings.filter((b) => b.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveStatus(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeStatus === tab
                    ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                    : "bg-[#F7F5EF] text-[#24352D]/80 hover:bg-[#E8EDE4]"
                }`}
              >
                <span>{tab}</span>
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Professional Dropdown & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProf}
            onChange={(e) => setSelectedProf(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-full bg-[#F7F5EF] border border-[#B58B50]/20 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
          >
            <option value="All">All Professionals</option>
            {professionalsList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, client..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F7F5EF] text-xs text-[#24352D] placeholder-[#59675F]/60 border border-transparent focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-[#B58B50]/20 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#173D34] text-[#DFBD83] uppercase tracking-wider font-semibold border-b border-[#B58B50]/30 text-[11px]">
                <th className="py-4 px-4 sm:px-6">Reference</th>
                <th className="py-4 px-4">Client Name</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Service</th>
                <th className="py-4 px-4">Scheduled Slot</th>
                <th className="py-4 px-4">Mode</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE4] text-[#24352D]">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const startDate = new Date(b.start_at);
                  const isBusy = isProcessing === b.id;

                  const statusColor = () => {
                    switch (b.status) {
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

                  return (
                    <tr key={b.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                      {/* Reference */}
                      <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#173D34] whitespace-nowrap">
                        {b.booking_reference}
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4 font-medium text-[#173D34] whitespace-nowrap">
                        {b.client_name}
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 text-[#59675F] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>{b.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-[#B58B50]" />
                          <span>{b.phone}</span>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <span className="font-medium text-[#173D34] line-clamp-1">
                          {b.service}
                        </span>
                        {b.professional_name && (
                          <span className="text-[11px] text-[#59675F] block truncate">
                            {b.professional_name}
                          </span>
                        )}
                      </td>

                      {/* Scheduled Slot */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#173D34] block">
                          {startDate.toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[11px] text-[#59675F] block">
                          {startDate.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </td>

                      {/* Mode */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#59675F]">
                        {b.mode.replace(" (Indore Clinic)", "")}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor()}`}
                        >
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => setSelectedBookingDetails(b)}
                            title="View Full Booking Details"
                            className="p-1.5 rounded-lg text-[#173D34] hover:bg-[#E8EDE4] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Confirm Button */}
                          {b.status === "Pending" && (
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusChange(b.id, "Confirmed")}
                              title="Confirm Booking"
                              className="px-2.5 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-semibold transition-colors flex items-center gap-1"
                            >
                              {isBusy ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              <span>Confirm</span>
                            </button>
                          )}

                          {/* Complete Button */}
                          {b.status === "Confirmed" && (
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusChange(b.id, "Completed")}
                              title="Mark Session Completed"
                              className="px-2.5 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 text-[11px] font-semibold transition-colors"
                            >
                              Completed
                            </button>
                          )}

                          {/* Cancel Button */}
                          {b.status !== "Cancelled" && b.status !== "Completed" && (
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusChange(b.id, "Cancelled")}
                              title="Cancel Booking"
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
                  <td colSpan={8} className="py-12 text-center text-[#59675F]">
                    No consultation bookings match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#B58B50]/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EDE4]">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B58B50] block">
                  Consultation Request Dossier
                </span>
                <h3 className="font-serif text-xl font-medium text-[#173D34]">
                  {selectedBookingDetails.booking_reference}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#173D34] border border-[#B58B50]/30">
                {selectedBookingDetails.status}
              </span>
            </div>

            <div className="space-y-3 text-xs text-[#24352D]">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7F5EF]">
                <div>
                  <span className="text-[#59675F] block">Client Name</span>
                  <strong className="text-sm font-serif text-[#173D34]">
                    {selectedBookingDetails.client_name}
                  </strong>
                </div>
                <div>
                  <span className="text-[#59675F] block">Service</span>
                  <strong className="text-[#173D34]">{selectedBookingDetails.service}</strong>
                </div>
                <div>
                  <span className="text-[#59675F] block">Email</span>
                  <a href={`mailto:${selectedBookingDetails.email}`} className="text-[#B58B50] underline">
                    {selectedBookingDetails.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#59675F] block">Phone / WhatsApp</span>
                  <a href={`tel:${selectedBookingDetails.phone}`} className="text-[#B58B50] underline">
                    {selectedBookingDetails.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[#59675F] block">Scheduled Window:</span>
                <p className="font-medium text-[#173D34]">
                  {new Date(selectedBookingDetails.start_at).toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(selectedBookingDetails.start_at).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              {selectedBookingDetails.message && (
                <div>
                  <span className="text-[#59675F] block mb-1">Client Message / Context:</span>
                  <p className="p-3 rounded-xl bg-[#F7F5EF] border border-[#E8EDE4] font-light italic leading-relaxed">
                    &ldquo;{selectedBookingDetails.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E8EDE4] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedBookingDetails(null)}
                className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-[#173D34] hover:bg-gray-100"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedBookingDetails.status === "Pending" && (
                  <button
                    onClick={() => handleStatusChange(selectedBookingDetails.id, "Confirmed")}
                    className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs"
                  >
                    Confirm Appointment
                  </button>
                )}
                {selectedBookingDetails.status !== "Cancelled" && (
                  <button
                    onClick={() => handleStatusChange(selectedBookingDetails.id, "Cancelled")}
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
