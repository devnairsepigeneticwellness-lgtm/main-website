"use client";

import React from "react";
import { MapPin, Phone, Mail, Navigation, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function LocationDirections() {
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Indore%2C+Madhya+Pradesh%2C+India";

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FCFAF6] border-t border-[#E8EDE4] relative overflow-hidden">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              FIND US
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
            Connect With N.E.W.
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
            Conveniently situated in Indore, Madhya Pradesh, serving clients locally for in-person work and worldwide through encrypted video consultations.
          </p>
        </div>

        {/* Two-Column Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (5 cols): Verified Location Details & Visiting Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Location Card */}
            <div className="rounded-3xl bg-[#F7F5EF] border border-[#B58B50]/30 p-7 sm:p-8 space-y-6 shadow-sm">
              
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#173D34] text-[#DFBD83] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#B58B50] font-semibold block">
                    Verified Centre &amp; Region
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#173D34] font-medium mt-0.5">
                    Indore, Madhya Pradesh
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59675F] mt-1 font-light leading-relaxed">
                    India &bull; Central Clinical Hub
                  </p>
                </div>
              </div>

              {/* Visiting Protocol Note */}
              <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E8EDE4] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#173D34] font-semibold">
                  <Clock className="w-4 h-4 text-[#B58B50] shrink-0" />
                  <span>Visiting Protocol</span>
                </div>
                <p className="text-[#59675F] font-light leading-relaxed">
                  To protect client confidentiality and guarantee dedicated, unhurried attention, all in-person clinic consultations in Indore are scheduled strictly by prior appointment.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 pt-1 border-t border-[#E8EDE4] text-xs sm:text-sm text-[#173D34]">
                <a
                  href="tel:+919446477779"
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#B58B50] shrink-0" />
                  <span className="font-medium">+91 94464 77779</span>
                </a>
                <a
                  href="mailto:ajit.navy@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B58B50] shrink-0" />
                  <span className="font-medium break-all">ajit.navy@gmail.com</span>
                </a>
              </div>

              {/* Directions Button */}
              <div className="pt-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#DFBD83]" />
                  <span>Get Directions on Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
                </a>
              </div>

            </div>

            {/* Global Remote Badge */}
            <div className="rounded-2xl bg-[#E8EDE4]/80 border border-[#9AAA8A]/40 p-4 sm:p-5 flex items-center gap-3.5 text-xs text-[#24352D]">
              <ShieldCheck className="w-5 h-5 text-[#B58B50] shrink-0" />
              <p className="font-light leading-relaxed">
                <strong className="font-semibold text-[#173D34]">Worldwide Online Access:</strong> Clients residing outside Indore can access individual counselling and hypnotherapy sessions via end-to-end encrypted video appointments.
              </p>
            </div>

          </div>

          {/* Right Column (7 cols): Responsive Map Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#B58B50]/30 shadow-xl aspect-[16/11] sm:aspect-[16/10] bg-[#102E27]">
              
              {/* Google Maps Embed Centered on Indore, MP */}
              <iframe
                title="Nair's Epigenetic Wellness Location Map - Indore, Madhya Pradesh"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55529718429!2d75.793809!3d22.724107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(1.02) saturate(0.9)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Clearly Marked Location Placeholder Card Overlay (Strict Requirement) */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-[#FCFAF6]/95 backdrop-blur-md border border-[#B58B50]/40 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[#B58B50] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#B58B50]" />
                    <span>Verified Clinic Location</span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-base text-[#173D34] font-medium">
                    Indore Centre, Madhya Pradesh
                  </h4>
                  <p className="text-[11px] text-[#59675F] font-light">
                    Exact office suite &amp; arrival details are shared with clients prior to scheduled sessions.
                  </p>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#B58B50] text-white text-xs font-medium transition-colors shrink-0"
                >
                  <span>Open Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

