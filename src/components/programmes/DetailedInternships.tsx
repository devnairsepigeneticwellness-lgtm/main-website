"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, CheckCircle2, BookOpen, Clock, Calendar, MapPin, Award, Layers } from "lucide-react";

interface DetailedInternshipsProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function DetailedInternships({ onOpenBooking }: DetailedInternshipsProps) {
  const learningAreas = [
    "Fundamentals of psychological wellbeing",
    "Counselling-related concepts",
    "Understanding human behaviour",
    "Professional communication",
    "Reflective learning",
    "Practical professional awareness",
  ];

  const placeholderDetails = [
    { label: "Programme Duration", value: "Confirmed upon official cohort announcement", icon: Clock },
    { label: "Eligibility", value: "Undergraduate & postgraduate students in psychology and allied disciplines", icon: GraduationCap },
    { label: "Delivery Mode", value: "Indore Centre & Secure Online Sessions", icon: MapPin },
    { label: "Learning Structure", value: "Structured modular curriculum with guided reflection", icon: Layers },
    { label: "Programme Schedule", value: "Shared upon batch commencement", icon: Calendar },
    { label: "Application Process", value: "Expression of interest followed by brief orientation interview", icon: Award },
  ];

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent("Hello, I would like to enquire about the Internship Programmes at Nair's Epigenetic Wellness.");
    window.open(`https://wa.me/919446477779?text=${text}`, "_blank");
  };

  return (
    <section id="internships" className="py-20 lg:py-28 bg-[#E8EDE4]/40 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Visual & Structural Information Panel on Warm Sage */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Visual Panel */}
            <div className="relative rounded-3xl bg-[#173D34] text-[#F7F5EF] p-8 sm:p-10 border border-[#B58B50]/30 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#DFBD83]/20 border border-[#DFBD83]/40 flex items-center justify-center text-[#DFBD83] mb-6">
                  <GraduationCap className="w-7 h-7" strokeWidth={1.4} />
                </div>
                <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#DFBD83] font-semibold block mb-2">
                  PRACTICAL LEARNING COHORTS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F7F5EF] leading-snug">
                  Experiential Clinical &amp; Counselling Immersion
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                  Bridge academic theory with real-world understanding through supervised guidance, case discussions, and ethical awareness.
                </p>
              </div>
            </div>

            {/* Additional Information Area (Placeholders) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-sm space-y-4">
              <span className="text-xs font-sans font-bold tracking-widest text-[#B58B50] uppercase block pb-2 border-b border-[#E8EDE4]">
                Programme Information &amp; Logistics
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {placeholderDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#173D34]">
                        <Icon className="w-3.5 h-3.5 text-[#B58B50] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <p className="text-xs text-[#59675F] font-light leading-snug">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Editorial Content & Action */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#B58B50]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                  FOR STUDENTS &amp; ASPIRING PROFESSIONALS
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
                Learn Beyond the{" "}
                <span className="italic text-[#B58B50] font-light">Classroom.</span>
              </h2>
            </div>

            <div className="space-y-4 font-sans text-base sm:text-lg text-[#59675F] font-light leading-relaxed">
              <p>
                Internship programmes at N.E.W. are intended to support students and aspiring professionals interested in developing an understanding of psychology, counselling, mental health and related areas of wellbeing.
              </p>
              <p>
                Learning activities may include guided discussions, conceptual exploration, reflection and opportunities to develop relevant professional skills, depending on the approved programme structure.
              </p>
            </div>

            {/* Learning Areas Grid */}
            <div className="bg-white rounded-3xl p-8 border border-[#B58B50]/20 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173D34] mb-3">
                <BookOpen className="w-4 h-4 text-[#B58B50]" />
                <span>Core Learning Areas</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {learningAreas.map((area) => (
                  <div key={area} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#24352D]/85 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking("Psychology Internship Programme")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <span>Enquire About Internships</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent border border-[#173D34]/30 hover:border-[#B58B50] text-[#173D34] text-sm font-medium tracking-wide transition-all"
              >
                <span>WhatsApp Enquiry</span>
                <ArrowUpRight className="w-4 h-4 text-[#B58B50]" />
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
