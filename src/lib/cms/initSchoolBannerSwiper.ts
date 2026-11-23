import Swiper from "swiper";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SLIDE_TIMING = 5000;

export async function InitSchoolBannerSwiper(root: HTMLElement): Promise<() => void> {
  const instances: Swiper[] = [];
  const cleanups: (() => void)[] = [];
  const elements = Array.from(
    root.querySelectorAll<HTMLElement>(".school_swiper:not([data-swiper-init])")
  );

  elements.forEach((el) => {
    const paginationEl = el.querySelector<HTMLElement>(".school_pagination");
    const multiple = el.querySelectorAll(".swiper-slide").length > 1;

    const startProgress = () => {
      if (!paginationEl) return;
      paginationEl.querySelectorAll<HTMLElement>(".progress").forEach((p) => {
        p.style.animation = "none";
        void p.getBoundingClientRect(); // force reflow so animation restarts
      });
      const active = paginationEl.querySelector<HTMLElement>(
        ".swiper-pagination-bullet-active .progress"
      );
      if (active) {
        active.style.animation = `schoolProgressAnim ${SLIDE_TIMING}ms linear forwards`;
      }
    };

    const swiper = new Swiper(el, {
      modules: [Pagination, Autoplay, EffectFade],
      slidesPerView: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: multiple,
      speed: 500,
      allowTouchMove: multiple,
      autoplay: multiple
        ? { delay: SLIDE_TIMING, disableOnInteraction: false }
        : false,
      pagination:
        multiple && paginationEl
          ? {
              el: paginationEl,
              clickable: true,
              renderBullet: (index: number, className: string) => `
                <span class="${className}">
                  <span class="bullet-dot"></span>
                  <div class="bullet-content">
                    <span class="bullet-num">${index + 1}</span>
                    <svg class="progress-ring" width="24" height="24" viewBox="0 0 24 24">
                      <circle class="progressbg" cx="12" cy="12" r="11"></circle>
                      <circle class="progress" cx="12" cy="12" r="11"></circle>
                    </svg>
                  </div>
                </span>`,
            }
          : false,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });

    swiper.on("realIndexChange", startProgress);
    const t = setTimeout(startProgress, 0); // initial bullet

    el.setAttribute("data-swiper-init", "true");
    instances.push(swiper);
    cleanups.push(() => {
      clearTimeout(t);
      swiper.off("realIndexChange", startProgress);
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    instances.forEach((s) => s.destroy(true, true));
    elements.forEach((el) => el.removeAttribute("data-swiper-init"));
  };
}