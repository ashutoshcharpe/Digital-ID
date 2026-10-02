"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { CouncilMember } from "@/data/members";

interface MemberProfileProps {
  member: CouncilMember;
}

export default function MemberProfile({ member }: MemberProfileProps) {
  const WA_NUMBER = "917620443842";
  const [takeCount, setTakeCount] = useState(1);
  const [currentDateStr, setCurrentDateStr] = useState("2026.10.03");
  const [timecodeStr, setTimecodeStr] = useState("00:00:00:00");
  const [isPhotoSharp, setIsPhotoSharp] = useState(false);
  const [isClapping, setIsClapping] = useState(false);
  const [isClapperOpen, setIsClapperOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio Context helper
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Clapperboard Sound
  const playClapperSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Noise burst
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.009));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1750, now);
      filter.Q.setValueAtTime(1.8, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(1.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Body clack
      const osc1 = ctx.createOscillator();
      const oscGain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(460, now);
      osc1.frequency.exponentialRampToValueAtTime(95, now + 0.09);
      oscGain1.gain.setValueAtTime(1.0, now);
      oscGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc1.connect(oscGain1);
      oscGain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // 3. Rebound snap
      const osc2 = ctx.createOscillator();
      const oscGain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(680, now + 0.025);
      osc2.frequency.exponentialRampToValueAtTime(130, now + 0.085);
      oscGain2.gain.setValueAtTime(0.5, now + 0.025);
      oscGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
      osc2.connect(oscGain2);
      oscGain2.connect(ctx.destination);
      osc2.start(now + 0.025);
      osc2.stop(now + 0.085);
    } catch (e) {
      console.warn("AudioContext playback error:", e);
    }
  }, [getAudioContext]);

  // DSLR Camera Shutter sound
  const playCameraShutterSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Chirp
      const focusOsc = ctx.createOscillator();
      const focusGain = ctx.createGain();
      focusOsc.type = "sine";
      focusOsc.frequency.setValueAtTime(1450, now);
      focusGain.gain.setValueAtTime(0.2, now);
      focusGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      focusOsc.connect(focusGain);
      focusGain.connect(ctx.destination);
      focusOsc.start(now);
      focusOsc.stop(now + 0.035);

      // Mechanical shutter curtains
      [0.02, 0.075].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(320, now + delay);
        osc.frequency.exponentialRampToValueAtTime(60, now + delay + 0.045);
        gain.gain.setValueAtTime(0.6, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.045);
      });
    } catch (e) {
      console.warn("AudioContext shutter sound error:", e);
    }
  }, [getAudioContext]);

  // Date and Timecode
  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setCurrentDateStr(`${yyyy}.${mm}.${dd}`);

    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const totalFrames = Math.floor((elapsed / 1000) * 24);
      const frames = String(totalFrames % 24).padStart(2, "0");
      const totalSeconds = Math.floor(elapsed / 1000);
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = String(totalMinutes % 60).padStart(2, "0");
      const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
      setTimecodeStr(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 41.67);

    // Initial autofocus animation
    const timer = setTimeout(() => {
      setIsPhotoSharp(true);
    }, 450);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // 3D Parallax Tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.classList.remove("is-floating");
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      setTimeout(() => {
        card.classList.add("is-floating");
      }, 300);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClapperClick = () => {
    setIsClapping(true);
    playClapperSound();
    setTakeCount((prev) => prev + 1);
    setTimeout(() => {
      setIsClapping(false);
    }, 550);
  };

  const handlePhotoClick = () => {
    playCameraShutterSound();
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(0.99)";
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transform = "";
      }, 120);
    }
  };

  const whatsappUrl = WA_NUMBER
    ? `https://wa.me/${WA_NUMBER}?text=Hello%20Ashutosh,%20reaching%20out%20via%20the%20official%20Student%20Council%20Media%20Team%20Digital%20ID.`
    : "#";

  return (
    <div className="page-wrapper">
      <main className="main-layout" id="main-content">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: 3D DIGITAL ID CARD                           */}
        {/* ========================================================= */}
        <section className="id-card-perspective-container" aria-label="Digital ID Card">
          <article className="id-card is-floating" id="idCard" ref={cardRef}>
            
            {/* Card Header */}
            <header className="card-header layer-depth-1">
              <div className="header-brand">
                <div className="logo-wrapper">
                  <Image 
                    src="/assets/logo.png" 
                    alt="Student Council Logo" 
                    width={36} 
                    height={36} 
                    className="brand-logo"
                  />
                </div>
                <div className="brand-text">
                  <span className="brand-title">Student Council Media Team</span>
                  <span className="brand-tenure">{member.tenure} • AISSMS IOIT</span>
                </div>
              </div>

              {/* Blinking Red REC Indicator */}
              <div className="rec-indicator" title="Live Recording Status" aria-label="Recording status: Live">
                <span className="rec-dot" aria-hidden="true"></span>
                <span className="rec-text">REC</span>
              </div>
            </header>

            {/* DSLR Viewfinder Frame */}
            <div className="viewfinder-wrapper layer-depth-2">
              <div 
                className="viewfinder-frame" 
                id="viewfinder"
                onClick={handlePhotoClick}
                title="Click to trigger camera focus shutter"
              >
                {/* Viewfinder 4 Corner Brackets */}
                <span className="corner-bracket bracket-tl" aria-hidden="true"></span>
                <span className="corner-bracket bracket-tr" aria-hidden="true"></span>
                <span className="corner-bracket bracket-bl" aria-hidden="true"></span>
                <span className="corner-bracket bracket-br" aria-hidden="true"></span>

                {/* Rule-of-Thirds Grid Overlay */}
                <div className="grid-overlay" aria-hidden="true">
                  <span className="grid-line grid-v-1"></span>
                  <span className="grid-line grid-v-2"></span>
                  <span className="grid-line grid-h-1"></span>
                  <span className="grid-line grid-h-2"></span>
                </div>

                {/* Top Viewfinder HUD Telemetry */}
                <div className="viewfinder-hud top-hud">
                  <span className="hud-item af-status is-locked" id="afStatus">AF-C [LOCKED]</span>
                  <span className="hud-item">ISO 400</span>
                  <span className="hud-item">1/250s • f/2.8</span>
                </div>

                {/* Member Portrait */}
                <div className="photo-container">
                  <Image 
                    src="/assets/photo.jpg" 
                    alt={`${member.name} — ${member.designation}`} 
                    width={400} 
                    height={500} 
                    priority
                    className={`portrait-photo ${isPhotoSharp ? "is-sharp" : "blurred-init"}`}
                  />
                </div>

                {/* Bottom Viewfinder HUD Telemetry */}
                <div className="viewfinder-hud bottom-hud">
                  <span className="hud-item" id="hudDate">{currentDateStr}</span>
                  <span className="hud-item hud-badge">4K • 24FPS</span>
                  <span className="hud-item hud-timecode" id="hudTimecode">{timecodeStr}</span>
                </div>
              </div>
            </div>

            {/* Member Identity Details */}
            <footer className="card-footer layer-depth-3">
              <div className="member-identity">
                <h1 className="member-name">{member.name}</h1>
                <p className="member-role">{member.designation}</p>
                <p className="member-institution">{member.college}</p>
              </div>
            </footer>

          </article>
        </section>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: SLATE, QUOTE, AND CONNECT TILES             */}
        {/* ========================================================= */}
        <section className="side-content-layout" aria-label="Details and Connections">
          
          {/* Film Clapperboard Slate */}
          <div 
            className="clapperboard-card" 
            id="clapperboard"
            onClick={handleClapperClick}
            onPointerDown={() => setIsClapperOpen(true)}
            onPointerUp={() => setIsClapperOpen(false)}
            onPointerLeave={() => setIsClapperOpen(false)}
            title="Click to clap board"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClapperClick(); }}
          >
            <div className="clapper-top-hinge">
              <div 
                className={`clapper-stick ${isClapping ? "is-clapping" : isClapperOpen ? "is-open" : "is-shut"}`} 
                id="clapperStick"
              >
                <span className="stripe s-1"></span>
                <span className="stripe s-2"></span>
                <span className="stripe s-3"></span>
                <span className="stripe s-4"></span>
                <span className="stripe s-5"></span>
                <span className="stripe s-6"></span>
                <span className="stripe s-7"></span>
                <span className="stripe s-8"></span>
              </div>
              <div className="clapper-base-stick">
                <span className="stripe s-1"></span>
                <span className="stripe s-2"></span>
                <span className="stripe s-3"></span>
                <span className="stripe s-4"></span>
                <span className="stripe s-5"></span>
                <span className="stripe s-6"></span>
                <span className="stripe s-7"></span>
                <span className="stripe s-8"></span>
              </div>
            </div>

            <div className="slate-body">
              <div className="slate-row slate-header-row">
                <span className="slate-label">PRODUCTION</span>
                <span className="slate-value">STUDENT COUNCIL MEDIA TEAM</span>
              </div>

              <div className="slate-row slate-grid-row">
                <div className="slate-cell">
                  <span className="slate-label">SCENE</span>
                  <span className="slate-value">MEDIA</span>
                </div>
                <div className="slate-cell">
                  <span className="slate-label">TAKE</span>
                  <span className="slate-value highlight-take" id="slateTake">{takeCount}</span>
                </div>
                <div className="slate-cell">
                  <span className="slate-label">ROLL</span>
                  <span className="slate-value">2026</span>
                </div>
              </div>

              <div className="slate-row slate-meta-row">
                <div className="slate-cell">
                  <span className="slate-label">DIRECTOR</span>
                  <span className="slate-value">ASHUTOSH CHARPE</span>
                </div>
                <div className="slate-cell">
                  <span className="slate-label">DATE</span>
                  <span className="slate-value" id="slateDate">{currentDateStr}</span>
                </div>
              </div>

              <div className="slate-click-hint">
                <span>⚡ Click to clap</span>
              </div>
            </div>
          </div>

          {/* Personal Message Quote Card */}
          <div className="message-quote-card">
            <blockquote className="quote-text">
              &ldquo;{member.message}&rdquo;
            </blockquote>
            <div className="quote-attribution">
              <span className="attribution-line" aria-hidden="true"></span>
              <span className="attribution-author">{member.name}</span>
              <span className="attribution-role">{member.designation}</span>
            </div>
          </div>

          {/* Connect With Me Tile Grid */}
          <div className="connect-block">
            <h2 className="connect-heading">Connect Directly</h2>
            <div className="connect-buttons-grid">
              
              {/* Instagram */}
              <a 
                href={member.socials.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="connect-btn btn-instagram"
              >
                <div className="btn-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </div>
                <div className="btn-text">
                  <span className="btn-label">Instagram</span>
                  <span className="btn-handle">{member.socials.instagram.username}</span>
                </div>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>

              {/* LinkedIn */}
              <a 
                href={member.socials.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="connect-btn btn-linkedin"
              >
                <div className="btn-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="btn-text">
                  <span className="btn-label">LinkedIn</span>
                  <span className="btn-handle">ashutosh-charpe</span>
                </div>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>

              {/* WhatsApp */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="connect-btn btn-whatsapp"
              >
                <div className="btn-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div className="btn-text">
                  <span className="btn-label">WhatsApp</span>
                  <span className="btn-handle">+91 76204 43842</span>
                </div>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>

            </div>
          </div>

        </section>

      </main>

      {/* ========================================================= */}
      {/* BOTTOM SECTION: 35MM FILM STRIP GLIMPSES                  */}
      {/* ========================================================= */}
      <section className="film-strip-section" aria-label="Media Team Glimpses">
        <div className="film-strip-band">
          
          <div className="film-reel-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="reel-svg">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
              <line x1="12" y1="2" x2="12" y2="9"></line>
              <line x1="12" y1="15" x2="12" y2="22"></line>
              <line x1="2" y1="12" x2="9" y2="12"></line>
              <line x1="15" y1="12" x2="22" y2="12"></line>
            </svg>
          </div>

          <div className="film-strip-scroller" aria-label="Glimpses of Media Team">
            <div className="film-strip-track">
              
              {/* Loop Set 1 */}
              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_1.jpg" alt="Media Team Campus Coverage" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">01A • MEDIA TEAM</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_2.jpg" alt="Media Team Secretariat & Coverage" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">02A • MEDIA TEAM</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_3.jpg" alt="Live Telecast Camera Operator" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">03A • BROADCAST &amp; LIVE</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_4.jpg" alt="Stage Production &amp; Event Crew" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">04A • STAGE CREW</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              {/* Loop Set 2 (Duplicate for Seamless Infinite Marquee) */}
              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_1.jpg" alt="Media Team Campus Coverage" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">01A • MEDIA TEAM</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_2.jpg" alt="Media Team Secretariat & Coverage" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">02A • MEDIA TEAM</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_3.jpg" alt="Live Telecast Camera Operator" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">03A • BROADCAST &amp; LIVE</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

              <div className="film-photo-frame">
                <div className="film-perforations top-perfs" aria-hidden="true"></div>
                <div className="film-photo-inner">
                  <Image src="/assets/glimpses/glimpse_4.jpg" alt="Stage Production &amp; Event Crew" width={170} height={100} className="film-photo-img" />
                  <span className="film-frame-number">04A • STAGE CREW</span>
                </div>
                <div className="film-perforations bottom-perfs" aria-hidden="true"></div>
              </div>

            </div>
          </div>

          <button 
            className="dslr-camera-trigger" 
            id="cameraTrigger" 
            type="button" 
            onClick={handlePhotoClick}
            title="Click camera for shutter flash" 
            aria-label="Trigger Camera Shutter Flash"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="camera-svg">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3.5"></circle>
            </svg>
            <span className="camera-led" aria-hidden="true"></span>
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <p className="footer-title">Student Council Media Team</p>
        <p className="footer-sub">AISSMS Institute of Information Technology • 2026–27</p>
      </footer>

    </div>
  );
}
