"use client";

import Image from "next/image";
import { COUNCIL_INFO } from "@/data/members";

export default function CouncilFooter() {
  return (
    <footer className="w-full mt-12 sm:mt-16 pt-10 sm:pt-12 pb-12 sm:pb-16 px-4 border-t-2 border-[#641B18]/20 bg-[#EFE5D3]/70 text-center relative">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 bg-[#F5EFE6] text-[#641B18] text-[10px] sm:text-xs font-serif font-bold tracking-widest uppercase select-none">
        ❖ ❖ ❖
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        {/* Crest Logo */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 p-1 rounded-full border border-[#641B18]/30 bg-[#FAF7F0] flex items-center justify-center shadow-xs">
          <Image
            src={COUNCIL_INFO.logoPath}
            alt="Student Council Crest"
            width={52}
            height={52}
            className="object-contain"
          />
        </div>

        {/* Institution & Title */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="text-xs sm:text-base font-serif font-bold tracking-wider sm:tracking-widest text-[#641B18] uppercase">
            {COUNCIL_INFO.councilName} • {COUNCIL_INFO.tenureYear}
          </div>
          <div className="text-[11px] sm:text-sm font-sans-meta tracking-wide text-[#332720] font-semibold">
            {COUNCIL_INFO.institution}
          </div>
          <div className="pt-1 text-[10px] sm:text-xs font-sans-meta font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#75502F] uppercase">
            &ldquo;{COUNCIL_INFO.motto}&rdquo;
          </div>
          <p className="text-xs font-script text-base text-[#641B18] pt-0.5">
            {COUNCIL_INFO.visionStatement}
          </p>
        </div>

        {/* Archival Notice */}
        <div className="pt-3 sm:pt-4 border-t border-[#641B18]/15 w-full flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-sans-meta text-[#75502F] gap-1.5 sm:gap-2 font-medium">
          <span>Official Student Council Digital ID Extension</span>
          <span>© {COUNCIL_INFO.copyrightYear} {COUNCIL_INFO.councilName}</span>
        </div>
      </div>
    </footer>
  );
}
