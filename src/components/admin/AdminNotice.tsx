"use client";

import React from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

interface AdminNoticeProps {
  type: "success" | "error";
  message: string | null;
  onDismiss?: () => void;
}

/** Dismissible accessible status/error banner for admin feedback. */
export default function AdminNotice({ type, message, onDismiss }: AdminNoticeProps) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start justify-between gap-3 shadow-2xs ${
        isSuccess
          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-start gap-2.5">
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        )}
        <span className="leading-relaxed">{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
