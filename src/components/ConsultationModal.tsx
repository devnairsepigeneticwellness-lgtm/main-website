"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Send, Calendar, Clock, ShieldCheck } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

function normalizeService(raw?: string): string {
  if (!raw) return "Counselling";
  const lower = raw.toLowerCase();
  if (
    lower.includes("hero") ||
    lower.includes("general") ||
    lower.includes("discovery") ||
    lower.includes("inquiry") ||
    lower.includes("pathway") ||
    lower.includes("announcement") ||
    lower.includes("footer") ||
    lower.includes("navbar") ||
    lower.includes("exploration") ||
    lower.includes("method") ||
    lower.includes("check-in") ||
    lower.includes("screening")
  ) {
    return "Counselling";
  }
  if (raw === "Individual Counselling") return "Counselling";
  if (raw === "Clinical Hypnotherapy") return "Therapy";
  if (raw === "Online Rehabilitation (RCI)") return "Online Rehabilitation";
  if (raw === "Mindfulness & Somatic Calm" || raw === "Mindfulness & Somatic") return "Mindfulness";
  return raw;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  preselectedService = "Counselling",
}: ConsultationModalProps) {
  const [service, setService] = useState(() => normalizeService(preselectedService));
  const [prevPreselected, setPrevPreselected] = useState(preselectedService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [format, setFormat] = useState("Online Video Consultation");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("10:00 AM - 10:50 AM");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);

    const max = new Date();
    max.setDate(max.getDate() + 60);
    setMaxDate(max.toISOString().split("T")[0]);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  if (preselectedService !== prevPreselected) {
    setPrevPreselected(preselectedService);
    setService(normalizeService(preselectedService));
  }

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B221C]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#EBF1E8] text-[#24352D] border border-[#C8D6C6] shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#173D34] hover:text-[#7D6335] hover:bg-[#DCE7DA] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-[#465A4F] max-w-md mx-auto font-light leading-relaxed">
              Thank you, <strong className="text-[#173D34]">{name}</strong>. Your appointment request for{" "}
              <strong className="text-[#1E3F35]">{service}</strong> on{" "}
              <strong className="text-[#173D34]">{date}</strong> at{" "}
              <strong className="text-[#173D34]">{slot}</strong> has been registered. Our admissions coordinator will reach out at <span className="underline font-medium text-[#173D34]">{phone || email}</span> within 24 hours to confirm your appointment.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-[#1E3F35] text-[#F7F5EF] font-semibold text-xs tracking-wide hover:bg-[#285246] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D6335] mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>N.E.W. Direct Booking</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
                Book a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#465A4F] font-light mt-1">
                Begin your journey with our counsellors and clinicians at Nair’s Epigenetic Wellness.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5">
                    Service Area
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none transition-colors"
                  >
                    {/* Dynamic fallback if custom service string passed and not in standard lists */}
                    {![
                      "Consultation — Ajit Kumar Nair",
                      "Consultation — Dr. Deepa Jain",
                      "Consultation — Zainab Aarsiwala",
                      "Consultation — Bhavya Singh",
                      "Professional Team Enquiry",
                      "Counselling",
                      "Psychotherapy",
                      "Therapy",
                      "Online Rehabilitation",
                      "Renewal Programme",
                      "Mindfulness",
                      "Professional Internship",
                      "Practitioner Mentorship",
                      "Corporate Workshop",
                      "Exploratory Call",
                    ].includes(service) && (
                      <option value={service}>{service}</option>
                    )}
                    <optgroup label="Professionals" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="Consultation — Ajit Kumar Nair">Consultation — Ajit Kumar Nair</option>
                      <option value="Consultation — Dr. Deepa Jain">Consultation — Dr. Deepa Jain</option>
                      <option value="Consultation — Zainab Aarsiwala">Consultation — Zainab Aarsiwala</option>
                      <option value="Consultation — Bhavya Singh">Consultation — Bhavya Singh</option>
                      <option value="Professional Team Enquiry">Professional Team Enquiry</option>
                    </optgroup>
                    <optgroup label="Clinical Pathways" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="Counselling">Counselling</option>
                      <option value="Psychotherapy">Cognitive Psychotherapy (CBT/REBT)</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Online Rehabilitation">Online Rehabilitation</option>
                      <option value="Renewal Programme">The Renewal Programme</option>
                      <option value="Mindfulness">Mindfulness</option>
                    </optgroup>
                    <optgroup label="Learning & Growth" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="Professional Internship">Psychology Internship</option>
                      <option value="Practitioner Mentorship">Practitioner Mentorship</option>
                      <option value="Corporate Workshop">Corporate / Institutional Training</option>
                      <option value="Exploratory Call">Exploratory Call (Unsure)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none transition-colors"
                  >
                    <option value="Online Video Consultation">Online Video Consultation</option>
                    <option value="In-Person (Indore)">In-Person (Indore Clinic)</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Selection (Replaces Brief Note) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7D6335]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    max={maxDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7D6335]" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#DEE7DB] border border-[#B8C9B5] focus:border-[#1E3F35] focus:bg-[#E8EFE5] text-[#173D34] text-sm focus:outline-none transition-colors"
                  >
                    <optgroup label="Morning (10:00 AM – 01:00 PM)" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="10:00 AM - 10:50 AM">10:00 AM – 10:50 AM</option>
                      <option value="11:00 AM - 11:50 AM">11:00 AM – 11:50 AM</option>
                      <option value="12:00 PM - 12:50 PM">12:00 PM – 12:50 PM</option>
                    </optgroup>
                    <optgroup label="Afternoon (02:00 PM – 05:00 PM)" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="02:00 PM - 02:50 PM">02:00 PM – 02:50 PM</option>
                      <option value="03:00 PM - 03:50 PM">03:00 PM – 03:50 PM</option>
                      <option value="04:00 PM - 04:50 PM">04:00 PM – 04:50 PM</option>
                    </optgroup>
                    <optgroup label="Evening (05:00 PM – 08:00 PM)" className="bg-[#E6EEE3] text-[#173D34]">
                      <option value="05:00 PM - 05:50 PM">05:00 PM – 05:50 PM</option>
                      <option value="06:00 PM - 06:50 PM">06:00 PM – 06:50 PM</option>
                      <option value="07:00 PM - 07:50 PM">07:00 PM – 07:50 PM</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] font-semibold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Confirming..." : "Confirm Consultation Request"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#556A5E] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D6335]" />
                <span>Confidential · Professional Clinical Standards</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

