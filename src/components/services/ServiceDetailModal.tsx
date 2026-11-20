"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  tagline?: string;
  children: React.ReactNode;
  onBook?: () => void;
  bookLabel?: string;
}

export default function ServiceDetailModal({
  isOpen,
  onClose,
  title,
  badge,
  tagline,
  children,
  onBook,
  bookLabel = "Book Consultation",
}: ServiceDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = React.useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel (Esc key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  // Light dismiss on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      className="m-auto p-0 rounded-3xl bg-[#F7F5EF] text-[#24352D] border border-[#C8D6C6] shadow-2xl max-w-3xl w-[92vw] sm:w-[88vw] md:w-[780px] max-h-[88vh] overflow-hidden backdrop:bg-[#102E27]/75 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#E6EEE3] border-b border-[#C8D6C6] relative flex items-start justify-between gap-4">
          <div className="space-y-1.5 pr-8">
            {badge && (
              <span className="inline-block text-[11px] font-sans uppercase tracking-[0.18em] font-bold text-[#7D6335] bg-[#DEE7DB] px-3 py-0.5 rounded-full border border-[#B8C9B5]">
                {badge}
              </span>
            )}
            <h2
              id={titleId}
              className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] leading-snug"
            >
              {title}
            </h2>
            {tagline && (
              <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold">
                {tagline}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-[#D7E3D3] hover:bg-[#c6d6c1] text-[#1E3F35] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#3F5448] font-light text-sm sm:text-base leading-relaxed overscroll-contain">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-[#EAF0E7] border-t border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#556A5E] font-sans">
            Personalised, confidential psychological care
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#C8D6C6] text-xs font-semibold text-[#1E3F35] hover:bg-[#DEE7DB] transition-colors cursor-pointer"
            >
              Close
            </button>
            {onBook && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBook();
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-colors cursor-pointer"
              >
                <span>{bookLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
