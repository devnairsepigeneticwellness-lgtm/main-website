"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Heart, MessageCircle } from "lucide-react";
import { InstagramIcon, LinkedInIcon, SOCIAL_LINKS } from "@/components/SocialIcons";

export default function Footer({ onOpenBooking }: { onOpenBooking?: () => void } = {}) {
  return (
    <footer className="bg-[#1B362D] text-[#E8EDE4] border-t border-[#C8D6C6]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Gold Subtle Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2C4E41]">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#274B3E] text-[#DFBD83] flex items-center justify-center font-serif text-sm font-semibold border border-[#C8D6C6]/30">
                N.E.W.
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-white block">
                  Nair&apos;s Epigenetic Wellness
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#DFBD83] block">
                  Understanding · Supporting · Wellbeing
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed max-w-sm">
              Founded by Ajit Kumar Nair, Counselling Psychologist, RCI Registered Rehabilitation Counselor, and Clinical Hypnotherapist. Integrating psychological science, therapeutic skills, and epigenetic awareness to foster meaningful, lasting human growth.
            </p>

            <div className="pt-2">
              <Link
                href="/book-consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#274B3E] hover:bg-[#345F50] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide border border-[#C8D6C6]/30 transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBD83] block">
              Therapeutic Pathways
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-light text-[#E8EDE4]/80">
              <li><Link href="/services#counselling" className="hover:text-[#DFBD83] transition-colors">Individual Counselling</Link></li>
              <li><Link href="/services#counselling" className="hover:text-[#DFBD83] transition-colors">Cognitive Psychotherapy (CBT/REBT)</Link></li>
              <li><Link href="/services#hypnotherapy" className="hover:text-[#DFBD83] transition-colors">Clinical Hypnotherapy</Link></li>
              <li><Link href="/services#rehabilitation" className="hover:text-[#DFBD83] transition-colors">Online Rehabilitation (RCI)</Link></li>
              <li><Link href="/services#renewal" className="hover:text-[#DFBD83] transition-colors">The Renewal Programme</Link></li>
              <li><Link href="/services#support-plans" className="hover:text-[#DFBD83] transition-colors">Mindfulness &amp; Somatic Calm</Link></li>
              <li><Link href="/assessment" className="hover:text-[#DFBD83] transition-colors font-medium text-[#DFBD83]">✦ Self-Assessment &amp; Check-In</Link></li>
            </ul>
            <div className="pt-1">
              <Link
                href="/services"
                className="text-xs text-[#DFBD83] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>View Complete Services Overview</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Professional Training (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBD83] block">
              Learning &amp; Growth
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-light text-[#E8EDE4]/80">
              <li><Link href="/professionals" className="hover:text-[#DFBD83] transition-colors">Our Professionals</Link></li>
              <li><Link href="/programmes#internships" className="hover:text-[#DFBD83] transition-colors">Psychology Internships</Link></li>
              <li><Link href="/programmes#mentorship" className="hover:text-[#DFBD83] transition-colors">Practitioner Mentorship</Link></li>
              <li><Link href="/programmes#corporate" className="hover:text-[#DFBD83] transition-colors">Corporate Workshops</Link></li>
              <li><Link href="/programmes#educational" className="hover:text-[#DFBD83] transition-colors">School Mental Health</Link></li>
              <li><Link href="/events" className="hover:text-[#DFBD83] transition-colors">Workshops &amp; Events Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBD83] block">
              Contact &amp; Clinic
            </span>
            <div className="space-y-3 text-xs sm:text-sm text-[#E8EDE4]/80 font-light">
              <a href="tel:+919446477779" className="flex items-center gap-2.5 hover:text-[#DFBD83] transition-colors">
                <Phone className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>+91 94464 77779</span>
              </a>
              <a href="mailto:ajit.navy@gmail.com" className="flex items-center gap-2.5 hover:text-[#DFBD83] transition-colors">
                <Mail className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>ajit.navy@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919446477779?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Nair%27s%20Epigenetic%20Wellness."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#DFBD83] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>WhatsApp: +91 94464 77779</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFBD83] shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India (In-person &amp; Global Online Sessions)</span>
              </div>
            </div>

            {/* Social & Professional Connect */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFBD83] block mb-2">
                Follow &amp; Connect
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274B3E] hover:bg-[#345F50] text-[#E8EDE4] hover:text-[#DFBD83] text-xs font-medium border border-[#C8D6C6]/20 transition-all group"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#DFBD83] group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274B3E] hover:bg-[#345F50] text-[#E8EDE4] hover:text-[#DFBD83] text-xs font-medium border border-[#C8D6C6]/20 transition-all group"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#DFBD83] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Crisis Notice */}
        <div className="py-6 border-b border-[#2C4E41] text-[11px] text-[#E8EDE4]/70 font-light leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#DFBD83] font-medium shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Crisis &amp; Emergency Disclaimer:</span>
          </div>
          <p className="flex-1">
            Nair&apos;s Epigenetic Wellness provides planned psychological counselling, psychotherapy, and training. We do not provide immediate 24/7 crisis or suicide emergency services. In acute situations, please call national emergency helplines: <strong>Tele-MANAS (14416)</strong>, <strong>KIRAN (1800-599-0019)</strong>, or visit your nearest hospital emergency department.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8EDE4]/60">
          <p>
            &copy; 2026 Nair&apos;s Epigenetic Wellness (N.E.W.). All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DFBD83] transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>Instagram</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DFBD83] transition-colors flex items-center gap-1.5"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[#C8D6C6]/30 hidden sm:inline">&bull;</span>
            <Link href="/about" className="hover:text-[#DFBD83] transition-colors">Privacy &amp; Confidentiality</Link>
            <Link href="/about" className="hover:text-[#DFBD83] transition-colors">Clinical Ethics</Link>
            <Link href="/contact" className="hover:text-[#DFBD83] transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
