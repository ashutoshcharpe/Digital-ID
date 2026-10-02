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
  Sparkles,
  Radio,
  Camera
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
          text: `Official Student Council Digital ID for ${member.name} (${member.designation}), AISSMS IOIT Media Team.`,
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
      `Official Student Council Media Team Inquiry for ${member.name} (${member.designation})\nSubject: ${contactSubject}\n\nMessage:\n${contactMsg || "Hello Ashutosh, reaching out via the official Student Council Digital ID."}`
    );
    window.open(`https://wa.me/917620443842?text=${text}`, "_blank");
    setIsContactModalOpen(false);
    setContactMsg("");
  };

  return (
    <BurnGlowCard className="p-4 sm:p-7 md:p-10 space-y-5 sm:space-y-7 shadow-2xl border border-cyan-500/30">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-cyan-500/20 pb-3 text-center sm:text-left">
        <div>
          <span className="font-mono-tech text-xs sm:text-sm text-cyan-400 block tracking-widest uppercase mb-0.5">
            // DIRECT CHANNELS &amp; BROADCASTS
          </span>
          <h3 className="font-editorial-title text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
            CONNECT WITH MEDIA DESK
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-cyan-300 uppercase font-semibold flex items-center justify-center sm:justify-start gap-1.5 pt-1 sm:pt-0">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Official Secretariat Feed
        </span>
      </div>

      {/* Media Team Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Instagram */}
        <a
          href={member.socials.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3.5 sm:p-4 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-cyan-400">
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono-tech font-bold tracking-wider uppercase">
                INSTAGRAM
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-cyan-500/20 text-xs font-mono-tech font-bold text-white group-hover:text-cyan-300 transition-colors truncate text-left">
            {member.socials.instagram.username}
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={member.socials.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3.5 sm:p-4 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-cyan-400">
              <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono-tech font-bold tracking-wider uppercase">
                LINKEDIN
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-cyan-500/20 text-xs font-mono-tech font-bold text-white group-hover:text-cyan-300 transition-colors truncate text-left">
            {member.socials.linkedin.name}
          </div>
        </a>

        {/* WhatsApp / Direct Contact */}
        <a
          href={member.socials.contact.actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3.5 sm:p-4 rounded-xl bg-[#09182B]/90 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:scale-[0.98] text-left cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-cyan-400">
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono-tech font-bold tracking-wider uppercase">
                WHATSAPP
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2 border-t border-cyan-500/20 text-xs font-mono-tech font-bold text-white group-hover:text-cyan-300 transition-colors truncate text-left">
            {member.socials.contact.displayHandle}
          </div>
        </a>
      </div>

      {/* Share / Save ID Card Dispatch Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 rounded-xl bg-[#081527] border border-cyan-500/30 gap-2.5 sm:gap-3 text-xs font-mono-tech">
        <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs text-center sm:text-left">
          <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
          <span>Archival Record Ref: <strong className="text-cyan-300 font-mono">{member.badgeCode}</strong></span>
        </div>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-400/50 hover:border-cyan-400 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-200 hover:text-black font-bold transition-all duration-200 active:scale-95 cursor-pointer shadow-md text-xs font-mono-tech"
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

      {/* Media Team Inquiry Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-[94vw] sm:max-w-md rounded-2xl media-glass-card shadow-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 border border-cyan-500/40">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div>
                <span className="font-mono-tech text-xs text-cyan-400 block tracking-widest uppercase -mb-0.5">// OFFICIAL DISPATCH</span>
                <h4 className="font-editorial-title text-lg sm:text-2xl font-bold text-white">
                  Note for {member.firstName}
                </h4>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono-tech font-bold uppercase tracking-wider text-cyan-400 mb-1">
                  Subject / Topic
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-[#081527] border border-cyan-500/30 rounded-lg px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors shadow-xs"
                >
                  <option value="Campus Media & Broadcasts">Campus Media & Broadcasts</option>
                  <option value="Visual Storytelling & Coverage">Visual Storytelling & Coverage</option>
                  <option value="Student Council Collaboration">Student Council Collaboration</option>
                  <option value="General Council Inquiries">General Council Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono-tech font-bold uppercase tracking-wider text-cyan-400 mb-1">
                  Your Note
                </label>
                <textarea
                  rows={3}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Draft your note to the Joint Media Secretary..."
                  className="w-full bg-[#081527] border border-cyan-500/30 rounded-lg p-3 text-xs font-sans text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none shadow-xs"
                />
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#081527] border border-cyan-500/30 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-slate-300 font-sans leading-relaxed">
                  Inquiries are directed through the verified Student Council Media Team channel.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-mono-tech font-bold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono-tech font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
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
