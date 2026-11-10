"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2, Send, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  preselectedService = "Counselling",
}: ConsultationModalProps) {
  const [service, setService] = useState(preselectedService);
  const [prevPreselected, setPrevPreselected] = useState(preselectedService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [format, setFormat] = useState("Online Video Consultation");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (preselectedService !== prevPreselected) {
    setPrevPreselected(preselectedService);
    setService(preselectedService);
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
      <div className="relative w-full max-w-xl rounded-3xl bg-[#173D34] text-[#F7F5EF] border border-[#B58B50]/40 shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#DFBD83] hover:text-white hover:bg-[#102E27] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#DFBD83]/20 text-[#DFBD83] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-[#E8EDE4]/90 max-w-md mx-auto font-light leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Your appointment request for{" "}
              <strong className="text-[#DFBD83]">{service}</strong> has been registered. Our admissions coordinator will reach out at <span className="underline">{phone || email}</span> within 24 hours to finalize your appointment time.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-[#DFBD83] text-[#102E27] font-semibold text-xs tracking-wide hover:bg-white transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFBD83]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>N.E.W. Direct Booking</span>
                </div>
                <Link
                  href={`/book-consultation?service=${encodeURIComponent(service)}`}
                  onClick={onClose}
                  className="text-[11px] text-[#DFBD83] hover:text-white font-medium inline-flex items-center gap-1 underline"
                >
                  <span>Select Exact Date &amp; Slot</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Book a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#E8EDE4]/75 font-light mt-1">
                Begin your journey with licensed clinical psychologist &amp; rehabilitation counselor Ajit Kumar Nair.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                    Service Area
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none"
                  >
                    {/* Dynamic fallback if custom service string passed */}
                    {![
                      "Consultation — Ajit Kumar Nair",
                      "Consultation — Dr. Deepa Jain",
                      "Consultation — Zainab Arsiwala",
                      "Consultation — Bhavya Singh",
                      "Professional Team Enquiry",
                      "Counselling",
                      "Psychotherapy",
                      "Clinical Hypnotherapy",
                      "Online Rehabilitation",
                      "Renewal Programme",
                      "Mindfulness & Somatic",
                      "Professional Internship",
                      "Practitioner Mentorship",
                      "Corporate Workshop",
                      "Exploratory Call",
                    ].includes(service) && (
                      <option value={service}>{service}</option>
                    )}
                    <optgroup label="Professionals" className="bg-[#173D34] text-[#DFBD83]">
                      <option value="Consultation — Ajit Kumar Nair">Consultation — Ajit Kumar Nair</option>
                      <option value="Consultation — Dr. Deepa Jain">Consultation — Dr. Deepa Jain</option>
                      <option value="Consultation — Zainab Arsiwala">Consultation — Zainab Arsiwala</option>
                      <option value="Consultation — Bhavya Singh">Consultation — Bhavya Singh</option>
                      <option value="Professional Team Enquiry">Professional Team Enquiry</option>
                    </optgroup>
                    <optgroup label="Clinical Pathways" className="bg-[#173D34] text-[#DFBD83]">
                      <option value="Counselling">Individual Counselling</option>
                      <option value="Psychotherapy">Cognitive Psychotherapy (CBT/REBT)</option>
                      <option value="Clinical Hypnotherapy">Clinical Hypnotherapy</option>
                      <option value="Online Rehabilitation">Online Rehabilitation (RCI)</option>
                      <option value="Renewal Programme">The Renewal Programme</option>
                      <option value="Mindfulness & Somatic">Mindfulness &amp; Somatic Calm</option>
                    </optgroup>
                    <optgroup label="Learning & Growth" className="bg-[#173D34] text-[#DFBD83]">
                      <option value="Professional Internship">Psychology Internship</option>
                      <option value="Practitioner Mentorship">Practitioner Mentorship</option>
                      <option value="Corporate Workshop">Corporate / Institutional Training</option>
                      <option value="Exploratory Call">Exploratory Call (Unsure)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none"
                  >
                    <option value="Online Video Consultation">Online Video Consultation</option>
                    <option value="In-Person (Indore)">In-Person (Indore Clinic)</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#DFBD83] uppercase tracking-wider mb-1.5">
                  Brief Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any key context or preferred days/times..."
                  className="w-full px-4 py-2 rounded-xl bg-[#102E27] border border-[#B58B50]/30 focus:border-[#DFBD83] text-white text-sm focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] font-semibold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Confirming..." : "Confirm Consultation Request"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#E8EDE4]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DFBD83]" />
                <span>Confidential · RCI Registered Ethical Standard</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

