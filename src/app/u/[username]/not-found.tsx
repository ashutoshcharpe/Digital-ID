"use client";

import Link from "next/link";
import Image from "next/image";
import { COUNCIL_INFO } from "@/data/members";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function MemberNotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-vintage-gradient bg-old-paper-texture text-[#1C1613] p-4 selection:bg-[#641B18] selection:text-[#FAF6EE]">
      <div className="relative z-10 w-full max-w-md rounded-2xl old-paper-card border-2 border-[#641B18] p-6 sm:p-8 text-center space-y-6 shadow-2xl">
        {/* Council Crest */}
        <div className="relative w-16 h-16 mx-auto p-1 rounded-full border border-[#641B18]/30 bg-[#FAF7F0]">
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#641B18]/10 border border-[#641B18]/30 text-[#641B18] text-xs font-sans-meta font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>RECORD NOT FOUND</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-editorial-title text-[#431210]">
            Council Credential Unresolved
          </h1>

          <p className="text-xs sm:text-sm font-serif text-[#332720] leading-relaxed">
            The scanned QR code does not match an active Council Member record in the official registry.
          </p>
        </div>

        {/* Navigation Action */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/u/ashutosh-charpe"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#641B18] hover:bg-[#7A221E] text-[#FAF6EE] font-sans-meta font-bold text-xs transition-all shadow-sm"
          >
            <span>View Demo ID (Ashutosh)</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#FAF6EE] border border-[#D5C2A3] text-[#1C1613] text-xs font-sans-meta font-bold hover:border-[#641B18] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#641B18]" />
            <span>Council Portal</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
