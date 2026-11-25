import React from "react";

interface AdminStickyHeaderProps {
  children: React.ReactNode;
}

/**
 * Sticky top header bar for all admin dashboard views that remains pinned
 * when scrolling page content (below the mobile top bar on small screens).
 */
export default function AdminStickyHeader({ children }: AdminStickyHeaderProps) {
  return (
    <header className="sticky top-14 lg:top-0 z-30 -mx-4 -mt-4 px-4 pt-4 pb-5 sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6 lg:-mx-8 lg:-mt-8 lg:px-8 lg:pt-7 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#E8EDE4] shadow-[0_2px_12px_-6px_rgba(16,46,39,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {children}
    </header>
  );
}
