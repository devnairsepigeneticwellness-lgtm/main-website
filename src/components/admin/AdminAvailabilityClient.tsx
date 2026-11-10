"use client";

import React, { useState } from "react";
import {
  Clock,
  Calendar,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Ban,
  ShieldCheck,
} from "lucide-react";
import {
  addAvailabilityException,
  deleteAvailabilityException,
  updateWeeklySchedule,
} from "@/lib/bookings/availabilityActions";
import { ConsultationAvailability, AvailabilityException } from "@/lib/supabase/types";

interface ProfessionalOption {
  id: string;
  name: string;
  designation: string;
}

interface AdminAvailabilityClientProps {
  professionals: ProfessionalOption[];
  initialAvailabilities: ConsultationAvailability[];
  initialExceptions: AvailabilityException[];
}

export default function AdminAvailabilityClient({
  professionals,
  initialAvailabilities,
  initialExceptions,
}: AdminAvailabilityClientProps) {
  const [selectedProfId, setSelectedProfId] = useState<string>(
    professionals[0]?.id || ""
  );

  const [exceptions, setExceptions] = useState<AvailabilityException[]>(initialExceptions);

  // New exception form
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("Public Holiday / Clinic Closure");
  const [blockStartTime, setBlockStartTime] = useState("");
  const [blockEndTime, setBlockEndTime] = useState("");

  // Weekly schedule state: 6 weekdays (1 = Monday through 6 = Saturday)
  const daysOfWeek = [
    { day: 1, label: "Monday" },
    { day: 2, label: "Tuesday" },
    { day: 3, label: "Wednesday" },
    { day: 4, label: "Thursday" },
    { day: 5, label: "Friday" },
    { day: 6, label: "Saturday" },
  ];

  const getDaySchedule = (dayIndex: number) => {
    return (
      initialAvailabilities.find(
        (a) => a.professional_id === selectedProfId && a.weekday === dayIndex
      ) || {
        weekday: dayIndex,
        start_time: "09:00:00",
        end_time: "18:00:00",
        consultation_duration_minutes: 50,
        is_active: true,
      }
    );
  };

  const [scheduleState, setScheduleState] = useState(
    daysOfWeek.map((d) => getDaySchedule(d.day))
  );

  const [isSaving, setIsSaving] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleScheduleChange = (
    dayIndex: number,
    field: string,
    value: any
  ) => {
    setScheduleState((prev) =>
      prev.map((item) =>
        item.weekday === dayIndex ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveSchedule = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    const result = await updateWeeklySchedule(selectedProfId, scheduleState as any);
    setIsSaving(false);

    if (result.success) {
      showNotice("Weekly consultation hours updated successfully.");
    } else {
      setErrorMessage(result.error || "Failed to update schedule.");
    }
  };

  const handleAddException = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;

    setIsSaving(true);
    setErrorMessage(null);

    const result = await addAvailabilityException({
      professional_id: selectedProfId,
      date: blockDate,
      reason: blockReason,
      start_time: blockStartTime || null,
      end_time: blockEndTime || null,
    });

    setIsSaving(false);

    if (result.success) {
      const newEx: AvailabilityException = {
        id: "exc-" + Date.now(),
        professional_id: selectedProfId,
        date: blockDate,
        reason: blockReason,
        start_time: blockStartTime || null,
        end_time: blockEndTime || null,
        created_at: new Date().toISOString(),
      };
      setExceptions((prev) => [...prev, newEx]);
      setBlockDate("");
      showNotice(`Blocked date ${blockDate} recorded.`);
    } else {
      setErrorMessage(result.error || "Failed to record holiday exception.");
    }
  };

  const handleDeleteException = async (id: string) => {
    await deleteAvailabilityException(id);
    setExceptions((prev) => prev.filter((item) => item.id !== id));
    showNotice("Blocked date removed.");
  };

  const currentProf = professionals.find((p) => p.id === selectedProfId);
  const filteredExceptions = exceptions.filter(
    (e) => e.professional_id === selectedProfId
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EDE4]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Practitioner Hours &amp; Leaves
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Availability &amp; Working Hours
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Configure weekly recurring appointment slots, consultation duration, and block holidays.
          </p>
        </div>

        {/* Professional Selector */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-[#B58B50]" />
          <select
            value={selectedProfId}
            onChange={(e) => setSelectedProfId(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs font-semibold text-[#173D34] shadow-xs focus:outline-none focus:border-[#B58B50]"
          >
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Weekly Routine Schedule */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EDE4]">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#173D34]">
              Weekly Routine Schedule — {currentProf?.name}
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Available weekdays and daily consultation windows.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveSchedule}
            disabled={isSaving}
            className="px-5 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span>Save Working Hours</span>
          </button>
        </div>

        <div className="space-y-3">
          {daysOfWeek.map((d, index) => {
            const item = scheduleState[index] || {
              weekday: d.day,
              start_time: "09:00:00",
              end_time: "18:00:00",
              consultation_duration_minutes: 50,
              is_active: true,
            };

            return (
              <div
                key={d.day}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.is_active
                    ? "bg-[#F7F5EF] border-[#B58B50]/20"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="w-32 flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={item.is_active}
                    onChange={(e) =>
                      handleScheduleChange(d.day, "is_active", e.target.checked)
                    }
                    className="w-4 h-4 rounded text-[#173D34] focus:ring-[#B58B50]"
                  />
                  <span className="text-xs font-semibold text-[#173D34]">
                    {d.label}
                  </span>
                </div>

                {item.is_active ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">From:</span>
                      <input
                        type="time"
                        value={item.start_time.slice(0, 5)}
                        onChange={(e) =>
                          handleScheduleChange(d.day, "start_time", e.target.value + ":00")
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">To:</span>
                      <input
                        type="time"
                        value={item.end_time.slice(0, 5)}
                        onChange={(e) =>
                          handleScheduleChange(d.day, "end_time", e.target.value + ":00")
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">Slot:</span>
                      <select
                        value={item.consultation_duration_minutes || 50}
                        onChange={(e) =>
                          handleScheduleChange(
                            d.day,
                            "consultation_duration_minutes",
                            Number(e.target.value)
                          )
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none"
                      >
                        <option value={45}>45 mins</option>
                        <option value={50}>50 mins (Standard)</option>
                        <option value={60}>60 mins</option>
                        <option value={90}>90 mins</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500 italic">Clinic Closed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Holiday Exceptions & Leaves */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-[#173D34]">
            Holidays &amp; Blocked Dates
          </h2>
          <p className="text-xs text-[#59675F] font-light">
            Block specific dates (e.g. personal leaves, national holidays) so no appointments can be scheduled.
          </p>
        </div>

        {/* Add Exception Form */}
        <form onSubmit={handleAddException} className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 space-y-3">
          <span className="text-xs font-semibold text-[#173D34] block">
            + Block a Specific Date / Time:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            <div className="sm:col-span-4">
              <label className="block text-[11px] text-[#59675F] mb-1">Date *</label>
              <input
                type="date"
                required
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-[11px] text-[#59675F] mb-1">Reason / Note</label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Clinical Conference / Annual Holiday"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block Date</span>
              </button>
            </div>
          </div>
        </form>

        {/* Exceptions List */}
        <div className="space-y-2">
          {filteredExceptions.length > 0 ? (
            filteredExceptions.map((ex) => (
              <div
                key={ex.id}
                className="p-3.5 rounded-xl border border-[#B58B50]/20 bg-[#FCFAF6] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700">
                    <Ban className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#173D34]">
                      {new Date(ex.date + "T00:00:00").toLocaleDateString("en-IN", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[11px] text-[#59675F] block">
                      {ex.reason || "Unavailable"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteException(ex.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#59675F] italic py-2">
              No blocked dates configured for {currentProf?.name}. All regular weekly schedule slots are open.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
