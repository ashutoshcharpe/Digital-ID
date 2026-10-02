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
  initAudioUnlock();
  initWhatsAppButton();
  initCurrentDate();
  initLiveTimecode();
  initOrchestratedLoadSequence();
  init3DCardParallax();
  initClapperboard();
  initPhotoAndCameraClick();
});

/**
 * ------------------------------------------------------------------------------
 * 🔊 WEB AUDIO API SOUND GENERATORS (No external files required)
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
 * Unlock audio context on the first user interaction (touch/click)
 */
function initAudioUnlock() {
  const unlock = () => {
    getAudioContext();
    document.removeEventListener("pointerdown", unlock);
    document.removeEventListener("click", unlock);
  };
  document.addEventListener("pointerdown", unlock, { once: true });
  document.addEventListener("click", unlock, { once: true });
}

/**
 * Authentic Wooden Film Clapperboard Snap Sound
 */
function playClapperSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. High-frequency snappy wooden crack / slap (Broadband impact)
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

    // 2. Resonant Solid Wood Body Clack (Low-mid punch)
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

    // 3. Secondary Rebound Wooden Snap (25ms later)
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
}

/**
 * Authentic DSLR Camera Focus & Shutter Click Sound (Dual curtain ka-chick)
 */
function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // A. Focus Confirmation Electronic Chirp
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

    // B. Mirror Lift & Shutter Opening Click (T + 35ms)
    const tOpen = now + 0.035;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(650, tOpen);
    osc1.frequency.exponentialRampToValueAtTime(180, tOpen + 0.03);
    gain1.gain.setValueAtTime(0.6, tOpen);
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
    noiseGain1.gain.setValueAtTime(0.8, tOpen);
    noiseGain1.gain.exponentialRampToValueAtTime(0.001, tOpen + 0.04);
    noise1.connect(filter1);
    filter1.connect(noiseGain1);
    noiseGain1.connect(ctx.destination);
    noise1.start(tOpen);

    // D. Second Shutter Curtain Return Click (T + 105ms)
    const tClose = now + 0.105;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(500, tClose);
    osc2.frequency.exponentialRampToValueAtTime(140, tClose + 0.04);
    gain2.gain.setValueAtTime(0.65, tClose);
    gain2.gain.exponentialRampToValueAtTime(0.001, tClose + 0.04);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(tClose);
    osc2.stop(tClose + 0.04);

    const noise2 = ctx.createBufferSource();
    noise2.buffer = buffer1;
    const noiseGain2 = ctx.createGain();
    noiseGain2.gain.setValueAtTime(0.85, tClose);
    noiseGain2.gain.exponentialRampToValueAtTime(0.001, tClose + 0.05);
    noise2.connect(filter1);
    filter1.connect(noiseGain2);
    noiseGain2.connect(ctx.destination);
    noise2.start(tClose);
  } catch (e) {
    console.warn("AudioContext shutter error:", e);
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
    
    // Format number (e.g. +91 76204 43842)
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
 */
function initOrchestratedLoadSequence() {
  const portraitPhoto = document.getElementById("portraitPhoto");
  const afStatus = document.getElementById("afStatus");
  const clapperStick = document.getElementById("clapperStick");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    if (portraitPhoto) portraitPhoto.classList.remove("blurred-init");
    if (afStatus) afStatus.classList.add("is-locked");
    if (clapperStick) clapperStick.classList.add("is-shut");
    return;
  }

  // T + 400ms: AF HUD status lock
  setTimeout(() => {
    if (afStatus) afStatus.classList.add("is-locked");
  }, 400);

  // T + 750ms: Photo sharpens
  setTimeout(() => {
    if (portraitPhoto) {
      portraitPhoto.classList.remove("blurred-init");
      portraitPhoto.classList.add("is-sharp");
    }
  }, 750);

  // T + 1100ms: Clapperboard clap shut
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

  function updateCardTransform() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.12;
    currentRotateY += (targetRotateY - currentRotateY) * 0.12;

    if (isHovered || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
      card.classList.remove("is-floating");
      card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
    } else {
      card.style.transform = "";
      card.classList.add("is-floating");
    }

    requestAnimationFrame(updateCardTransform);
  }

  function onMouseMove(e) {
    if (!bounds) bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) - 0.5;
    const yPct = (mouseY / bounds.height) - 0.5;

    targetRotateX = -yPct * 18;
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

  function onDeviceOrientation(e) {
    if (e.beta === null || e.gamma === null) return;
    const gamma = Math.min(Math.max(e.gamma, -25), 25);
    const beta = Math.min(Math.max(e.beta - 45, -25), 25);

    targetRotateY = (gamma / 25) * 10;
    targetRotateX = -(beta / 25) * 10;
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
  }

  requestAnimationFrame(updateCardTransform);
}

/**
 * 6. Interactive Clapperboard
 * Clicking claps the stick, plays audio snap, and increments take count.
 */
function initClapperboard() {
  const clapperboard = document.getElementById("clapperboard");
  const clapperStick = document.getElementById("clapperStick");
  const takeCounter = document.getElementById("takeCounter");
  if (!clapperboard || !clapperStick || !takeCounter) return;

  let currentTake = 1;
  let isPointerDown = false;

  function executeClap() {
    currentTake += 1;
    takeCounter.textContent = String(currentTake).padStart(2, "0");

    // Play loud authentic wooden clapper sound
    playClapperSound();

    // Trigger clap animation
    clapperStick.classList.remove("is-open");
    clapperStick.classList.remove("is-clapping");
    void clapperStick.offsetWidth; // Force CSS reflow
    clapperStick.classList.add("is-clapping");
  }

  // Pointer down: swing fully open
  clapperboard.addEventListener("pointerdown", () => {
    isPointerDown = true;
    getAudioContext(); // Resume/unlock audio context instantly
    clapperStick.classList.remove("is-clapping");
    clapperStick.classList.add("is-open");
  });

  // Pointer up: snap shut with sound & take increment
  clapperboard.addEventListener("pointerup", () => {
    if (isPointerDown) {
      isPointerDown = false;
      executeClap();
    }
  });

  // Pointer leave cancel
  clapperboard.addEventListener("pointerleave", () => {
    if (isPointerDown) {
      isPointerDown = false;
      clapperStick.classList.remove("is-open");
      clapperStick.classList.add("is-shut");
    }
  });

  // Accessible Keyboard Enter/Space
  clapperboard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      executeClap();
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

    // Visual micro focus pulse on HUD
    if (afStatus) {
      afStatus.style.color = "#10b981";
      afStatus.textContent = "AF LOCK • SNAP";
      setTimeout(() => {
        afStatus.textContent = "AF-S LOCK";
        afStatus.style.color = "";
      }, 600);
    }

    if (elem) {
      elem.style.transform = "scale(0.985)";
      setTimeout(() => {
        elem.style.transform = "";
      }, 120);
    }
  }

  if (viewfinder) {
    viewfinder.addEventListener("click", () => {
      triggerCameraClick(portraitPhoto);
    });
  }

  if (cameraBtn) {
    cameraBtn.addEventListener("click", () => {
      triggerCameraClick(cameraBtn);
    });
  }
}
