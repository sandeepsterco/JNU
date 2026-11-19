import type Swiper from "swiper";

const SELECTOR = ".socss_library_facili:not([data-swiper-init])";

export async function initSOCSSLibraryFacilitiesSwiper(root: HTMLElement): Promise<() => void> {
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
          768: { slidesPerView: 2, spaceBetween: 3 },
          992: { slidesPerView: 5, spaceBetween: 3 },
          1200: { slidesPerView: 6, spaceBetween: 3 },
        },
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}