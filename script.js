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
const WA_NUMBER = ""; // <-- EDIT YOUR WHATSAPP NUMBER HERE (e.g. "917620443842")

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppButton();
  initCurrentDate();
  initLiveTimecode();
  initOrchestratedLoadSequence();
  init3DCardParallax();
  initClapperboard();
  initShutterFlashTrigger();
});

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

    // Retrigger clap animation
    clapperStick.classList.remove("is-clapping");
    void clapperStick.offsetWidth; // Force CSS reflow
    clapperStick.classList.add("is-clapping");
  }

  clapperboard.addEventListener("click", clap);
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
