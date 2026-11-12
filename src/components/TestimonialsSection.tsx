"use client";

import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Ajit Sir’s approach provided me with the clarity I had been searching for for years. He doesn’t offer generic platitudes; his psychological insights and calm presence helped me unpack deeply rooted anxiety and reclaim control of my life.",
      author: "P. Sharma",
      role: "Corporate Executive",
      context: "Individual Psychotherapy & Renewal",
      location: "Indore",
    },
    {
      quote:
        "The internship program at Nair’s Epigenetic Wellness was transformative for my clinical perspective. Ajit Sir’s emphasis on ethical practice, case formulation, and non-violent communication gave us the confidence to bridge academic theory with true human empathy.",
      author: "A. Mukherjee",
      role: "M.Sc. Psychology Graduate",
      context: "Clinical Internship Cohort",
      location: "Mumbai",
    },
    {
      quote:
        "Our senior leadership team attended the Workplace Wellbeing & Stress Mastery seminar. It was grounded in hard neuroscience and practical daily strategies that actually work in high-pressure environments. Exceptional facilitation.",
      author: "R. Verma",
      role: "Director of People & Culture",
      context: "Corporate Wellbeing Program",
      location: "Bangalore",
    },
    {
      quote:
        "In the hypnotherapy and mindfulness sessions, I learned how to calm my physical nervous system during panic surges. The tools I developed here have stayed with me as my daily grounding foundation.",
      author: "K. Nair",
      role: "Consultant & Parent",
      context: "Clinical Hypnotherapy & Mindfulness",
      location: "Kochi / Online",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#EAF0E7] border-t border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                Client Experiences &amp; Reflections
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              Real voices.{" "}
              <span className="italic text-[#7D6335]">Meaningful transformations.</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#B8C9B5] text-[#1E3F35] bg-[#DCE7DA] hover:bg-[#1E3F35] hover:text-[#DFBD83] flex items-center justify-center transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#B8C9B5] text-[#1E3F35] bg-[#DCE7DA] hover:bg-[#1E3F35] hover:text-[#DFBD83] flex items-center justify-center transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid on Desktop, Slide on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            testimonials[currentIndex],
            testimonials[(currentIndex + 1) % testimonials.length],
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F2F6F0] rounded-3xl p-8 sm:p-10 border border-[#C8D6C6] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-[#7D6335]/25 absolute top-8 right-8 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#7D6335] text-[#7D6335]" />
                  ))}
                  <span className="text-xs text-[#556A5E] ml-2 font-medium">
                    Verified Reflection
                  </span>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#173D34] font-normal italic leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#C8D6C6] flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-semibold text-sm sm:text-base text-[#173D34]">
                    {item.author}
                  </h4>
                  <span className="block text-xs text-[#556A5E]">
                    {item.role} &bull; {item.location}
                  </span>
                </div>
                <span className="text-[11px] font-sans font-medium px-3 py-1 rounded-full bg-[#DCE7DA] text-[#1E3F35] border border-[#B8C9B5]">
                  {item.context}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Confidentiality Notice */}
        <p className="text-center text-xs text-[#556A5E] font-light mt-10">
          *Client names and identifying specifics are respectfully modified to preserve strict clinical confidentiality in compliance with psychological ethics codes.
        </p>

      </div>
    </section>
  );
}

