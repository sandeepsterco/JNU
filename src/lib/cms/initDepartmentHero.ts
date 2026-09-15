import type Swiper from "swiper";

const SELECTOR = ".depart_hero:not([data-swiper-init])";

function startProgressAnimation(delay: number) {
  document.querySelectorAll<HTMLElement>(".progress").forEach((el) => {
    el.style.animation = "none";
    void el.offsetWidth; // force reflow
  });

  const activeProgress = document.querySelector<HTMLElement>(
    ".swiper-pagination-bullet-active .progress"
  );

  if (activeProgress) {
    activeProgress.style.animation = `progressAnim ${delay}ms linear forwards`;
  }
}

export async function InitDepartmentHero(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Pagination, Autoplay, EffectFade }] =
    await Promise.all([import("swiper"), import("swiper/modules")]);
  await Promise.all([
    import("swiper/css"),
    import("swiper/css/pagination"),
    import("swiper/css/effect-fade"),
  ]);

  const instances: Swiper[] = [];
  const slideTiming = 5000;

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";

    const paginationEl = slider
      .closest(".deparment_banner")
      ?.querySelector<HTMLElement>(".dep_hero_pagination");

    instances.push(
      new SwiperCore(slider, {
        modules: [Pagination, Autoplay, EffectFade],
        loop: true,
        effect: "fade",
        speed: 500,
        autoplay: {
          delay: slideTiming,
          disableOnInteraction: false,
        },
        pagination: paginationEl
          ? {
              el: paginationEl,
              clickable: true,
              renderBullet: (index: number, className: string) => {
                const num = index + 1;
                return `
                  <span class="${className}">
                    <span class="bullet-dot"></span>
                    <div class="bullet-content">
                      <span class="bullet-num">${num}</span>
                      <svg class="progress-ring" width="24" height="24" viewBox="0 0 24 24">
                        <circle class="progressbg" cx="12" cy="12" r="11"></circle>
                        <circle class="progress" cx="12" cy="12" r="11"></circle>
                      </svg>
                    </div>
                  </span>
                `;
              },
            }
          : undefined,
          on: {
            init() {
              startProgressAnimation(slideTiming);
            },
            realIndexChange() {
              startProgressAnimation(slideTiming);
            },
          },
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}