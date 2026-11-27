"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Heart,
  Brain,
  Sparkles,
  Shield,
  Compass,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  ShieldCheck,
  MapPin,
  Globe,
} from "lucide-react";
import { submitConsultationBooking } from "@/lib/bookings/actions";
import { TimeSlot } from "@/lib/supabase/types";

interface ProfessionalOption {
  id: string;
  name: string;
  designation: string;
}

interface ConsultationBookingEngineProps {
  professionals: ProfessionalOption[];
  preselectedService?: string;
  preselectedProfessional?: string;
}

export default function ConsultationBookingEngine({
  professionals,
  preselectedService,
  preselectedProfessional,
}: ConsultationBookingEngineProps) {
  // Step indicator: 1 = Service & Professional, 2 = Date & Time, 3 = Contact Information, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [service, setService] = useState<string>(preselectedService || "Counselling");
  const [professionalId, setProfessionalId] = useState<string>(
    preselectedProfessional || (professionals[0]?.id ?? "")
  );

  // Date selection (default: tomorrow if not Sunday, else Monday)
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-10");
  const [todayStr, setTodayStr] = useState<string>("2026-11-09");
  const [maxDateStr, setMaxDateStr] = useState<string>("2027-01-09");

  useEffect(() => {
    const today = new Date();
    setTodayStr(today.toISOString().split("T")[0]);

    const max = new Date();
    max.setDate(max.getDate() + 60);
    setMaxDateStr(max.toISOString().split("T")[0]);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Client Details
  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mode, setMode] = useState<
    "Online Video Consultation" | "In-Person (Indore Clinic)" | "Phone Call"
  >("Online Video Consultation");
  const [message, setMessage] = useState<string>("");
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmationData, setConfirmationData] = useState<{
    booking_reference: string;
    client_name: string;
    service: string;
    mode: string;
    start_at: string;
    end_at: string;
    status: string;
  } | null>(null);

  const servicesList = [
    {
      id: "Counselling",
      title: "Counselling",
      desc: "Confidential dialogue for emotional clarity, coping and self-understanding.",
      icon: Heart,
    },
    {
      id: "Psychotherapy",
      title: "Cognitive Psychotherapy (CBT/REBT)",
      desc: "Evidence-informed cognitive restructuring for anxiety and mood patterns.",
      icon: Brain,
    },
    {
      id: "Therapy",
      title: "Therapy",
      desc: "Subconscious alignment, somatic ease & nervous system reset.",
      icon: Sparkles,
    },
    {
      id: "Online Rehabilitation",
      title: "Online Rehabilitation",
      desc: "Neurodevelopmental guidance, psychosocial & rehabilitation counselling.",
      icon: Shield,
    },
    {
      id: "Renewal",
      title: "Renewal Programme",
      desc: "Holistic recovery pathway for deep burnout, grief & life transitions.",
      icon: Compass,
    },
    {
      id: "General Consultation",
      title: "General Consultation / Exploratory",
      desc: "An initial 50-minute clinical intake session to determine your best care pathway.",
      icon: ShieldCheck,
    },
  ];

  // Fetch slots whenever selectedDate or professionalId changes
  useEffect(() => {
    let isMounted = true;
    async function fetchSlots() {
      if (!selectedDate) return;
      setIsLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const query = new URLSearchParams({
          date: selectedDate,
          ...(professionalId ? { professional_id: professionalId } : {}),
        });
        const res = await fetch(`/api/bookings/slots?${query.toString()}`);
        const data = await res.json();
        if (isMounted) {
          if (data.slots) {
            setAvailableSlots(data.slots);
            // Preselect first available slot if any
            const firstAvail = data.slots.find((s: TimeSlot) => s.is_available);
            if (firstAvail) setSelectedSlot(firstAvail);
          } else {
            setAvailableSlots([]);
          }
        }
      } catch (err) {
        console.error("Error fetching available slots:", err);
        if (isMounted) setAvailableSlots([]);
      } finally {
        if (isMounted) setIsLoadingSlots(false);
      }
    }

    fetchSlots();
    return () => {
      isMounted = false;
    };
  }, [selectedDate, professionalId]);

  // Handle final submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setSubmissionError("Please select a valid consultation time slot.");
      return;
    }
    if (!privacyConsent) {
      setSubmissionError("You must accept the confidentiality agreement.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setFieldErrors({});

    const result = await submitConsultationBooking({
      client_name: clientName,
      email,
      phone,
      service,
      professional_id: professionalId || null,
      mode,
      start_at: selectedSlot.start_at,
      end_at: selectedSlot.end_at,
      message,
      privacy_consent: true,
    });

    setIsSubmitting(false);

    if (result.success && result.data) {
      setConfirmationData(result.data);
      setStep(4);
    } else {
      setSubmissionError(result.error || "An error occurred during booking.");
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
    }
  };

  const selectedProfObj = professionals.find((p) => p.id === professionalId);

  // --------------------------------------------------------------------------
  // STEP 4: CONFIRMATION SCREEN
  // --------------------------------------------------------------------------
  if (step === 4 && confirmationData) {
    const startObj = new Date(confirmationData.start_at);
    const endObj = new Date(confirmationData.end_at);
    const formattedDate = startObj.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedStartTime = startObj.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedEndTime = endObj.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#B58B50]/30 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto border-2 border-[#B58B50]/40 shadow-md">
          <CheckCircle2 className="w-10 h-10 text-[#DFBD83]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Booking Request Received
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#173D34] mt-1">
            Your consultation request has been received.
          </h2>
          <p className="text-sm text-[#59675F] font-light mt-2 max-w-lg mx-auto">
            Thank you, <strong className="text-[#173D34] font-medium">{confirmationData.client_name}</strong>. Our admissions coordinator will review and confirm your scheduled time slot within 24 hours.
          </p>
        </div>

        {/* Reference & Details Card */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 text-left space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8EDE4]">
            <span className="text-xs text-[#59675F] uppercase tracking-wider font-semibold">
              Booking Reference
            </span>
            <span className="font-mono text-sm font-bold text-[#173D34] bg-[#E8EDE4] px-3 py-1 rounded-md">
              {confirmationData.booking_reference}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#59675F]">Consultation Service</span>
            <span className="font-medium text-[#173D34]">{confirmationData.service}</span>
          </div>

          {selectedProfObj && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#59675F]">Practitioner</span>
              <span className="font-medium text-[#173D34]">{selectedProfObj.name}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#59675F]">Date</span>
            <span className="font-medium text-[#173D34]">{formattedDate}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#59675F]">Time Window</span>
            <span className="font-medium text-[#173D34]">
              {formattedStartTime} – {formattedEndTime} (IST)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#59675F]">Format / Mode</span>
            <span className="font-medium text-[#173D34]">{confirmationData.mode}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8EDE4]">
            <span className="text-[#59675F]">Initial Status</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">
              {confirmationData.status}
            </span>
          </div>
        </div>

        {/* Confidentiality Reminder */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#59675F]">
          <ShieldCheck className="w-4 h-4 text-[#B58B50]" />
          <span>Strictly Confidential · Professional Clinical Standards</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#173D34] text-[#F7F5EF] hover:bg-[#102E27] text-xs font-semibold tracking-wide transition-all"
          >
            Return to Homepage
          </Link>
          <button
            onClick={() => {
              setConfirmationData(null);
              setStep(1);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#B58B50]/30 hover:border-[#B58B50] text-[#173D34] text-xs font-medium tracking-wide transition-all"
          >
            Book Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold uppercase tracking-widest mb-3">
          <CalendarIcon className="w-3.5 h-3.5 text-[#B58B50]" />
          <span>Clinical &amp; Therapeutic Intake</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
          Let&apos;s Begin With a Conversation.
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light mt-2 max-w-lg mx-auto leading-relaxed">
          Select your therapeutic pathway, preferred practitioner, and convenient appointment time to begin your journey with Nair&apos;s Epigenetic Wellness.
        </p>

        {/* Multi-step Breadcrumb */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 text-xs">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 font-medium transition-colors ${
              step === 1 ? "text-[#173D34] font-bold" : "text-[#59675F]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === 1 ? "bg-[#173D34] text-[#DFBD83]" : "bg-[#E8EDE4] text-[#59675F]"
              }`}
            >
              1
            </span>
            <span>Pathway</span>
          </button>

          <span className="text-gray-300">→</span>

          <button
            onClick={() => {
              if (step > 2) setStep(2);
            }}
            className={`flex items-center gap-1.5 font-medium transition-colors ${
              step === 2 ? "text-[#173D34] font-bold" : "text-[#59675F]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === 2 ? "bg-[#173D34] text-[#DFBD83]" : "bg-[#E8EDE4] text-[#59675F]"
              }`}
            >
              2
            </span>
            <span>Date &amp; Time</span>
          </button>

          <span className="text-gray-300">→</span>

          <div
            className={`flex items-center gap-1.5 font-medium ${
              step === 3 ? "text-[#173D34] font-bold" : "text-[#59675F]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === 3 ? "bg-[#173D34] text-[#DFBD83]" : "bg-[#E8EDE4] text-[#59675F]"
              }`}
            >
              3
            </span>
            <span>Your Details</span>
          </div>
        </div>
      </div>

      {/* Main Flow Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xl">
        
        {/* ================================================================== */}
        {/* STEP 1: SERVICE & PROFESSIONAL */}
        {/* ================================================================== */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1">
                Step 1: Choose Your Consultation Service
              </h2>
              <p className="text-xs sm:text-sm text-[#59675F] font-light">
                Select the clinical or therapeutic domain that best aligns with your goals.
              </p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicesList.map((s) => {
                const Icon = s.icon;
                const isSelected = service === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setService(s.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "bg-[#173D34] text-white border-[#B58B50] shadow-md"
                        : "bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] border-[#E8EDE4] text-[#24352D]"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-[#102E27] text-[#DFBD83]"
                          : "bg-white text-[#173D34] border border-[#B58B50]/20"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-medium ${
                          isSelected ? "text-white" : "text-[#173D34]"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isSelected ? "text-[#E8EDE4]/80 font-light" : "text-[#59675F]"
                        }`}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Professional Selection */}
            <div className="pt-6 border-t border-[#E8EDE4]">
              <h2 className="font-serif text-xl font-medium text-[#173D34] mb-1">
                Preferred Professional (Optional)
              </h2>
              <p className="text-xs text-[#59675F] font-light mb-4">
                Choose a specific clinician or select &ldquo;First Available Professional&rdquo;.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setProfessionalId("")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    professionalId === ""
                      ? "bg-[#173D34] text-white border-[#B58B50]"
                      : "bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] border-[#E8EDE4]"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-serif text-xs font-semibold">
                    *
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold">First Available Professional</h3>
                    <p className="text-[11px] opacity-80">Our admissions team will assign the earliest slot.</p>
                  </div>
                </div>

                {professionals.map((prof) => (
                  <div
                    key={prof.id}
                    onClick={() => setProfessionalId(prof.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      professionalId === prof.id
                        ? "bg-[#173D34] text-white border-[#B58B50]"
                        : "bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] border-[#E8EDE4]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#102E27] text-[#DFBD83] flex items-center justify-center font-serif text-xs font-semibold shrink-0">
                      {prof.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold line-clamp-1">{prof.name}</h3>
                      <p className="text-[11px] opacity-80 line-clamp-1">{prof.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue CTA */}
            <div className="pt-6 border-t border-[#E8EDE4] flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Continue to Date &amp; Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* STEP 2: DATE & TIME SELECTION */}
        {/* ================================================================== */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1">
                Step 2: Choose Your Date &amp; Available Time Slot
              </h2>
              <p className="text-xs sm:text-sm text-[#59675F] font-light">
                Consultations are 50 minutes. All times displayed in Indian Standard Time (IST, UTC+5:30).
              </p>
            </div>

            {/* Date Input */}
            <div className="max-w-xs">
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-2">
                Consultation Date *
              </label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  min={todayStr}
                  max={maxDateStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs font-medium text-[#173D34] focus:outline-none focus:border-[#B58B50]"
                />
              </div>
            </div>

            {/* Slots Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34]">
                  Available Slots for {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
                </span>
                {isLoadingSlots && (
                  <span className="text-xs text-[#B58B50] flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching live availability...</span>
                  </span>
                )}
              </div>

              {isLoadingSlots ? (
                <div className="py-12 text-center text-xs text-[#59675F]">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#B58B50]" />
                  <span>Checking calendar slots...</span>
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSlots.map((slot, idx) => {
                    const isSelected = selectedSlot?.start_at === slot.start_at;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={!slot.is_available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl text-center text-xs font-medium transition-all border ${
                          !slot.is_available
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-[#173D34] text-[#DFBD83] border-[#B58B50] shadow-md"
                            : "bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] border-[#B58B50]/20"
                        }`}
                      >
                        <Clock className={`w-3.5 h-3.5 mx-auto mb-1 ${isSelected ? "text-[#DFBD83]" : "text-[#B58B50]"}`} />
                        <span>{slot.time_label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#F7F5EF] text-center text-xs text-[#59675F] space-y-2">
                  <AlertCircle className="w-6 h-6 text-[#B58B50] mx-auto" />
                  <p className="font-medium text-[#173D34]">No slots available on this date.</p>
                  <p className="font-light">
                    The clinic is closed on Sundays and gazetted holidays. Please choose another weekday.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-[#E8EDE4] flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-[#B58B50]/30 hover:border-[#B58B50] text-[#173D34] text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                disabled={!selectedSlot}
                onClick={() => setStep(3)}
                className="px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue to Your Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* STEP 3: CONTACT INFORMATION & CONFIRMATION */}
        {/* ================================================================== */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1">
                Step 3: Enter Your Contact Details
              </h2>
              <p className="text-xs sm:text-sm text-[#59675F] font-light">
                Please provide your contact information. All details are kept strictly confidential under clinical privacy regulations.
              </p>
            </div>

            {/* Error Banner */}
            {submissionError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Priyadarshini Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              {fieldErrors.client_name && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.client_name}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Mode of Consultation */}
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-2">
                Preferred Consultation Mode *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Online Video Consultation", label: "Online Video", icon: Globe },
                  { id: "In-Person (Indore Clinic)", label: "In-Person (Indore)", icon: MapPin },
                  { id: "Phone Call", label: "Audio Phone Call", icon: Phone },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id as any)}
                      className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                        mode === m.id
                          ? "bg-[#173D34] text-[#DFBD83] border-[#B58B50]"
                          : "bg-[#F7F5EF] text-[#24352D] border-[#E8EDE4] hover:bg-[#E8EDE4]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#B58B50]" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Context Message */}
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Brief Context or Goals (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any key background, primary concerns, or scheduling preferences you would like the practitioner to know..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
              />
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-[#173D34] focus:ring-[#B58B50]"
                />
                <span className="text-xs text-[#59675F] leading-relaxed">
                  I understand that this consultation request is handled under strict professional confidentiality. I consent to being contacted by Nair&apos;s Epigenetic Wellness via email or phone/WhatsApp to confirm this appointment.
                </span>
              </label>
              {fieldErrors.privacy_consent && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.privacy_consent}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#E8EDE4] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-[#B58B50]/30 hover:border-[#B58B50] text-[#173D34] text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#DFBD83]" />
                    <span>Confirming Appointment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Consultation Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
