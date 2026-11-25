"use client";

import React, { useState, useEffect, Suspense, useId } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getFriendlyAuthError } from "@/lib/admin/helpers";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseId = useId();
  const redirectTarget = searchParams.get("redirect") || "/admin";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    authError === "auth_callback_failed"
      ? "That sign-in or password reset link has expired. Please sign in below or request a new reset link."
      : null
  );
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const isConnected = isSupabaseConfigured();

  useEffect(() => {
    if (isConnected) {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          router.replace(redirectTarget);
        }
      });
    }
  }, [isConnected, redirectTarget, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setInfoMessage(null);

    if (!isConnected) {
      setTimeout(() => {
        setIsLoading(false);
        router.push(redirectTarget);
      }, 350);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(getFriendlyAuthError(error.message));
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push(redirectTarget);
        router.refresh();
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? getFriendlyAuthError(err.message)
          : "Something went wrong while signing in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your admin email address first, then click Forgot password.");
      return;
    }

    if (!isConnected) {
      setInfoMessage("Password reset emails are unavailable while in Demo Preview Mode.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/update-password`,
      });
      if (error) {
        setErrorMessage(getFriendlyAuthError(error.message));
      } else {
        setInfoMessage(
          `Password reset link sent to ${email.trim()}. Please check your Inbox (and Spam folder) and click the link inside.`
        );
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? getFriendlyAuthError(err.message)
          : "Could not send a password reset email right now."
      );
    } finally {
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
            Clinic Admin Sign In
          </h1>
          <p className="text-xs text-[#E8EDE4]/75 font-light">
            Nair&apos;s Epigenetic Wellness
          </p>
        </div>

        <div className="bg-[#102E27] rounded-3xl p-7 sm:p-9 border border-[#B58B50]/30 shadow-2xl space-y-5">
          {!isConnected && (
            <div className="p-3.5 rounded-xl bg-[#173D34] border border-[#B58B50]/30 text-xs text-[#DFBD83] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Demo Preview Mode Active</span>
                <span className="text-[11px] text-[#E8EDE4]/80 font-light">
                  Enter any email to explore the admin dashboard in preview mode.
                </span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-100 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100 flex items-start gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor={`${baseId}-email`}
                className="block text-xs font-semibold text-[#DFBD83] uppercase tracking-wider mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id={`${baseId}-email`}
                  name="email"
                  type="email"
                  autoComplete="username"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@nairsepigeneticwellness.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#173D34] border border-[#B58B50]/30 text-sm text-white placeholder-white/35 focus:border-[#DFBD83] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${baseId}-password`}
                  className="text-xs font-semibold text-[#DFBD83] uppercase tracking-wider"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-[11px] text-[#DFBD83]/85 hover:text-white transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id={`${baseId}-password`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  enterKeyHint="done"
                  required={isConnected}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#102E27]" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-[#E8EDE4]/65 hover:text-[#DFBD83] transition-colors"
            >
              &larr; Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B221C] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#DFBD83]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
