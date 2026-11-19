import type Swiper from "swiper";

const SELECTOR = ".socss_industry_tie:not([data-swiper-init])";

export async function initSOCSSIndustryTieSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Autoplay }] =
    await Promise.all([import("swiper"), import("swiper/modules")]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: Swiper[] = [];

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";

    const hasMultiple = slider.dataset.loop === "true";

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay],
        loop: hasMultiple,
        autoplay: hasMultiple
          ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false,
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: ".alumni-next",
          prevEl: ".alumni-prev",
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 60 },
          992: { slidesPerView:4, spaceBetween: 40 },
          1200: { slidesPerView: 5, spaceBetween: 60 },
        },
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}