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
  Feather, 
  Layers,
  Sparkles
} from "lucide-react";

interface MemberProfileProps {
  member: CouncilMember;
}

export default function MemberProfile({ member }: MemberProfileProps) {
  return (
    <main className="relative min-h-screen w-full bg-vintage-scorched bg-vintage-grain text-[#18110E] selection:bg-[#641B18] selection:text-[#FAF4E6] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* INTERACTIVE FLUID BACKGROUND WITH HOLLOW / FLUID-FILLED STUDENT COUNCIL TEXT */}
      {/* ========================================================================= */}
      <FluidBackground />

      {/* Top Publication Header */}
      <CouncilBranding tenure={member.tenure} badgeCode={member.badgeCode} />

      {/* Main Editorial Publication Spread */}
      <div className="relative z-10 w-full max-w-4xl px-3.5 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14 mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO / BURNED VINTAGE PAPER DIGITAL ID CARD */}
        {/* ========================================================================= */}
        <BurnGlowCard className="p-4 sm:p-7 md:p-10 shadow-2xl">
          
          {/* Top Archival Header Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 border-b border-[#641B18]/15 pb-3.5 mb-5 sm:mb-6 text-center sm:text-left">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#5A1C16]/80 font-semibold select-none flex items-center gap-1">
              <span>❖</span>
              <span>STUDENT COUNCIL</span>
            </div>

            {/* Wax Stamp Badge */}
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full ember-wax-badge text-[#FAF4E6] shadow-md text-[9px] sm:text-[10px] md:text-[11px] font-sans-meta font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse shrink-0" />
              <span>OFFICIAL COUNCIL CREDENTIAL</span>
            </div>

            <div className="text-[9px] sm:text-[10px] font-mono text-[#5A1C16]/80 font-semibold select-none flex items-center gap-1">
              <span>AISSMS IOIT • {member.tenure}</span>
              <span>❖</span>
            </div>
          </div>

          {/* Desktop Spread (Col-12) / Mobile Stacked (Centered) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
            
            {/* LEFT COLUMN: Vintage Portrait Mount */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-[210px] sm:max-w-[240px] md:max-w-[260px] mx-auto">
                
                {/* Burned Photo Mounting Card */}
                <div className="burned-photo-mount relative">
                  
                  {/* Four Scorched Corner Tabs */}
                  <div className="photo-corner-tl" />
                  <div className="photo-corner-tr" />
                  <div className="photo-corner-bl" />
                  <div className="photo-corner-br" />

                  {/* Inner Dark Burgundy & Charred Trim */}
                  <div className="p-1 rounded-xs bg-[#2D0F0B] border border-[#5A1C16]">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-[#18110E]">
                      
                      {/* Ashutosh's Portrait with Tintype Treatment */}
                      <Image
                        src={member.photo}
                        alt={`${member.name} - ${member.designation}`}
                        fill
                        sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, 260px"
                        priority
                        className="object-cover object-top vintage-tintype-photo"
                      />

                      {/* Film Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18110E]/60 via-transparent to-[#5A1C16]/15 pointer-events-none" />
                    </div>
                  </div>

                  {/* Archival Stamp Label under Portrait */}
                  <div className="mt-2.5 pt-2 border-t border-dashed border-[#5A1C16]/40 flex items-center justify-between text-[8px] sm:text-[9px] font-sans-meta tracking-wider text-[#641B18] font-bold uppercase">
                    <span>AISSMS IOIT</span>
                    <span className="font-script text-sm sm:text-base text-[#75502F] lowercase">council portrait</span>
                    <span>{member.tenure}</span>
                  </div>
                </div>

                {/* Wax Stamp Seal floating at bottom corner */}
                <div className="absolute -bottom-2.5 -right-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded ember-wax-badge text-[#FAF4E6] shadow-lg text-[10px] sm:text-xs font-serif tracking-wider uppercase font-bold flex items-center gap-1">
                  <span>★</span>
                  <span>COUNCIL ID</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Headline, Designation & Metadata */}
            <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
              
              {/* Header Label */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="h-0.5 w-5 sm:w-7 bg-[#641B18]" />
                  <span className="font-sans-meta text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#641B18] uppercase">
                    STUDENT COUNCIL • {member.tenure}
                  </span>
                </div>
                <span className="font-script text-xl sm:text-2xl text-[#75502F] block md:pl-9 -mt-0.5">
                  leadership profile & digital credential
                </span>
              </div>

              {/* Large Member Name */}
              <div className="space-y-1">
                <h1 className="font-editorial-title text-2xl sm:text-4xl md:text-5xl font-black text-[#3A100E] tracking-tight leading-[1.08] uppercase drop-shadow-xs">
                  {member.name}
                </h1>
                <div className="text-xs sm:text-sm md:text-base font-serif font-bold tracking-[0.16em] text-[#641B18] uppercase pt-0.5">
                  {member.designation}
                </div>
              </div>

              {/* Short Editorial Intro */}
              <p className="text-xs sm:text-sm font-serif text-[#2E221B] leading-relaxed italic border-l-0 md:border-l-2 border-[#641B18] md:pl-3 p-2.5 md:p-1.5 bg-[#FAF4E6]/85 rounded shadow-2xs">
                {member.introNote || "Serving the council through media, creative leadership and student communication."}
              </p>

              {/* Editorial Metadata Grid with Burned Paper Badges */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-[#641B18]/20 text-xs">
                <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-[#FAF4E6]/95 border border-[#C8AF86] shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-widest text-[#75502F] uppercase">
                    COUNCIL ROLE
                  </div>
                  <div className="font-serif font-bold text-[#18110E] text-xs sm:text-sm mt-0.5 truncate">
                    {member.designation}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-[#FAF4E6]/95 border border-[#C8AF86] shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-widest text-[#75502F] uppercase">
                    DOMAIN
                  </div>
                  <div className="font-serif font-bold text-[#18110E] text-xs sm:text-sm mt-0.5 truncate">
                    {member.roleDescription.domain}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-[#FAF4E6]/95 border border-[#C8AF86] shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-widest text-[#75502F] uppercase">
                    DEPARTMENT
                  </div>
                  <div className="font-serif font-bold text-[#18110E] text-xs sm:text-sm mt-0.5 truncate">
                    {member.department}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-[#FAF4E6]/95 border border-[#C8AF86] shadow-xs text-left">
                  <div className="text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-widest text-[#75502F] uppercase">
                    INSTITUTION
                  </div>
                  <div className="font-serif font-bold text-[#18110E] text-xs sm:text-sm mt-0.5 truncate">
                    {member.college.split(" ")[0]} IOIT
                  </div>
                </div>
              </div>

              {/* Responsibility Areas */}
              <div className="pt-1 sm:pt-2">
                <div className="text-[9px] sm:text-[10px] font-sans-meta font-bold tracking-widest text-[#641B18] uppercase mb-2 flex items-center justify-center md:justify-start gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  RESPONSIBILITY AREAS
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start text-xs font-serif text-[#18110E]">
                  {member.roleDescription.focusAreas.map((area, idx) => (
                    <span key={idx} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#FAF4E6] border border-[#C8AF86] flex items-center gap-1.5 shadow-2xs text-[11px] sm:text-xs">
                      <span className="text-[#641B18] font-bold text-[9px]">❖</span>
                      <span>{area}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </BurnGlowCard>

        {/* ========================================================================= */}
        {/* SECTION 2: PERSONAL MESSAGE — BURNED VINTAGE QUOTE CARD */}
        {/* ========================================================================= */}
        <BurnGlowCard className="p-4 sm:p-7 md:p-10 shadow-xl">
          
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
            <Feather className="w-4 h-4 text-[#641B18]" />
            <span className="font-sans-meta text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#641B18] uppercase">
              A NOTE FROM THE COUNCIL MEMBER
            </span>
          </div>

          <div className="relative pl-0 sm:pl-8 text-center sm:text-left">
            <Quote className="hidden sm:block absolute top-0 left-0 w-5 h-5 text-[#641B18]/40 rotate-180" />
            <blockquote className="font-editorial-title text-sm sm:text-lg md:text-xl text-[#18110E] leading-relaxed italic font-normal">
              &ldquo;{member.message}&rdquo;
            </blockquote>
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#641B18]/25 flex flex-col sm:flex-row items-center justify-between text-xs font-sans-meta text-[#75502F] gap-1.5 text-center sm:text-left">
            <span className="font-serif font-bold text-[#641B18] text-sm sm:text-base">— {member.name}</span>
            <span className="uppercase tracking-widest font-semibold text-[11px] sm:text-xs">{member.designation}</span>
          </div>
        </BurnGlowCard>

        {/* ========================================================================= */}
        {/* SECTION 3: SOCIAL / CONNECT — BURNED PAPER CATALOG */}
        {/* ========================================================================= */}
        <SocialLinks member={member} />

      </div>

      {/* Institutional Vintage Editorial Footer */}
      <CouncilFooter />
    </main>
  );
}
