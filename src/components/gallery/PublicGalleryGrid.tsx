"use client";

import React, { useState } from "react";
import { Camera, ZoomIn } from "lucide-react";
import { GalleryImage } from "@/lib/supabase/types";
import Lightbox from "./Lightbox";

interface PublicGalleryGridProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

export default function PublicGalleryGrid({
  images,
  title = "Moments from Our Workshops",
  subtitle = "Glimpses into experiential learning, reflective dialogues, and collaborative training cohorts.",
}: PublicGalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Extract categories
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-[#E8EDE4]/40 border border-[#B58B50]/20 max-w-xl mx-auto my-8">
        <Camera className="w-10 h-10 text-[#B58B50] mx-auto mb-3 opacity-60" />
        <h4 className="font-serif text-lg font-medium text-[#173D34]">Gallery Under Curation</h4>
        <p className="text-xs text-[#59675F] mt-1 font-light">
          Photographs from recent workshops will be published here soon.
        </p>
      </div>
    );
  }

  return (
    <section id="gallery" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
              Visual Highlights
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34] tracking-tight">
            {title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#59675F] mt-2 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Filter Pills (if multiple categories) */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                    : "bg-white text-[#24352D]/80 hover:bg-[#E8EDE4] border border-[#B58B50]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#102E27] border border-[#B58B50]/20 shadow-sm hover:shadow-xl hover:border-[#B58B50] transition-all duration-300 cursor-pointer aspect-4/3 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.image_path}
                alt={img.caption || "Workshop Photograph"}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Overlay & Hover Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B221C]/90 via-[#0B221C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <div className="flex items-center justify-between text-white">
                  <div>
                    {img.event_title && (
                      <span className="text-[11px] uppercase tracking-wider text-[#DFBD83] font-semibold block line-clamp-1">
                        {img.event_title}
                      </span>
                    )}
                    {img.caption && (
                      <p className="text-xs text-[#E8EDE4] font-light mt-0.5 line-clamp-2">
                        {img.caption}
                      </p>
                    )}
                  </div>
                  <div className="p-2 rounded-full bg-[#173D34]/90 text-[#DFBD83] shrink-0 ml-3">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
