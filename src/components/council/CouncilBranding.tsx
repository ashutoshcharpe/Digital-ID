"use client";

import Image from "next/image";
import Link from "next/link";
import { COUNCIL_INFO } from "@/data/members";

interface CouncilBrandingProps {
  tenure?: string;
  badgeCode?: string;
}

export default function CouncilBranding({
  tenure = COUNCIL_INFO.tenureYear,
  badgeCode
}: CouncilBrandingProps) {
  return (
    <header className="w-full border-b border-[#641B18]/15 bg-[#FAF7F0]/90 backdrop-blur-md sticky top-0 z-30 transition-all duration-300 shadow-2xs">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
        {/* Left: Crest & Institution Brand */}
        <Link 
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 p-0.5 rounded-full border border-[#641B18]/25 bg-[#F5EEE2] flex items-center justify-center shadow-xs">
            <Image
              src={COUNCIL_INFO.logoPath}
              alt="AISSMS IOIT Student Council Crest"
              width={36}
              height={36}
              priority
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-[11px] sm:text-sm font-serif font-bold tracking-wider text-[#641B18] uppercase leading-tight">
              STUDENT COUNCIL
            </div>
            <div className="text-[9px] sm:text-[11px] font-sans-meta tracking-widest text-[#75502F] uppercase font-semibold">
              {COUNCIL_INFO.institutionShort}
            </div>
          </div>
        </Link>

        {/* Center / Right: Official Digital Publication Label */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:block text-right">
            <span className="font-script text-base text-[#75502F] pr-1">official dispatch</span>
            <div className="text-[11px] font-sans-meta font-bold tracking-widest text-[#18110E] uppercase">
              TENURE {tenure}
            </div>
          </div>

          {/* Micro Archival Badge */}
          <div className="px-2 sm:px-2.5 py-1 rounded border border-[#641B18]/30 bg-[#641B18]/10 text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-wider text-[#641B18] uppercase whitespace-nowrap">
            {badgeCode || `TENURE ${tenure}`}
          </div>
        </div>
      </div>
    </header>
  );
}
