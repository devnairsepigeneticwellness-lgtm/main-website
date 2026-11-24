"use client";

import React, { useState, useEffect, useRef } from "react";
import { CONTACT_INFO, getWhatsAppUrl } from "@/components/SocialIcons";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Phone,
  Mail,
  Lock,
  RefreshCw,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export const ENQUIRY_TYPE_OPTIONS = [
  "General Enquiry",
  "Counselling",
  "Psychotherapy",
  "Clinical Hypnotherapy",
  "Online Rehabilitation",
  "Renewal",
  "Internship Programme",
  "Mentorship Programme",
  "Corporate Workshop",
  "Educational Training",
  "Other",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPE_OPTIONS)[number];

interface EnquiryFormSectionProps {
  selectedEnquiryType: EnquiryType;
  onChangeEnquiryType: (type: EnquiryType) => void;
}

export default function EnquiryFormSection({
  selectedEnquiryType,
  onChangeEnquiryType,
}: EnquiryFormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    _hp: "", // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    referenceId: string;
    message: string;
    submittedData: {
      name: string;
      email: string;
      phone: string;
      enquiryType: string;
    };
  } | null>(null);

  const renderTimestampRef = useRef<number>(0);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderTimestampRef.current = Date.now();
  }, []);

  const validateField = (field: string, value: string | boolean): string | null => {
    if (field === "name") {
      if (typeof value !== "string" || value.trim().length < 2) {
        return "Please enter your full name (at least 2 characters).";
      }
    }
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value !== "string" || !emailRegex.test(value.trim())) {
        return "Please enter a valid email address.";
      }
    }
    if (field === "phone") {
      const digitsOnly = typeof value === "string" ? value.replace(/\D/g, "") : "";
      if (digitsOnly.length < 7) {
        return "Please enter a valid phone number (at least 7 digits).";
      }
    }
    if (field === "enquiryType") {
      if (typeof value !== "string" || !value) {
        return "Please select an enquiry type.";
      }
    }
    if (field === "message") {
      if (typeof value !== "string" || value.trim().length < 5) {
        return "Please share a brief message describing your enquiry (at least 5 characters).";
      }
    }
    if (field === "consent") {
      if (!value) {
        return "Please check the box to confirm your consent.";
      }
    }
    return null;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setSubmitError(null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as EnquiryType;
    onChangeEnquiryType(val);
    if (errors.enquiryType) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.enquiryType;
        return next;
      });
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors: Record<string, string> = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const typeErr = validateField("enquiryType", selectedEnquiryType);
    if (typeErr) newErrors.enquiryType = typeErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors.message = msgErr;

    const consentErr = validateField("consent", formData.consent);
    if (consentErr) newErrors.consent = consentErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiryType: selectedEnquiryType,
          message: formData.message,
          consent: formData.consent,
          _hp: formData._hp,
          _t: renderTimestampRef.current,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(
          result.message || "We could not deliver your enquiry. Please check your entries and try again."
        );
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmitSuccess({
        referenceId: result.referenceId,
        message: result.message,
        submittedData: result.submittedData || {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiryType: selectedEnquiryType,
        },
      });
      setIsSubmitting(false);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(
        `A network error prevented submission. Please verify your connection or contact us via WhatsApp (${CONTACT_INFO.phoneDisplay}).`
      );
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      _hp: "",
    });
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(null);
    onChangeEnquiryType("General Enquiry");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  return (
    <section
      id="enquiry-form"
      className="py-16 sm:py-20 lg:py-28 bg-[#FCFAF6] border-y border-[#E8EDE4] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              SEND AN ENQUIRY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
            Tell Us How We Can Help.
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
            Fill out the form below with your requirements or questions. Our team will review your enquiry thoughtfully and reach out to discuss suitable options and next steps.
          </p>
        </div>

        {/* Two-Column Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Context, Helpful Info, Reassurance & Privacy Notice */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Active Topic Card */}
            <div className="p-6 rounded-3xl bg-[#F7F5EF] border border-[#B58B50]/30 shadow-xs">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
                Selected Enquiry Topic
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <Sparkles className="w-4 h-4 text-[#B58B50] shrink-0" />
                <span className="font-serif text-xl sm:text-2xl text-[#173D34] font-medium">
                  {selectedEnquiryType}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#59675F] mt-2 font-light leading-relaxed">
                You can switch between wellness services, professional programmes, workshops, or general enquiries using the dropdown inside the form or category cards below.
              </p>
            </div>

            {/* Helpful Contact Channels */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#173D34] text-[#F7F5EF] space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-[#DFBD83] text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Direct Practitioner Access</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium leading-snug">
                Prefer speaking directly with our administrative team?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                If you have immediate scheduling questions, you can reach us by phone or WhatsApp during active consultation hours.
              </p>
              
              <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-[#E8EDE4]">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#102E27]/80 hover:bg-[#102E27] border border-[#B58B50]/30 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span className="font-medium">{CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#102E27]/80 hover:bg-[#102E27] border border-[#B58B50]/30 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span className="font-medium break-all">{CONTACT_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Privacy & Health Notice (Mandatory Requirement) */}
            <div className="p-6 rounded-3xl bg-[#E8EDE4]/70 border border-[#9AAA8A]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#173D34] font-semibold text-xs tracking-wide">
                <ShieldAlert className="w-4 h-4 text-[#B58B50] shrink-0" />
                <span>Important Privacy Notice</span>
              </div>
              <p className="text-xs text-[#24352D] font-medium leading-relaxed">
                &ldquo;Please avoid including sensitive medical or personal health information in this general enquiry form.&rdquo;
              </p>
              <p className="text-[11px] text-[#59675F] leading-relaxed font-light">
                To protect your confidentiality, N.E.W. does not request medical records, diagnostic histories or sensitive personal disclosures through initial web forms. All clinical documentation is collected securely after an initial consultation is arranged.
              </p>
            </div>

            {/* Small Reassurance Note */}
            <div className="flex items-start gap-3 text-xs text-[#59675F] font-light leading-relaxed px-1">
              <Lock className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
              <span>
                Your contact details are used solely to reply to your inquiry. We never share, distribute, or monetise client data.
              </span>
            </div>

          </div>

          {/* Right Column (7 cols): The Premium Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#F7F5EF] border border-[#B58B50]/30 p-6 sm:p-10 shadow-lg relative">
              
              {/* Submission Success State */}
              {submitSuccess ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-8 sm:py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto shadow-lg border border-[#B58B50]/40">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#DFBD83]" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B58B50] font-semibold block">
                      Enquiry Received
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                      Thank You, {submitSuccess.submittedData.name.split(" ")[0]}.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                      Your enquiry regarding <strong className="text-[#173D34]">{submitSuccess.submittedData.enquiryType}</strong> has been received with strict confidentiality.
                    </p>
                  </div>

                  {/* Submission Receipt Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-[#E8EDE4] text-left max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8EDE4]">
                      <span className="text-[#59675F]">Reference ID:</span>
                      <span className="font-mono font-semibold text-[#173D34]">{submitSuccess.referenceId}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#59675F]">Reply Destination:</span>
                      <span className="font-medium text-[#173D34]">{submitSuccess.submittedData.email}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#59675F]">Phone:</span>
                      <span className="font-medium text-[#173D34]">{submitSuccess.submittedData.phone}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#59675F] font-light max-w-sm mx-auto">
                    Our team will review your note and respond based on schedule availability. If your query is urgent, please feel free to message us on WhatsApp.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={getWhatsAppUrl("Hello, I have submitted an enquiry on your website and would like to follow up.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs sm:text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#B58B50]/30 text-xs sm:text-sm font-medium transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#B58B50]" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                  
                  {/* Anti-spam hidden honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="_hp">Do not fill this field</label>
                    <input
                      type="text"
                      id="_hp"
                      name="_hp"
                      value={formData._hp}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block mb-0.5">Submission Error</strong>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-[#173D34] mb-1.5"
                    >
                      Full Name <span className="text-[#B58B50]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Ananya Sharma"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white text-[#24352D] text-sm sm:text-base border transition-all duration-200 outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-400 focus:ring-red-200"
                          : "border-[#E8EDE4] focus:border-[#B58B50] focus:ring-[#B58B50]/20"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Two-Column: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Field 2: Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-medium text-[#173D34] mb-1.5"
                      >
                        Email Address <span className="text-[#B58B50]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white text-[#24352D] text-sm sm:text-base border transition-all duration-200 outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[#E8EDE4] focus:border-[#B58B50] focus:ring-[#B58B50]/20"
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Field 3: Phone Number */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs sm:text-sm font-medium text-[#173D34] mb-1.5"
                      >
                        Phone Number <span className="text-[#B58B50]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white text-[#24352D] text-sm sm:text-base border transition-all duration-200 outline-none focus:ring-2 ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[#E8EDE4] focus:border-[#B58B50] focus:ring-[#B58B50]/20"
                        }`}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Field 4: Enquiry Type Dropdown */}
                  <div>
                    <label
                      htmlFor="enquiryType"
                      className="block text-xs sm:text-sm font-medium text-[#173D34] mb-1.5"
                    >
                      Enquiry Type <span className="text-[#B58B50]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        required
                        value={selectedEnquiryType}
                        onChange={handleSelectChange}
                        aria-invalid={!!errors.enquiryType}
                        aria-describedby={errors.enquiryType ? "type-error" : undefined}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white text-[#24352D] text-sm sm:text-base border appearance-none transition-all duration-200 outline-none focus:ring-2 cursor-pointer ${
                          errors.enquiryType
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[#E8EDE4] focus:border-[#B58B50] focus:ring-[#B58B50]/20"
                        }`}
                      >
                        {ENQUIRY_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#59675F]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.enquiryType && (
                      <p id="type-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.enquiryType}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 5: Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-medium text-[#173D34]"
                      >
                        Message <span className="text-[#B58B50]">*</span>
                      </label>
                      <span className="text-[11px] text-[#59675F] font-light">
                        Please avoid sharing sensitive medical records
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share what you are looking for (e.g. counselling consultation, internship batch availability, workshop request for your team)..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white text-[#24352D] text-sm sm:text-base border transition-all duration-200 outline-none focus:ring-2 resize-y ${
                        errors.message
                          ? "border-red-400 focus:ring-red-200"
                          : "border-[#E8EDE4] focus:border-[#B58B50] focus:ring-[#B58B50]/20"
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 6: Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-1 w-4 h-4 rounded border-[#B58B50] text-[#173D34] focus:ring-[#B58B50] cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                        I consent to Nair&apos;s Epigenetic Wellness contacting me regarding this enquiry in accordance with ethical privacy principles. <span className="text-[#B58B50]">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 pl-7">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#173D34] hover:bg-[#102E27] disabled:bg-[#173D34]/70 text-white text-sm sm:text-base font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 border border-[#B58B50]/40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[#DFBD83]" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send className="w-4 h-4 text-[#DFBD83]" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-[#59675F] font-light pt-1">
                    Your enquiry will be delivered securely to our administrative team.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
