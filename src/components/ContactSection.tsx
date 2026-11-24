"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldAlert, CheckCircle2, ArrowUpRight } from "lucide-react";
import {
  CONTACT_INFO,
  InstagramIcon,
  LinkedInIcon,
  SOCIAL_LINKS,
  getWhatsAppUrl,
} from "@/components/SocialIcons";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Counselling",
    format: "Online Video Session",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#E8EFE5] text-[#24352D] relative overflow-hidden border-t border-[#C8D6C6]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8D6C6]/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DEE7DB]/60 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              Get in Touch
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Your wellbeing journey can{" "}
            <span className="italic text-[#7D6335]">begin with a conversation.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            You do not need to have everything figured out before reaching out.
            Share what you are experiencing, and our team will help clarify appropriate options and thoughtful next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Direct Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Cards */}
            <div className="space-y-4">
              <a
                href={CONTACT_INFO.phoneHref}
                className="group p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#F6FAF4] flex items-start gap-4 transition-all block shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#1E3F35] group-hover:text-[#DFBD83] transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7D6335] font-semibold block">
                    Direct Consultation Line
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#173D34] group-hover:text-[#7D6335] transition-colors block mt-0.5">
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                  <span className="text-xs text-[#556A5E] mt-1 block">
                    Available for consultations &amp; program inquiries
                  </span>
                </div>
              </a>

              <a
                href="mailto:ajit.navy@gmail.com"
                className="group p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#F6FAF4] flex items-start gap-4 transition-all block shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#1E3F35] group-hover:text-[#DFBD83] transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7D6335] font-semibold block">
                    Confidential Email
                  </span>
                  <span className="font-serif text-lg sm:text-xl text-[#173D34] group-hover:text-[#7D6335] transition-colors block mt-0.5 break-all">
                    ajit.navy@gmail.com
                  </span>
                  <span className="text-xs text-[#556A5E] mt-1 block">
                    Replies typically within 24 business hours
                  </span>
                </div>
              </a>

              <div className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7D6335] font-semibold block">
                    Location &amp; Delivery
                  </span>
                  <span className="font-serif text-xl text-[#173D34] block mt-0.5">
                    Indore, Madhya Pradesh, India
                  </span>
                  <span className="text-xs text-[#556A5E] mt-1 block">
                    In-person sessions in Indore &bull; Worldwide secure video consultations
                  </span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="p-6 rounded-2xl bg-[#DEE7DB] border border-[#B8C9B5] flex items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-xs text-[#173D34] font-semibold uppercase tracking-wider block">
                  Prefer Messaging?
                </span>
                <p className="text-sm text-[#384D42] font-medium mt-0.5">
                  Chat directly via WhatsApp
                </p>
              </div>
              <a
                href={getWhatsAppUrl("Hello, I would like to enquire about services at Nair's Epigenetic Wellness")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Social & Professional Connect */}
            <div className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] shadow-xs">
              <span className="text-xs uppercase tracking-wider text-[#7D6335] font-semibold block mb-1">
                Official Profiles &amp; Updates
              </span>
              <p className="text-xs text-[#556A5E] mb-4 font-light">
                Follow our clinical perspectives, psychoeducational updates, and professional milestones.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#EEF4EC] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center group-hover:bg-[#1E3F35] group-hover:text-[#DFBD83] transition-all">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#173D34] block group-hover:text-[#7D6335] transition-colors">
                        Instagram
                      </span>
                      <span className="text-[11px] text-[#556A5E] block">
                        {SOCIAL_LINKS.instagram.handle}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7D6335] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#EEF4EC] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center group-hover:bg-[#1E3F35] group-hover:text-[#DFBD83] transition-all">
                      <LinkedInIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#173D34] block group-hover:text-[#7D6335] transition-colors">
                        LinkedIn
                      </span>
                      <span className="text-[11px] text-[#556A5E] block">
                        {SOCIAL_LINKS.linkedin.handle}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7D6335] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Emergency Helplines Notice */}
            <div className="p-5 rounded-2xl bg-[#E4EDE1] border border-[#C8D6C6] text-xs text-[#465A4F] space-y-1.5">
              <div className="flex items-center gap-2 text-[#7D6335] font-medium">
                <ShieldAlert className="w-4 h-4" />
                <span>Urgent Care &amp; Crisis Support</span>
              </div>
              <p className="leading-relaxed font-light">
                If you or someone you know is undergoing an acute psychological crisis or feelings of self-harm, please reach out immediately to 24/7 national helplines: <strong>Tele-MANAS (14416)</strong> or <strong>KIRAN (1800-599-0019)</strong>.
              </p>
            </div>

          </div>

          {/* Right Column (7 cols): Consultation Booking Form */}
          <div className="lg:col-span-7 bg-[#F2F6F0] rounded-3xl p-8 sm:p-10 border border-[#C8D6C6] shadow-sm">
            
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block">
                Appointment Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] mt-1">
                Schedule a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#465A4F] mt-1 font-light">
                Fill out the form below and we will contact you to confirm a mutually convenient appointment.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] text-center space-y-4 animate-in fade-in duration-400">
                <div className="w-16 h-16 rounded-full bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-[#173D34]">Thank You, {formState.name}</h4>
                <p className="text-sm text-[#465A4F] max-w-md mx-auto font-light leading-relaxed">
                  Your consultation request for <strong className="text-[#1E3F35]">{formState.service}</strong> has been received with strict confidentiality. Our team will contact you shortly at <span className="underline font-medium text-[#173D34]">{formState.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#1E3F35] text-[#F7F5EF] text-xs font-semibold hover:bg-[#285246] transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                      Area of Interest
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none transition-colors"
                    >
                      <option value="Counselling">Counselling</option>
                      <option value="Psychotherapy">Psychotherapy</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Online Rehabilitation">Online Rehabilitation</option>
                      <option value="Renewal Programme">Renewal Programme</option>
                      <option value="Mindfulness">Mindfulness</option>
                      <option value="Professional Internship">Psychology Internship</option>
                      <option value="Corporate Workshop">Corporate / Institutional Training</option>
                      <option value="Exploratory Consultation">Exploratory Consultation (Unsure)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                      Preferred Format
                    </label>
                    <select
                      value={formState.format}
                      onChange={(e) => setFormState({ ...formState, format: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none transition-colors"
                    >
                      <option value="Online Video Session">Online Secure Video Session</option>
                      <option value="In-Person (Indore)">In-Person Consultation (Indore Clinic)</option>
                      <option value="Initial Phone Call">Initial Phone Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E3F35] uppercase tracking-wider mb-2">
                    How Can We Support You? (Brief Note)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us a little about what you are seeking or any specific questions you have..."
                    className="w-full px-4 py-3 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] focus:border-[#1E3F35] focus:bg-[#EEF4EC] text-[#173D34] text-sm focus:outline-none placeholder:text-[#6B8274] resize-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] font-semibold text-sm tracking-wide shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Sending Request..." : "Request Consultation Appointment"}</span>
                  </button>
                </div>

                <p className="text-center text-[11px] text-[#556A5E] font-light">
                  All inquiries are kept under strict clinical confidentiality. We respect your privacy.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

