"use client";

import React, { useId, useState } from "react";
import {
  User,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  Ban,
  Copy,
} from "lucide-react";
import {
  addAvailabilityException,
  deleteAvailabilityException,
  updateWeeklySchedule,
} from "@/lib/bookings/availabilityActions";
import { ConsultationAvailability, AvailabilityException } from "@/lib/supabase/types";
import AdminNotice from "@/components/admin/AdminNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

interface ProfessionalOption {
  id: string;
  name: string;
  designation: string;
}

interface DayScheduleItem {
  weekday: number;
  start_time: string;
  end_time: string;
  consultation_duration_minutes: number;
  is_active: boolean;
}

interface AdminAvailabilityClientProps {
  professionals: ProfessionalOption[];
  initialAvailabilities: ConsultationAvailability[];
  initialExceptions: AvailabilityException[];
}

const DAYS_OF_WEEK = [
  { day: 1, label: "Monday" },
  { day: 2, label: "Tuesday" },
  { day: 3, label: "Wednesday" },
  { day: 4, label: "Thursday" },
  { day: 5, label: "Friday" },
  { day: 6, label: "Saturday" },
  { day: 0, label: "Sunday" },
];

function buildScheduleForProfessional(
  profId: string,
  availabilities: ConsultationAvailability[]
): DayScheduleItem[] {
  return DAYS_OF_WEEK.map((d) => {
    const existing = availabilities.find(
      (a) => a.professional_id === profId && a.weekday === d.day
    );
    if (existing) {
      return {
        weekday: d.day,
        start_time: existing.start_time,
        end_time: existing.end_time,
        consultation_duration_minutes: existing.consultation_duration_minutes || 50,
        is_active: existing.is_active,
      };
    }
    return {
      weekday: d.day,
      start_time: "09:00:00",
      end_time: "18:00:00",
      consultation_duration_minutes: 50,
      is_active: d.day !== 0, // Mon–Sat open by default, Sunday closed
    };
  });
}

function format12HourTime(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(":");
  const h = Number(hStr);
  const m = Number(mStr || "0");
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function AdminAvailabilityClient({
  professionals,
  initialAvailabilities,
  initialExceptions,
}: AdminAvailabilityClientProps) {
  const baseId = useId();
  const defaultProfId = professionals[0]?.id || "";

  const [selectedProfId, setSelectedProfId] = useState<string>(defaultProfId);
  const [savedAvailabilities, setSavedAvailabilities] = useState<ConsultationAvailability[]>(
    initialAvailabilities
  );
  const [scheduleState, setScheduleState] = useState<DayScheduleItem[]>(() =>
    buildScheduleForProfessional(defaultProfId, initialAvailabilities)
  );
  const [hasUnsavedSchedule, setHasUnsavedSchedule] = useState(false);

  const [exceptions, setExceptions] = useState<AvailabilityException[]>(initialExceptions);

  // Exception form
  const [blockDate, setBlockDate] = useState("");
  const [blockType, setBlockType] = useState<"full-day" | "partial">("full-day");
  const [blockStartTime, setBlockStartTime] = useState("14:00");
  const [blockEndTime, setBlockEndTime] = useState("18:00");
  const [blockReason, setBlockReason] = useState("Clinic Holiday / Leave");

  const [deleteExceptionTarget, setDeleteExceptionTarget] =
    useState<AvailabilityException | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectProfessional = (newProfId: string) => {
    setSelectedProfId(newProfId);
    setScheduleState(buildScheduleForProfessional(newProfId, savedAvailabilities));
    setHasUnsavedSchedule(false);
    setErrorMessage(null);
    setActionNotice(null);
  };

  const handleScheduleChange = (
    dayIndex: number,
    field: keyof DayScheduleItem,
    value: string | number | boolean
  ) => {
    setHasUnsavedSchedule(true);
    setScheduleState((prev) =>
      prev.map((item) => (item.weekday === dayIndex ? { ...item, [field]: value } : item))
    );
  };

  const handleCopyMondayToWeekdays = () => {
    const monday = scheduleState.find((d) => d.weekday === 1);
    if (!monday) return;
    setHasUnsavedSchedule(true);
    setScheduleState((prev) =>
      prev.map((item) =>
        item.weekday >= 2 && item.weekday <= 5
          ? {
              ...item,
              start_time: monday.start_time,
              end_time: monday.end_time,
              consultation_duration_minutes: monday.consultation_duration_minutes,
              is_active: monday.is_active,
            }
          : item
      )
    );
    setActionNotice("Copied Monday’s hours to Tuesday–Friday. Click Save Working Hours to apply.");
  };

  const handleSaveSchedule = async () => {
    setErrorMessage(null);

    // Validate open days have end_time > start_time
    for (const item of scheduleState) {
      if (item.is_active && item.end_time <= item.start_time) {
        const dayName = DAYS_OF_WEEK.find((d) => d.day === item.weekday)?.label || "this day";
        setErrorMessage(`Please make sure the closing time on ${dayName} is after the opening time.`);
        return;
      }
    }

    setIsSaving(true);
    const result = await updateWeeklySchedule(selectedProfId, scheduleState);
    setIsSaving(false);

    if (!result.success) {
      setErrorMessage(result.error || "Could not save working hours. Please try again.");
      return;
    }

    // Update local cache so switching practitioners and back keeps latest saved hours
    setSavedAvailabilities((prev) => {
      const others = prev.filter((a) => a.professional_id !== selectedProfId);
      const updatedRows: ConsultationAvailability[] = scheduleState.map((s) => ({
        id: `avail-${selectedProfId}-${s.weekday}`,
        professional_id: selectedProfId,
        weekday: s.weekday,
        start_time: s.start_time,
        end_time: s.end_time,
        consultation_duration_minutes: s.consultation_duration_minutes,
        mode: "Both",
        is_active: s.is_active,
      }));
      return [...others, ...updatedRows];
    });

    setHasUnsavedSchedule(false);
    setActionNotice(`Working hours saved for ${currentProf?.name}.`);
  };

  const handleAddException = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!blockDate) {
      setErrorMessage("Please select a date to block.");
      return;
    }
    if (blockType === "partial" && blockEndTime <= blockStartTime) {
      setErrorMessage("For a partial-day block, end time must be after start time.");
      return;
    }

    setIsSaving(true);

    const startTimeVal = blockType === "partial" ? `${blockStartTime}:00` : null;
    const endTimeVal = blockType === "partial" ? `${blockEndTime}:00` : null;

    const result = await addAvailabilityException({
      professional_id: selectedProfId,
      date: blockDate,
      reason: blockReason.trim() || "Unavailable",
      start_time: startTimeVal,
      end_time: endTimeVal,
    });

    setIsSaving(false);

    if (!result.success) {
      setErrorMessage(result.error || "Could not block that date. Please try again.");
      return;
    }

    const created = (result as { exception?: AvailabilityException }).exception;
    const newEx: AvailabilityException = created || {
      id: "exc-" + Date.now(),
      professional_id: selectedProfId,
      date: blockDate,
      reason: blockReason.trim() || "Unavailable",
      start_time: startTimeVal,
      end_time: endTimeVal,
      created_at: new Date().toISOString(),
    };
    setExceptions((prev) => [...prev, newEx]);
    setBlockDate("");
    setActionNotice(`Blocked ${newEx.date} for ${currentProf?.name}.`);
  };

  const handleConfirmDeleteException = async () => {
    if (!deleteExceptionTarget) return;
    setIsSaving(true);
    const result = await deleteAvailabilityException(deleteExceptionTarget.id);
    setIsSaving(false);

    if (!result.success) {
      setErrorMessage(result.error || "Could not remove blocked date. Please try again.");
      setDeleteExceptionTarget(null);
      return;
    }

    setExceptions((prev) => prev.filter((item) => item.id !== deleteExceptionTarget.id));
    setDeleteExceptionTarget(null);
    setActionNotice("Blocked date removed.");
  };

  const currentProf = professionals.find((p) => p.id === selectedProfId);
  const filteredExceptions = exceptions.filter((e) => e.professional_id === selectedProfId);

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Header */}
      <AdminStickyHeader>
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Practitioner Schedule
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Clinic Hours &amp; Holidays
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Set weekly consultation days, session lengths, and leave days for each practitioner.
          </p>
        </div>

        {/* Practitioner Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor={`${baseId}-prof`} className="sr-only">
            Select practitioner
          </label>
          <User className="w-4 h-4 text-[#B58B50]" />
          <select
            id={`${baseId}-prof`}
            value={selectedProfId}
            onChange={(e) => handleSelectProfessional(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#B58B50]/35 text-xs font-semibold text-[#173D34] shadow-xs focus:outline-none focus:border-[#B58B50]"
          >
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </AdminStickyHeader>

      <AdminNotice type="success" message={actionNotice} onDismiss={() => setActionNotice(null)} />
      <AdminNotice type="error" message={errorMessage} onDismiss={() => setErrorMessage(null)} />

      {/* Section 1: Weekly Hours */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8EDE4]">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#173D34]">
              Weekly Hours — {currentProf?.name}
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Uncheck any day the practitioner is unavailable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMondayToWeekdays}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#C8D6C6] hover:bg-[#F7F5EF] text-xs font-medium text-[#173D34] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#9E783E]" />
              <span>Copy Monday to Tue–Fri</span>
            </button>

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
              <span>{hasUnsavedSchedule ? "Save Working Hours*" : "Save Working Hours"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {DAYS_OF_WEEK.map((d, index) => {
            const item = scheduleState[index];
            if (!item) return null;

            return (
              <div
                key={d.day}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.is_active
                    ? "bg-[#F7F5EF] border-[#B58B50]/20"
                    : "bg-stone-50 border-stone-200"
                }`}
              >
                <label className="w-36 flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.is_active}
                    onChange={(e) =>
                      handleScheduleChange(d.day, "is_active", e.target.checked)
                    }
                    className="w-4 h-4 rounded accent-[#173D34]"
                  />
                  <span
                    className={`text-xs font-semibold ${
                      item.is_active ? "text-[#173D34]" : "text-stone-500"
                    }`}
                  >
                    {d.label}
                  </span>
                </label>

                {item.is_active ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">Opens:</span>
                      <input
                        type="time"
                        aria-label={`${d.label} opening time`}
                        value={item.start_time.slice(0, 5)}
                        onChange={(e) =>
                          handleScheduleChange(d.day, "start_time", `${e.target.value}:00`)
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none focus:border-[#B58B50]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">Closes:</span>
                      <input
                        type="time"
                        aria-label={`${d.label} closing time`}
                        value={item.end_time.slice(0, 5)}
                        onChange={(e) =>
                          handleScheduleChange(d.day, "end_time", `${e.target.value}:00`)
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none focus:border-[#B58B50]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#59675F]">Session:</span>
                      <select
                        aria-label={`${d.label} session duration`}
                        value={item.consultation_duration_minutes || 50}
                        onChange={(e) =>
                          handleScheduleChange(
                            d.day,
                            "consultation_duration_minutes",
                            Number(e.target.value)
                          )
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none focus:border-[#B58B50]"
                      >
                        <option value={45}>45 mins</option>
                        <option value={50}>50 mins (Standard)</option>
                        <option value={60}>60 mins</option>
                        <option value={90}>90 mins</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-500 italic">Closed / Unavailable</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Holidays & Leave */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-[#173D34]">
            Holidays &amp; Leave Dates — {currentProf?.name}
          </h2>
          <p className="text-xs text-[#59675F] font-light">
            Block an entire day or specific hours so clients cannot book during leaves or holidays.
          </p>
        </div>

        {/* Add Exception Form */}
        <form
          onSubmit={handleAddException}
          className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#173D34]">
              Add a Holiday or Leave Block
            </span>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBlockType("full-day")}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  blockType === "full-day"
                    ? "bg-[#173D34] text-white"
                    : "bg-white text-[#59675F] border border-[#C8D6C6]"
                }`}
              >
                Full Day
              </button>
              <button
                type="button"
                onClick={() => setBlockType("partial")}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  blockType === "partial"
                    ? "bg-[#173D34] text-white"
                    : "bg-white text-[#59675F] border border-[#C8D6C6]"
                }`}
              >
                Specific Hours Only
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-end">
            <div className={blockType === "partial" ? "sm:col-span-3" : "sm:col-span-4"}>
              <label htmlFor={`${baseId}-block-date`} className="block text-[11px] font-medium text-[#59675F] mb-1">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-block-date`}
                type="date"
                required
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none focus:border-[#B58B50]"
              />
            </div>

            {blockType === "partial" && (
              <>
                <div className="sm:col-span-2">
                  <label htmlFor={`${baseId}-block-start`} className="block text-[11px] font-medium text-[#59675F] mb-1">
                    From
                  </label>
                  <input
                    id={`${baseId}-block-start`}
                    type="time"
                    value={blockStartTime}
                    onChange={(e) => setBlockStartTime(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${baseId}-block-end`} className="block text-[11px] font-medium text-[#59675F] mb-1">
                    To
                  </label>
                  <input
                    id={`${baseId}-block-end`}
                    type="time"
                    value={blockEndTime}
                    onChange={(e) => setBlockEndTime(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className={blockType === "partial" ? "sm:col-span-3" : "sm:col-span-5"}>
              <label htmlFor={`${baseId}-block-reason`} className="block text-[11px] font-medium text-[#59675F] mb-1">
                Reason (Internal Note)
              </label>
              <input
                id={`${baseId}-block-reason`}
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Conference / Festival Holiday"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs focus:outline-none focus:border-[#B58B50]"
              />
            </div>

            <div className={blockType === "partial" ? "sm:col-span-2" : "sm:col-span-3"}>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 px-3 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block</span>
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
                className="p-3.5 rounded-xl border border-[#B58B50]/20 bg-[#FCFAF6] flex items-center justify-between text-xs gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0">
                    <Ban className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#173D34]">
                        {new Date(`${ex.date}T00:00:00`).toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200 text-[10px] font-semibold">
                        {ex.start_time && ex.end_time
                          ? `${format12HourTime(ex.start_time)} – ${format12HourTime(ex.end_time)}`
                          : "Full Day"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#59675F] block mt-0.5">
                      {ex.reason || "Unavailable"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteExceptionTarget(ex)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove blocked date"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#59675F] italic py-2">
              No holiday or leave dates blocked for {currentProf?.name}. Regular weekly hours apply.
            </p>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(deleteExceptionTarget)}
        title="Remove Blocked Date?"
        description={
          deleteExceptionTarget
            ? `Clients will be able to book appointments again on ${deleteExceptionTarget.date} during regular clinic hours.`
            : ""
        }
        confirmLabel="Yes, Reopen Date"
        tone="warning"
        isBusy={isSaving}
        onConfirm={handleConfirmDeleteException}
        onCancel={() => setDeleteExceptionTarget(null)}
      />
    </div>
  );
}
