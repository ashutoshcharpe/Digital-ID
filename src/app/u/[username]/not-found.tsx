"use client";

import Link from "next/link";
import Image from "next/image";
import { COUNCIL_INFO } from "@/data/members";
import { ArrowLeft, ShieldAlert, Camera } from "lucide-react";

export default function MemberNotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050B14] text-[#F0F9FF] p-4 selection:bg-[#00F0FF] selection:text-[#040810]">
      <div className="relative z-10 w-full max-w-md rounded-2xl media-glass-card border border-cyan-500/40 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
        {/* Council Crest */}
        <div className="relative w-16 h-16 mx-auto p-1.5 rounded-2xl border border-cyan-400/40 bg-[#09182B] shadow-md">
          <Image
            src={COUNCIL_INFO.logoPath}
            alt="Council Crest"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Security Alert Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>RECORD NOT FOUND</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-editorial-title text-white">
            Media Pass Unresolved
          </h1>

          <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
            The scanned QR code does not match an active Media Team or Student Council record in the official registry.
          </p>
        </div>

        {/* Navigation Action */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 font-mono-tech">
          <Link
            href="/u/ashutosh-charpe"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-md"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>View Media ID (Ashutosh)</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#081527] border border-cyan-500/30 text-slate-200 text-xs font-bold hover:border-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Media Portal</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
