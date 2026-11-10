"use client";

import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryImage } from "@/lib/supabase/types";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B221C]/95 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Top Bar with Counter & Close */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 sm:p-6 z-20 text-[#F7F5EF]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#DFBD83]">
            Photograph {currentIndex + 1} of {images.length}
          </span>
          {currentImage.category && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#173D34] text-[10px] text-[#DFBD83] border border-[#B58B50]/30">
              {currentImage.category}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#173D34]/80 text-[#DFBD83] hover:text-white hover:bg-[#102E27] border border-[#B58B50]/30 transition-all focus:outline-none"
          aria-label="Close fullscreen lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 sm:p-12 flex flex-col items-center justify-center">
        <div className="relative max-h-full max-w-full overflow-hidden rounded-2xl shadow-2xl border border-[#B58B50]/20 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.image_path}
            alt={currentImage.caption || "Workshop Gallery Photo"}
            className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl select-none"
          />
        </div>

        {/* Caption Bar */}
        {(currentImage.caption || currentImage.event_title) && (
          <div className="mt-4 max-w-2xl text-center px-4">
            {currentImage.event_title && (
              <span className="text-xs text-[#DFBD83] font-serif block mb-0.5">
                {currentImage.event_title}
              </span>
            )}
            {currentImage.caption && (
              <p className="text-sm text-[#F7F5EF]/90 font-light leading-relaxed">
                {currentImage.caption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-[#173D34]/90 text-[#DFBD83] hover:text-white hover:bg-[#102E27] border border-[#B58B50]/40 transition-all shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-[#173D34]/90 text-[#DFBD83] hover:text-white hover:bg-[#102E27] border border-[#B58B50]/40 transition-all shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83]"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </div>
  );
}
