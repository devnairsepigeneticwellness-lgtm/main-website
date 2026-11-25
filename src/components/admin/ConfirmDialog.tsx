"use client";

import React, { useEffect, useId, useRef } from "react";
import { AlertTriangle, HelpCircle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "warning" | "default";
  isBusy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Accessible native modal <dialog> confirmation prompt with Escape, focus restoration,
 * scroll containment, and pointer light-dismiss fallback per modern-web-guidance.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Keep as Is",
  tone = "danger",
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Fallback light-dismiss for browsers without native closedby="any" (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
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

    const handleDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const handleUp = (e: PointerEvent) => {
      if (!isBusy && pressedOutside && isOutside(e)) {
        onCancel();
      }
      pressedOutside = false;
    };

    dialog.addEventListener("pointerdown", handleDown);
    dialog.addEventListener("pointerup", handleUp);
    return () => {
      dialog.removeEventListener("pointerdown", handleDown);
      dialog.removeEventListener("pointerup", handleUp);
    };
  }, [isBusy, onCancel]);

  const confirmStyle =
    tone === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : tone === "warning"
      ? "bg-amber-600 hover:bg-amber-700 text-white"
      : "bg-[#173D34] hover:bg-[#102E27] text-white";

  const iconStyle =
    tone === "danger"
      ? "bg-red-100 text-red-600"
      : tone === "warning"
      ? "bg-amber-100 text-amber-700"
      : "bg-[#E8EDE4] text-[#173D34]";

  return (
    <dialog
      ref={dialogRef}
      closedby={isBusy ? "none" : "any"}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(e) => {
        if (isBusy) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        onCancel();
      }}
      onClose={() => {
        if (dialogRef.current) {
          dialogRef.current.returnValue = "";
        }
        if (open) onCancel();
      }}
      className="m-auto rounded-3xl p-0 bg-white max-w-md w-[calc(100%-2rem)] border border-[#B58B50]/30 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-xs"
    >
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`w-11 h-11 rounded-full ${iconStyle} flex items-center justify-center shrink-0`}>
            {tone === "default" ? (
              <HelpCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <button
            type="button"
            disabled={isBusy}
            onClick={onCancel}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-[#59675F] hover:bg-[#F7F5EF] hover:text-[#173D34] transition-colors cursor-pointer disabled:opacity-40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <h1 id={titleId} className="font-serif text-xl font-medium text-[#173D34]">
            {title}
          </h1>
          <p id={descId} className="text-xs sm:text-sm text-[#59675F] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            autoFocus
            disabled={isBusy}
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full border border-[#C8D6C6] hover:bg-[#F7F5EF] text-xs font-semibold text-[#173D34] transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-50 ${confirmStyle}`}
          >
            {isBusy ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
