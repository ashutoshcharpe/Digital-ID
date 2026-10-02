"use client";

import Image from "next/image";
import { COUNCIL_INFO } from "@/data/members";
import { Camera, Film } from "lucide-react";

export default function CouncilFooter() {
  return (
    <footer className="w-full mt-12 sm:mt-16 pt-10 sm:pt-12 pb-12 sm:pb-16 px-4 border-t border-cyan-500/20 bg-[#050C17]/90 text-center relative">
      {/* Decorative Top Camera Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 py-0.5 rounded-full bg-[#071324] border border-cyan-500/40 text-cyan-400 text-[10px] sm:text-xs font-mono-tech font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md select-none">
        <Camera className="w-3 h-3 text-cyan-400" />
        <span>STUDENT COUNCIL • MEDIA TEAM</span>
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        {/* Crest Logo */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 p-1.5 rounded-2xl border border-cyan-400/40 bg-[#09182B] flex items-center justify-center shadow-lg">
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
          <div className="text-xs sm:text-base font-mono-tech font-bold tracking-wider sm:tracking-widest text-cyan-400 uppercase">
            {COUNCIL_INFO.councilName} • MEDIA TEAM {COUNCIL_INFO.tenureYear}
          </div>
          <div className="text-[11px] sm:text-sm font-sans tracking-wide text-slate-300 font-semibold">
            {COUNCIL_INFO.institution}
          </div>
          <div className="pt-1 text-[10px] sm:text-xs font-mono-tech font-bold tracking-[0.15em] sm:tracking-[0.2em] text-cyan-300/80 uppercase">
            &ldquo;{COUNCIL_INFO.motto}&rdquo;
          </div>
          <p className="text-xs font-mono-tech text-cyan-400/70 pt-0.5 uppercase tracking-wider">
            {COUNCIL_INFO.visionStatement}
          </p>
        </div>

        {/* Archival Notice */}
        <div className="pt-3 sm:pt-4 border-t border-cyan-500/15 w-full flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-slate-400 gap-1.5 sm:gap-2 font-medium">
          <span>Official Student Council Media Team Digital ID</span>
          <span>© {COUNCIL_INFO.copyrightYear} {COUNCIL_INFO.councilName}</span>
        </div>
      </div>
    </footer>
  );
}
