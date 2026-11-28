
import AOS from "aos";

export const AOS_OPTIONS = {
  duration: 1000,
  once: true,
  easing: "ease-out-back",
  disable: () => window.innerWidth <= 991,
  offset: 0,
} as const;

let initialized = false;
let debounceTimer: number | null = null;

function revealInViewportElements() {
  // Don't manually trigger animations on mobile/tablet
  if (window.innerWidth <= 991) return;

  const offset = AOS_OPTIONS.offset;
  const viewHeight = window.innerHeight;

  document
    .querySelectorAll<HTMLElement>("[data-aos].aos-init:not(.aos-animate)")
    .forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();

      if (top < viewHeight - offset && bottom > 0) {
        el.classList.add("aos-animate");
      }
    });
}

export function initAOS() {
  if (initialized || typeof window === "undefined") return;

  AOS.init(AOS_OPTIONS);
  initialized = true;
}

export function refreshAOS() {
  if (typeof window === "undefined") return;

  initAOS();
  AOS.refreshHard();

  requestAnimationFrame(() => {
    revealInViewportElements();
  });
}

export function scheduleDebouncedRefreshAOS(debounceMs = 80) {
  if (debounceTimer) window.clearTimeout(debounceTimer);

  debounceTimer = window.setTimeout(() => {
    debounceTimer = null;
    refreshAOS();
  }, debounceMs);
}

export function scheduleRefreshAOSSequence() {
  refreshAOS();

  const delays = [150, 400, 800, 1500];

  const timers = delays.map((delay) =>
    window.setTimeout(refreshAOS, delay)
  );

  return () => timers.forEach((id) => window.clearTimeout(id));
}
