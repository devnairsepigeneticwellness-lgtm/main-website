export const EVENT_CATEGORIES = [
  "Workshop",
  "Crisis Intervention",
  "Relational Skills",
  "Wellbeing & Somatics",
  "Clinical Training",
  "Masterclass",
  "Educational Mental Health",
  "Historical Workshop",
  "Institutional Symposium",
] as const;

/** Format a YYYY-MM-DD date string from an ISO datetime in Asia/Kolkata (IST). */
export function toIstDateString(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.split("T")[0] || "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** Format an HH:mm 24-hour time string from an ISO datetime in Asia/Kolkata (IST). */
export function toIstTimeString(iso: string | null | undefined): string {
  if (!iso) return "10:00";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "10:00";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const hour = parts.find((p) => p.type === "hour")?.value || "10";
  const minute = parts.find((p) => p.type === "minute")?.value || "00";
  return `${hour === "24" ? "00" : hour}:${minute}`;
}

/** Convert a title into a URL-friendly slug. */
export function slugifyTitle(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Normalize a client phone number into digits suitable for wa.me links. */
export function buildClientWhatsAppUrl(phone: string, message: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return null;
  const normalized = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/** Convert technical Supabase authentication errors into friendly messages. */
export function getFriendlyAuthError(rawMessage: string): string {
  const lower = rawMessage.toLowerCase();
  if (lower.includes("invalid login credentials") || lower.includes("invalid email or password")) {
    return "Your email or password doesn’t match. Please double-check them or use Forgot Password below.";
  }
  if (lower.includes("email not confirmed")) {
    return "Your account email has not been confirmed yet. Please check your inbox for the confirmation link.";
  }
  if (lower.includes("too many requests") || lower.includes("rate limit")) {
    return "Too many sign-in attempts in a short time. Please wait a couple of minutes and try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "We couldn’t reach the sign-in service. Please check your internet connection and try again.";
  }
  if (lower.includes("same password") || lower.includes("different from the old")) {
    return "Please choose a new password that is different from your current one.";
  }
  return rawMessage;
}
