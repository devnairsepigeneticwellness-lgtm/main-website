"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Professional } from "@/data/professionalsData";

interface ProfessionalProfileModalProps {
  professional: Professional | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (serviceOrName?: string) => void;
  onBookConsultation?: (serviceOrName?: string) => void;
}

export default function ProfessionalProfileModal({
  professional,
  isOpen,
  onClose,
  onOpenBooking,
  onBookConsultation,
}: ProfessionalProfileModalProps) {
  const triggerBooking = onOpenBooking || onBookConsultation;
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !professional) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-professional-name"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0B221C]/85 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal Dialog Card */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#F7F5EF] text-[#24352D] border-2 border-[#B58B50]/40 shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col focus:outline-none"
        >
          {/* Top Banner Header with Close Button */}
          <div className="relative bg-gradient-to-r from-[#173D34] via-[#102E27] to-[#0D241F] text-[#F7F5EF] p-6 sm:p-8 pr-14 border-b border-[#B58B50]/30 shrink-0">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
              {/* Image / Monogram Badge */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#DFBD83]/60 bg-[#102E27] shrink-0 flex items-center justify-center shadow-lg">
                {professional.image ? (
                  <Image
                    src={professional.image}
                    alt={professional.name}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="text-center">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#DFBD83]">
                      {professional.initials}
                    </span>
                    <span className="block text-[8px] uppercase tracking-widest text-[#E8EDE4]/60">
                      N.E.W.
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1">
                {professional.badge && (
                  <span className="inline-block text-[10px] font-sans tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-[#DFBD83]/20 text-[#DFBD83] border border-[#DFBD83]/40 font-semibold mb-1">
                    {professional.badge}
                  </span>
                )}
                <h3
                  id="modal-professional-name"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white"
                >
                  {professional.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#DFBD83] font-sans tracking-wide font-medium leading-relaxed">
                  {professional.designation}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#DFBD83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
            {/* Quote / Guiding Insight */}
            {professional.quote && (
              <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#E8EDE4]/60 border-l-4 border-[#B58B50] text-[#173D34]">
                <p className="font-serif italic text-sm sm:text-base leading-snug">
                  &ldquo;{professional.quote}&rdquo;
                </p>
              </blockquote>
            )}

            {/* Complete Approved Biography */}
            <div className="space-y-3 font-sans text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block">
                Professional Background &amp; Profile:
              </span>
              {professional.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Qualifications & Credentials */}
            <div className="pt-4 border-t border-[#E8EDE4]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                Approved Qualifications &amp; Statutory Registrations:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                {professional.qualifications.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E8EDE4]">
                    <GraduationCap className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                    <span className="font-light">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas of Expertise */}
            <div className="pt-4 border-t border-[#E8EDE4]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                Areas of Professional Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                {professional.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-[#173D34]/5 text-[#173D34] text-xs font-medium border border-[#173D34]/15"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Modalities & Therapeutic Modalities */}
            {professional.modalities && professional.modalities.length > 0 && (
              <div className="pt-4 border-t border-[#E8EDE4]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                  Therapeutic Approaches &amp; Modalities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {professional.modalities.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white text-[#24352D] text-xs font-light border border-[#B58B50]/30 shadow-2xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Approach */}
            {professional.approach && (
              <div className="pt-4 border-t border-[#E8EDE4] bg-white p-4 sm:p-5 rounded-2xl border border-[#E8EDE4]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#173D34] mb-2">
                  <Sparkles className="w-4 h-4 text-[#B58B50]" />
                  <span>Professional Approach</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                  {professional.approach}
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer with Enquiry CTA */}
          <div className="p-5 sm:p-6 bg-[#E8EDE4]/50 border-t border-[#E8EDE4] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <span className="text-xs text-[#59675F] font-light text-center sm:text-left">
              Sessions are available via secure online video or in-person (by appointment).
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-white hover:bg-[#F7F5EF] text-[#173D34] text-xs font-medium border border-[#173D34]/20 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  triggerBooking?.(`Consultation — ${professional.name}`);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide border border-[#B58B50]/40 transition-all shadow-md cursor-pointer"
              >
                <span>Enquire With {professional.name.split(" ")[0]}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
