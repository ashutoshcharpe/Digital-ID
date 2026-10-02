"use client";

import Image from "next/image";
import { CouncilMember } from "@/data/members";
import CouncilBranding from "./CouncilBranding";
import SocialLinks from "./SocialLinks";
import CouncilFooter from "./CouncilFooter";
import FluidBackground from "./FluidBackground";
import BurnGlowCard from "./BurnGlowCard";
import { 
  Quote, 
  Camera, 
  Layers,
  Sparkles,
  Film,
  Video,
  Aperture,
  Sliders
} from "lucide-react";

interface MemberProfileProps {
  member: CouncilMember;
}

export default function MemberProfile({ member }: MemberProfileProps) {
  return (
    <main className="relative min-h-screen w-full bg-[#050B14] text-[#F0F9FF] selection:bg-[#00F0FF] selection:text-[#040810] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* INTERACTIVE FLUID BACKGROUND WITH HOLLOW / FLUID-FILLED MEDIA TEAM TEXT */}
      {/* ========================================================================= */}
      <FluidBackground />

      {/* Top Media Team Publication Header */}
      <CouncilBranding tenure={member.tenure} badgeCode={member.badgeCode} />

      {/* Main Editorial Publication Spread */}
      <div className="relative z-10 w-full max-w-4xl px-3.5 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14 mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO / CINEMATIC MEDIA TEAM DIGITAL ID CARD */}
        {/* ========================================================================= */}
        <BurnGlowCard className="p-4 sm:p-7 md:p-10 shadow-2xl border border-cyan-500/30">
          
          {/* Top Camera Viewfinder Header Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 border-b border-cyan-500/20 pb-3.5 mb-5 sm:mb-6 text-center sm:text-left">
            <div className="text-[9px] sm:text-[10px] font-mono-tech text-cyan-400/90 font-semibold select-none flex items-center gap-1.5">
              <span className="text-cyan-400">❖</span>
              <span>STUDENT COUNCIL // MEDIA TEAM</span>
            </div>

            {/* Glowing Cyan Media Team Badge */}
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full cyan-neon-badge text-cyan-200 shadow-md text-[9px] sm:text-[10px] md:text-[11px] font-mono-tech font-bold tracking-wider uppercase">
              <div className="w-2 h-2 rounded-full rec-pulse-dot shrink-0" />
              <span>OFFICIAL MEDIA TEAM CREDENTIAL</span>
            </div>

            <div className="text-[9px] sm:text-[10px] font-mono-tech text-cyan-400/90 font-semibold select-none flex items-center gap-1.5">
              <span>AISSMS IOIT • {member.tenure}</span>
              <span className="text-cyan-400">❖</span>
            </div>
          </div>

          {/* Spread Grid: Left Viewfinder Portrait / Right Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
            
            {/* LEFT COLUMN: Cinematic Camera Viewfinder Portrait Mount */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-[210px] sm:max-w-[240px] md:max-w-[260px] mx-auto">
                
                {/* Viewfinder Photo Mount Frame */}
                <div className="media-photo-viewfinder relative">
                  
                  {/* Four Electric Cyan Viewfinder Corner Brackets */}
                  <div className="viewfinder-corner-tl" />
                  <div className="viewfinder-corner-tr" />
                  <div className="viewfinder-corner-bl" />
                  <div className="viewfinder-corner-br" />

                  {/* Inner Dark Teal Photo Container */}
                  <div className="p-1 rounded-lg bg-[#071526] border border-cyan-500/30">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-[#040A14]">
                      
                      {/* Member Portrait */}
                      <Image
                        src={member.photo}
                        alt={`${member.name} - ${member.designation}`}
                        fill
                        sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, 260px"
                        priority
                        className="object-cover object-top cinematic-media-photo"
                      />

                      {/* Subtle Camera Focus Grid Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/80 via-transparent to-cyan-500/10 pointer-events-none" />
                    </div>
                  </div>

                  {/* Camera Metadata Telemetry Stamp */}
                  <div className="mt-2.5 pt-2 border-t border-dashed border-cyan-500/30 flex items-center justify-between text-[8px] sm:text-[9px] font-mono-tech tracking-wider text-cyan-400 font-bold uppercase">
                    <span>4K 60FPS</span>
                    <span className="text-slate-400 lowercase font-sans">media pass</span>
                    <span>ISO 400</span>
                  </div>
                </div>

                {/* Cyber Cyan Seal Badge floating at bottom corner */}
                <div className="absolute -bottom-2.5 -right-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg cyan-neon-badge text-cyan-200 shadow-lg text-[10px] sm:text-xs font-mono-tech tracking-wider uppercase font-bold flex items-center gap-1.5">
                  <Aperture className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                  <span>MEDIA PASS</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Cinematic Headline, Designation & Metadata */}
            <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
              
              {/* Header Label */}
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="h-0.5 w-5 sm:w-7 bg-gradient-to-r from-cyan-400 to-teal-400" />
                  <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                    STUDENT COUNCIL • MEDIA TEAM 2026
                  </span>
                </div>
                <div className="text-xs font-mono-tech text-cyan-300/80 tracking-wider uppercase flex items-center justify-center md:justify-start gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CREATIVE MEDIA &amp; VISUAL DIRECTION</span>
                </div>
              </div>

              {/* Large Member Name */}
              <div className="space-y-1.5">
                <h1 className="font-editorial-title text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08] uppercase drop-shadow-md">
                  {member.name}
                </h1>
                <div className="inline-block px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 text-xs sm:text-sm font-mono-tech font-bold tracking-[0.16em] text-cyan-300 uppercase">
                  {member.designation}
                </div>
              </div>

              {/* Short Editorial Intro */}
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed border-l-0 md:border-l-2 border-cyan-400 md:pl-3 p-2.5 md:p-2 bg-[#0B1D33]/70 rounded-lg border border-cyan-500/20 shadow-xs">
                {member.introNote || "Leading visual communications, campus storytelling and official media broadcasts."}
              </p>

              {/* Media Metadata Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-cyan-500/20 text-xs">
                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Camera className="w-3 h-3 text-cyan-400" />
                    COUNCIL ROLE
                  </div>
                  <div className="font-sans font-bold text-white text-xs sm:text-sm mt-0.5 truncate">
                    {member.designation}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Film className="w-3 h-3 text-cyan-400" />
                    DOMAIN
                  </div>
                  <div className="font-sans font-bold text-white text-xs sm:text-sm mt-0.5 truncate">
                    {member.roleDescription.domain}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-cyan-400" />
                    DEPARTMENT
                  </div>
                  <div className="font-sans font-bold text-white text-xs sm:text-sm mt-0.5 truncate">
                    {member.department}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    INSTITUTION
                  </div>
                  <div className="font-sans font-bold text-white text-xs sm:text-sm mt-0.5 truncate">
                    {member.college.split(" ")[0]} IOIT
                  </div>
                </div>
              </div>

              {/* Responsibility Areas */}
              <div className="pt-1 sm:pt-2">
                <div className="text-[9px] sm:text-[10px] font-mono-tech font-bold tracking-widest text-cyan-400 uppercase mb-2 flex items-center justify-center md:justify-start gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  RESPONSIBILITY AREAS
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start text-xs font-sans text-slate-200">
                  {member.roleDescription.focusAreas.map((area, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0B1F38] border border-cyan-500/30 flex items-center gap-1.5 shadow-xs text-[11px] sm:text-xs hover:border-cyan-400 transition-colors">
                      <span className="text-cyan-400 font-bold text-[9px]">❖</span>
                      <span>{area}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </BurnGlowCard>

        {/* ========================================================================= */}
        {/* SECTION 2: PERSONAL MESSAGE — CINEMATIC CLAPPERBOARD QUOTE CARD */}
        {/* ========================================================================= */}
        <BurnGlowCard className="p-4 sm:p-7 md:p-10 shadow-xl border border-cyan-500/30">
          
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
            <Film className="w-4 h-4 text-cyan-400" />
            <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
              DIRECTOR&apos;S NOTE // VISION &amp; MESSAGE
            </span>
          </div>

          <div className="relative pl-0 sm:pl-8 text-center sm:text-left">
            <Quote className="hidden sm:block absolute top-0 left-0 w-5 h-5 text-cyan-400/40 rotate-180" />
            <blockquote className="font-sans text-sm sm:text-lg md:text-xl text-slate-100 leading-relaxed font-normal">
              &ldquo;{member.message}&rdquo;
            </blockquote>
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-tech text-slate-400 gap-1.5 text-center sm:text-left">
            <span className="font-bold text-cyan-300 text-sm sm:text-base">— {member.name}</span>
            <span className="uppercase tracking-widest font-semibold text-[11px] sm:text-xs text-cyan-400/90">{member.designation}</span>
          </div>
        </BurnGlowCard>

        {/* ========================================================================= */}
        {/* SECTION 3: SOCIAL / CONNECT — CINEMATIC MEDIA CHANNELS */}
        {/* ========================================================================= */}
        <SocialLinks member={member} />

      </div>

      {/* Institutional Media Team Footer */}
      <CouncilFooter />
    </main>
  );
}
