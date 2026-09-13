"use client";

import { useState } from "react";
import { CouncilMember } from "@/data/members";
import BurnGlowCard from "./BurnGlowCard";
import { 
  MessageSquare, 
  Share2, 
  Check, 
  ArrowUpRight, 
  Send,
  X,
  ShieldCheck,
  Bookmark,
  Sparkles
} from "lucide-react";

interface SocialLinksProps {
  member: CouncilMember;
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function SocialLinks({ member }: SocialLinksProps) {
  const [copied, setCopied] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("Media & Visual Coverage");
  const [contactMsg, setContactMsg] = useState("");

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://council.aissmsioit.org/u/${member.username}`;
    
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${member.name} — ${member.designation}`,
          text: `Official Student Council Digital ID for ${member.name} (${member.designation}), AISSMS IOIT.`,
          url: url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendMessage = () => {
    const text = encodeURIComponent(
      `Official Student Council Inquiry for ${member.name} (${member.designation})\nSubject: ${contactSubject}\n\nMessage:\n${contactMsg || "Hello, I would like to connect regarding Student Council initiatives."}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setIsContactModalOpen(false);
    setContactMsg("");
  };

  return (
    <BurnGlowCard className="p-4 sm:p-7 md:p-10 space-y-5 sm:space-y-7 shadow-xl">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#641B18]/25 pb-3 text-center sm:text-left">
        <div>
          <span className="font-script text-xl sm:text-2xl text-[#75502F] block -mb-0.5">direct lines & dispatches</span>
          <h3 className="font-editorial-title text-xl sm:text-2xl md:text-3xl font-bold text-[#3A100E] tracking-tight uppercase">
            LET&apos;S CONNECT
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-sans-meta tracking-widest text-[#75502F] uppercase font-bold flex items-center justify-center sm:justify-start gap-1.5 pt-1 sm:pt-0">
          <Sparkles className="w-3.5 h-3.5 text-[#641B18]" />
          Official Secretariat Channels
        </span>
      </div>

      {/* Burned Paper Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Instagram */}
        <a
          href={member.socials.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 sm:p-4 rounded-xl bg-[#FAF4E6] border border-[#C8AF86] hover:border-[#641B18] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#641B18]">
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-sans-meta font-bold tracking-wider uppercase">
                INSTAGRAM
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#75502F] group-hover:text-[#641B18] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#641B18]/20 text-xs font-serif font-bold text-[#18110E] group-hover:text-[#641B18] transition-colors truncate text-left">
            {member.socials.instagram.username}
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={member.socials.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 sm:p-4 rounded-xl bg-[#FAF4E6] border border-[#C8AF86] hover:border-[#641B18] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#641B18]">
              <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-sans-meta font-bold tracking-wider uppercase">
                LINKEDIN
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#75502F] group-hover:text-[#641B18] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#641B18]/20 text-xs font-serif font-bold text-[#18110E] group-hover:text-[#641B18] transition-colors truncate text-left">
            {member.socials.linkedin.name}
          </div>
        </a>

        {/* WhatsApp / Contact */}
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="group relative p-3 sm:p-4 rounded-xl bg-[#FAF4E6] border border-[#C8AF86] hover:border-[#641B18] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] text-left cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#641B18]">
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-sans-meta font-bold tracking-wider uppercase">
                WHATSAPP
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#75502F] group-hover:text-[#641B18] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#641B18]/20 text-xs font-serif font-bold text-[#18110E] group-hover:text-[#641B18] transition-colors truncate text-left">
            Send Official Note
          </div>
        </button>
      </div>

      {/* Share / Save ID Card Dispatch Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 rounded-xl bg-[#FAF4E6] border border-[#C8AF86] gap-2.5 sm:gap-3 text-xs font-sans-meta">
        <div className="flex items-center gap-2 text-[#75502F] text-[11px] sm:text-xs text-center sm:text-left">
          <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#641B18] shrink-0" />
          <span>Archival Record Ref: <strong className="text-[#18110E] font-mono">{member.badgeCode}</strong></span>
        </div>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#641B18]/50 hover:border-[#641B18] bg-[#641B18]/10 hover:bg-[#641B18] text-[#641B18] hover:text-[#FAF4E6] font-bold transition-all duration-200 active:scale-95 cursor-pointer shadow-xs text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Digital ID</span>
            </>
          )}
        </button>
      </div>

      {/* Burned Paper Inquiry Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#18110E]/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-[94vw] sm:max-w-md rounded-2xl burned-paper-card shadow-2xl p-5 sm:p-7 space-y-4 sm:space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#641B18]/25 pb-3">
              <div>
                <span className="font-script text-lg sm:text-xl text-[#75502F] block -mb-1">official dispatch</span>
                <h4 className="font-editorial-title text-lg sm:text-2xl font-bold text-[#3A100E]">
                  Note for {member.firstName}
                </h4>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#C8AF86] hover:border-[#641B18] flex items-center justify-center text-[#75502F] hover:text-[#641B18] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-sans-meta font-bold uppercase tracking-wider text-[#641B18] mb-1">
                  Subject / Topic
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-[#FAF4E6] border border-[#C8AF86] rounded-lg px-3 py-2 text-xs font-serif text-[#18110E] focus:outline-none focus:border-[#641B18] transition-colors shadow-xs"
                >
                  <option value="Campus Media & Broadcasts">Campus Media & Broadcasts</option>
                  <option value="Visual Storytelling & Coverage">Visual Storytelling & Coverage</option>
                  <option value="Student Council Collaboration">Student Council Collaboration</option>
                  <option value="General Council Inquiries">General Council Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-sans-meta font-bold uppercase tracking-wider text-[#641B18] mb-1">
                  Your Note
                </label>
                <textarea
                  rows={3}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Draft your note to the Joint Media Secretary..."
                  className="w-full bg-[#FAF4E6] border border-[#C8AF86] rounded-lg p-3 text-xs font-serif text-[#18110E] placeholder-[#75502F]/60 focus:outline-none focus:border-[#641B18] transition-colors resize-none shadow-xs"
                />
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#FAF4E6] border border-[#C8AF86] flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#641B18] shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-[#2E221B] font-serif leading-relaxed">
                  Inquiries are directed through the verified Student Council secretariat communication channel.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-sans-meta font-bold text-[#75502F] hover:text-[#18110E] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#641B18] hover:bg-[#7A221E] text-[#FAF4E6] font-sans-meta font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </BurnGlowCard>
  );
}
