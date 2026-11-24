"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { getProfessionalsByIds } from "@/data/professionalsData";

interface PractitionerLinksProps {
  professionalIds: string[];
  label?: string;
  onNavigate?: () => void;
}

/**
 * Renders clickable practitioner profile links pointing to each specialist's
 * section on /professionals#<id>.
 */
export default function PractitionerLinks({
  professionalIds,
  label = "Practitioners Offering This",
  onNavigate,
}: PractitionerLinksProps) {
  const practitioners = getProfessionalsByIds(professionalIds);
  if (practitioners.length === 0) return null;

  return (
    <div className="pt-3 border-t border-[#C8D6C6]/70">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7D6335] mb-2">
        <Users className="w-3.5 h-3.5 shrink-0" />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {practitioners.map((prof) => (
          <Link
            key={prof.id}
            href={`/professionals#${prof.id}`}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white hover:bg-[#173D34] text-[#173D34] hover:text-[#DFBD83] text-[11px] font-medium border border-[#C8D6C6] hover:border-[#173D34] transition-colors shadow-2xs"
          >
            <span className="w-4 h-4 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center font-serif text-[9px] font-bold shrink-0">
              {prof.initials}
            </span>
            <span>{prof.name}</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </Link>
        ))}
      </div>
    </div>
  );
}
