"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getFriendlyAuthError } from "@/lib/admin/helpers";

export default function AdminUpdatePasswordPage() {
  const router = useRouter();
  const baseId = useId();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Both passwords must match. Please check and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(getFriendlyAuthError(error.message));
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? getFriendlyAuthError(err.message)
          : "Could not save your new password. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B221C] text-[#F7F5EF] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#B58B50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#173D34]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group">
            <div className="w-14 h-14 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-lg font-bold mx-auto border-2 border-[#B58B50]/40 shadow-xl group-hover:scale-105 transition-all">
              N.E.W.
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Set a New Password
          </h1>
          <p className="text-xs text-[#E8EDE4]/75 font-light">
            Choose a memorable password of at least 8 characters
          </p>
        </div>

        <div className="bg-[#102E27] rounded-3xl p-7 sm:p-9 border border-[#B58B50]/30 shadow-2xl space-y-5">
          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-100 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100 flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Password updated! Opening your clinic dashboard...</span>
            </div>
          )}

          {!success && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor={`${baseId}-new-pw`}
                  className="block text-xs font-semibold text-[#DFBD83] uppercase tracking-wider mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id={`${baseId}-new-pw`}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    enterKeyHint="next"
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#173D34] border border-[#B58B50]/30 text-sm text-white placeholder-white/35 focus:border-[#DFBD83] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#DFBD83]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${baseId}-confirm-pw`}
                  className="block text-xs font-semibold text-[#DFBD83] uppercase tracking-wider mb-1.5"
                >
                  Re-enter New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id={`${baseId}-confirm-pw`}
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    enterKeyHint="done"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Type the same password again"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#173D34] border border-[#B58B50]/30 text-sm text-white placeholder-white/35 focus:border-[#DFBD83] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#102E27]" />
                    <span>Saving Password...</span>
                  </>
                ) : (
                  <>
                    <span>Save New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/admin/login"
              className="text-xs text-[#E8EDE4]/65 hover:text-[#DFBD83] transition-colors"
            >
              &larr; Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
