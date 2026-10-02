/**
 * ==============================================================================
 * STUDENT COUNCIL MEDIA TEAM — DIGITAL ID CARD
 * Ashutosh Charpe (Joint Media Secretary 2026–27)
 * ==============================================================================
 */

/**
 * ------------------------------------------------------------------------------
 * 📱 WHATSAPP NUMBER CONFIGURATION
 * ------------------------------------------------------------------------------
 * EDIT LINE 16 BELOW to add your WhatsApp number (Country code + digits only).
 * Example: const WA_NUMBER = "917620443842";
 * 
 * Leave as "" (empty string) to display "Number coming soon" in disabled state.
 * ------------------------------------------------------------------------------
 */
const WA_NUMBER = "917620443842"; // Configured WhatsApp Number

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppButton();
  initCurrentDate();
  initLiveTimecode();
  initOrchestratedLoadSequence();
  init3DCardParallax();
  // Initialize listeners
  initClapperboard();
  initPhotoAndCameraClick();
});

/**
 * ------------------------------------------------------------------------------
 * 🔊 WEB AUDIO API SOUND GENERATORS (No external files needed)
 * ------------------------------------------------------------------------------
 */
let audioCtxInstance = null;
function getAudioContext() {
  if (!audioCtxInstance) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtxInstance = new AudioCtx();
    }
  }
  if (audioCtxInstance && audioCtxInstance.state === "suspended") {
    audioCtxInstance.resume();
  }
  return audioCtxInstance;
}

/**
 * Authentic Wooden Film Clapperboard Snap Sound
 */
function playClapperSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Resonant wooden body thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);

    // 2. High-frequency snappy wooden crack / slap
    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  } catch (e) {
    // Audio context safe fallback
  }
}

/**
 * Authentic DSLR Camera Focus & Shutter Click Sound (Dual curtain ka-chick)
 */
function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // A. Focus Confirmation Electronic Chirp / Beep (Very brief)
    const focusOsc = ctx.createOscillator();
    const focusGain = ctx.createGain();
    focusOsc.type = "sine";
    focusOsc.frequency.setValueAtTime(1450, now);
    focusGain.gain.setValueAtTime(0.18, now);
    focusGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    focusOsc.connect(focusGain);
    focusGain.connect(ctx.destination);
    focusOsc.start(now);
    focusOsc.stop(now + 0.035);

    // B. Mirror Lift & Shutter Opening Click (T + 40ms)
    const tOpen = now + 0.04;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(650, tOpen);
    osc1.frequency.exponentialRampToValueAtTime(180, tOpen + 0.03);
    gain1.gain.setValueAtTime(0.5, tOpen);
    gain1.gain.exponentialRampToValueAtTime(0.001, tOpen + 0.03);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(tOpen);
    osc1.stop(tOpen + 0.03);

    // C. Metallic Shutter Curtain Noise Burst 1
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer1 = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data1 = buffer1.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data1[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
    }
    const noise1 = ctx.createBufferSource();
    noise1.buffer = buffer1;
    const filter1 = ctx.createBiquadFilter();
    filter1.type = "highpass";
    filter1.frequency.setValueAtTime(2600, tOpen);
    const noiseGain1 = ctx.createGain();
    noiseGain1.gain.setValueAtTime(0.7, tOpen);
    noiseGain1.gain.exponentialRampToValueAtTime(0.001, tOpen + 0.04);
    noise1.connect(filter1);
    filter1.connect(noiseGain1);
    noiseGain1.connect(ctx.destination);
    noise1.start(tOpen);

    // D. Second Shutter Curtain Return Click (T + 110ms)
    const tClose = now + 0.11;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(500, tClose);
    osc2.frequency.exponentialRampToValueAtTime(140, tClose + 0.04);
    gain2.gain.setValueAtTime(0.55, tClose);
    gain2.gain.exponentialRampToValueAtTime(0.001, tClose + 0.04);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(tClose);
    osc2.stop(tClose + 0.04);

    const noise2 = ctx.createBufferSource();
    noise2.buffer = buffer1;
    const noiseGain2 = ctx.createGain();
    noiseGain2.gain.setValueAtTime(0.75, tClose);
    noiseGain2.gain.exponentialRampToValueAtTime(0.001, tClose + 0.05);
    noise2.connect(filter1);
    filter1.connect(noiseGain2);
    noiseGain2.connect(ctx.destination);
    noise2.start(tClose);
  } catch (e) {
    // Fallback
  }
}

/**
 * 6. Interactive Clapperboard
 * Clicking claps again, plays wooden clap sound, and increments the take number.
 */
function initClapperboard() {
  const clapperboard = document.getElementById("clapperboard");
  const clapperStick = document.getElementById("clapperStick");
  const takeCounter = document.getElementById("takeCounter");
  if (!clapperboard || !clapperStick || !takeCounter) return;

  let currentTake = 1;

  function clap() {
    currentTake += 1;
    takeCounter.textContent = String(currentTake).padStart(2, "0");

    // Play synthesized wooden clapperboard snap sound
    playClapperSound();

    // Remove is-open and retrigger full wide open clap animation
    clapperStick.classList.remove("is-open");
    clapperStick.classList.remove("is-clapping");
    void clapperStick.offsetWidth; // Force CSS reflow
    clapperStick.classList.add("is-clapping");
  }

  // Open fully while pressing / holding click
  clapperboard.addEventListener("pointerdown", () => {
    clapperStick.classList.remove("is-clapping");
    clapperStick.classList.add("is-open");
  });

  clapperboard.addEventListener("pointerup", () => {
    clap();
  });

  clapperboard.addEventListener("pointerleave", () => {
    if (clapperStick.classList.contains("is-open")) {
      clapperStick.classList.remove("is-open");
      clapperStick.classList.add("is-shut");
    }
  });

  clapperboard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      clap();
    }
  });
}

/**
 * 7. Photo Viewfinder & DSLR Camera Click Triggers
 */
function initPhotoAndCameraClick() {
  const viewfinder = document.getElementById("viewfinder");
  const portraitPhoto = document.getElementById("portraitPhoto");
  const afStatus = document.getElementById("afStatus");
  const cameraBtn = document.getElementById("cameraTrigger");

  function triggerCameraClick(elem) {
    // Play dual-curtain DSLR camera shutter & focus sound
    playCameraShutterSound();

    // Visual micro focus pulse
    if (afStatus) {
      afStatus.style.color = "#10b981";
      afStatus.textContent = "AF LOCK • SNAP";
      setTimeout(() => {
        afStatus.textContent = "AF-S LOCK";
      }, 600);
    }

    if (elem) {
      elem.style.transform = "scale(0.985)";
      setTimeout(() => {
        elem.style.transform = "";
      }, 120);
    }
  }

  // Click on Viewfinder / Portrait Photo
  if (viewfinder) {
    viewfinder.addEventListener("click", () => {
      triggerCameraClick(portraitPhoto);
    });
  }

  // Click on Camera trigger button at bottom
  if (cameraBtn) {
    cameraBtn.addEventListener("click", () => {
      triggerCameraClick(cameraBtn);
    });
  }
}

/**
 * 1. Initialize WhatsApp Button Status
 */
function initWhatsAppButton() {
  const waBtn = document.getElementById("whatsappBtn");
  const waHandle = document.getElementById("whatsappHandle");
  if (!waBtn || !waHandle) return;

  const cleanNumber = WA_NUMBER.replace(/[^0-9]/g, "");

  if (cleanNumber.length >= 8) {
    waBtn.classList.remove("is-disabled");
    waBtn.removeAttribute("tabindex");
    waBtn.href = `https://wa.me/${cleanNumber}?text=Hello%20Ashutosh,%20reaching%20out%20via%20the%20Student%20Council%20Media%20Team%20Digital%20ID.`;
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    
    // Nicely format number for display (e.g. +91 76204 43842)
    if (cleanNumber.startsWith("91") && cleanNumber.length === 12) {
      waHandle.textContent = `+91 ${cleanNumber.slice(2, 7)} ${cleanNumber.slice(7)}`;
    } else {
      waHandle.textContent = `+${cleanNumber}`;
    }
  } else {
    waBtn.classList.add("is-disabled");
    waBtn.setAttribute("tabindex", "-1");
    waBtn.href = "#";
    waHandle.textContent = "Number coming soon";
  }
}

/**
 * 2. Set Current Date on Clapperboard
 */
function initCurrentDate() {
  const dateDisplay = document.getElementById("currentDateDisplay");
  if (!dateDisplay) return;

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  dateDisplay.textContent = `${day} ${month} ${year}`;
}

/**
 * 3. Live Running Timecode HUD Generator (HH:MM:SS:FF)
 */
function initLiveTimecode() {
  const timecodeEl = document.getElementById("liveTimecode");
  if (!timecodeEl) return;

  const startTime = performance.now();

  function updateTimecode() {
    const elapsed = performance.now() - startTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    const frames = Math.floor((elapsed % 1000) / (1000 / 60));

    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    const frms = String(frames).padStart(2, "0");

    timecodeEl.textContent = `${hrs}:${mins}:${secs}:${frms}`;
    requestAnimationFrame(updateTimecode);
  }

  requestAnimationFrame(updateTimecode);
}

/**
 * 4. Orchestrated Load Sequence
 * Step 1: Photo starts blurred.
 * Step 2: Autofocus zooms in & locks (amber -> green).
 * Step 3: Photo sharpens.
 * Step 4: Shutter flash plays.
 * Step 5: Clapperboard claps shut.
 */
function initOrchestratedLoadSequence() {
  const portraitPhoto = document.getElementById("portraitPhoto");
  const afStatus = document.getElementById("afStatus");
  const clapperStick = document.getElementById("clapperStick");

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    if (portraitPhoto) portraitPhoto.classList.remove("blurred-init");
    if (afStatus) afStatus.classList.add("is-locked");
    if (clapperStick) clapperStick.classList.add("is-shut");
    return;
  }

  // T + 350ms: AF HUD status lock
  setTimeout(() => {
    if (afStatus) afStatus.classList.add("is-locked");
  }, 400);

  // T + 700ms: Photo sharpens
  setTimeout(() => {
    if (portraitPhoto) {
      portraitPhoto.classList.remove("blurred-init");
      portraitPhoto.classList.add("is-sharp");
    }
  }, 750);

  // T + 1000ms: Clapperboard clap shut
  setTimeout(() => {
    if (clapperStick) {
      clapperStick.classList.add("is-shut");
    }
  }, 1100);
}

/**
 * 5. 3D ID Card Interactive Parallax (Mouse & Device Gyroscope)
 */
function init3DCardParallax() {
  const card = document.getElementById("idCard");
  const container = document.querySelector(".id-card-perspective-container");
  if (!card || !container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let bounds;
  let isHovered = false;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let animFrameId = null;

  function updateCardTransform() {
    // Smooth lerp interpolation
    currentRotateX += (targetRotateX - currentRotateX) * 0.12;
    currentRotateY += (targetRotateY - currentRotateY) * 0.12;

    if (isHovered || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
      card.classList.remove("is-floating");
      card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
    } else {
      card.style.transform = "";
      card.classList.add("is-floating");
    }

    animFrameId = requestAnimationFrame(updateCardTransform);
  }

  // Mouse Move on Laptop / Desktop
  function onMouseMove(e) {
    if (!bounds) bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) - 0.5; // -0.5 to 0.5
    const yPct = (mouseY / bounds.height) - 0.5; // -0.5 to 0.5

    targetRotateX = -yPct * 18; // Max 9 deg tilt
    targetRotateY = xPct * 18;
  }

  function onMouseEnter() {
    isHovered = true;
    bounds = container.getBoundingClientRect();
  }

  function onMouseLeave() {
    isHovered = false;
    targetRotateX = 0;
    targetRotateY = 0;
  }

  container.addEventListener("mouseenter", onMouseEnter);
  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);

  // Device Orientation (Gyroscope on mobile devices)
  function onDeviceOrientation(e) {
    if (e.beta === null || e.gamma === null) return;
    // Gamma is left/right tilt (-90 to 90), Beta is front/back tilt (-180 to 180)
    const gamma = Math.min(Math.max(e.gamma, -25), 25);
    const beta = Math.min(Math.max(e.beta - 45, -25), 25); // center at ~45deg holding angle

    targetRotateY = (gamma / 25) * 10;
    targetRotateX = -(beta / 25) * 10;
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
  }

  animFrameId = requestAnimationFrame(updateCardTransform);
}

/**
 * 6. Interactive Clapperboard
 * Clicking claps again and increments the take number.
 */
function initClapperboard() {
  const clapperboard = document.getElementById("clapperboard");
  const clapperStick = document.getElementById("clapperStick");
  const takeCounter = document.getElementById("takeCounter");
  if (!clapperboard || !clapperStick || !takeCounter) return;

  let currentTake = 1;

  function clap() {
    currentTake += 1;
    takeCounter.textContent = String(currentTake).padStart(2, "0");

    // Remove is-open and retrigger full wide open clap animation
    clapperStick.classList.remove("is-open");
    clapperStick.classList.remove("is-clapping");
    void clapperStick.offsetWidth; // Force CSS reflow
    clapperStick.classList.add("is-clapping");
  }

  // Open fully while pressing / holding click
  clapperboard.addEventListener("pointerdown", () => {
    clapperStick.classList.remove("is-clapping");
    clapperStick.classList.add("is-open");
  });

  clapperboard.addEventListener("pointerup", () => {
    clap();
  });

  clapperboard.addEventListener("pointerleave", () => {
    if (clapperStick.classList.contains("is-open")) {
      clapperStick.classList.remove("is-open");
      clapperStick.classList.add("is-shut");
    }
  });

  clapperboard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      clap();
    }
  });
}

/**
 * 7. DSLR Camera Trigger Button
 */
function initShutterFlashTrigger() {
  const cameraBtn = document.getElementById("cameraTrigger");
  if (!cameraBtn) return;

  cameraBtn.addEventListener("click", () => {
    // Micro feedback animation on camera without fullscreen flash
    cameraBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      cameraBtn.style.transform = "";
    }, 150);
  });
}
