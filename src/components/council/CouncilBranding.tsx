"use client";

import Image from "next/image";
import Link from "next/link";
import { COUNCIL_INFO } from "@/data/members";
import { Camera, Film } from "lucide-react";

interface CouncilBrandingProps {
  tenure?: string;
  badgeCode?: string;
}

export default function CouncilBranding({
  tenure = COUNCIL_INFO.tenureYear,
  badgeCode
}: CouncilBrandingProps) {
  return (
    <header className="w-full border-b border-cyan-500/20 bg-[#070F1E]/90 backdrop-blur-xl sticky top-0 z-30 transition-all duration-300 shadow-lg">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Left: Crest & Institution Media Team Brand */}
        <Link 
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 p-1 rounded-xl border border-cyan-400/40 bg-[#0B1A2E] flex items-center justify-center shadow-md group-hover:border-cyan-300 transition-colors">
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
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-cyan-400 uppercase leading-tight font-mono-tech">
                STUDENT COUNCIL
              </span>
              <span className="hidden sm:inline-block text-[10px] text-cyan-500/60">•</span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-white tracking-wider uppercase font-mono-tech">
                MEDIA TEAM 2026
              </span>
            </div>
            <div className="text-[9px] sm:text-[11px] font-sans-meta tracking-widest text-slate-400 uppercase font-medium">
              {COUNCIL_INFO.institutionShort}
            </div>
          </div>
        </Link>

        {/* Center / Right: Official Digital ID / Camera Live Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Recording / Camera Telemetry */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0B1A2E] border border-cyan-500/25 text-[10px] font-mono-tech text-slate-300">
            <div className="w-2 h-2 rounded-full rec-pulse-dot" />
            <span className="font-bold text-white tracking-wider">REC // 4K</span>
          </div>

          {/* Micro Archival Badge */}
          <div className="px-2.5 py-1 rounded-lg border border-cyan-400/40 bg-cyan-950/40 text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-wider text-cyan-300 uppercase whitespace-nowrap shadow-xs flex items-center gap-1.5">
            <Camera className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>{badgeCode || `MEDIA • ${tenure}`}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
