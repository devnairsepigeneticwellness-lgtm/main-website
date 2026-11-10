"use client";

import React from "react";
import { Search } from "lucide-react";

export type EventFilterType = "all" | "upcoming" | "completed" | "online" | "offline" | "hybrid";

interface EventsFilterBarProps {
  activeFilter: EventFilterType;
  onFilterChange: (filter: EventFilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function EventsFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: EventsFilterBarProps) {
  const filterTabs: { id: EventFilterType; label: string }[] = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "online", label: "Online" },
    { id: "offline", label: "In-Person" },
    { id: "hybrid", label: "Hybrid" },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#B58B50]/20 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeFilter === tab.id
                ? "bg-[#173D34] text-[#DFBD83] shadow-xs"
                : "bg-[#F7F5EF] text-[#24352D]/80 hover:bg-[#E8EDE4] hover:text-[#173D34]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-64">
        <Search className="w-4 h-4 text-[#B58B50] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search workshops..."
          className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F7F5EF] text-xs text-[#24352D] placeholder-[#59675F]/60 border border-transparent focus:border-[#B58B50] focus:bg-white focus:outline-none transition-all"
        />
      </div>
    </div>
  );
}
