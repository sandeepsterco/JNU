import type { Swiper as SwiperType } from "swiper";

const SELECTOR = ".success_speak_swiper:not([data-swiper-init])";
const MAX_PER_VIEW = 4;

export async function initSuccessspeakSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
  if (!sliders.length) return () => {};

  const [{ default: Swiper }, { Autoplay, Navigation }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await import("swiper/css");

  if (!root.isConnected) return () => {};

  const entries: { el: HTMLElement; swiper: SwiperType }[] = [];

  sliders.forEach((el) => {
    if (el.dataset.swiperInit) return;
    el.dataset.swiperInit = "true";

    // Arrows (if you add them) live inside the .success_speak_slider wrapper
    const scope = el.closest<HTMLElement>(".success_speak_slider") ?? el;
    const nextEl = scope.querySelector<HTMLElement>(".arival-next");
    const prevEl = scope.querySelector<HTMLElement>(".arival-prev");

    const slideCount = el.querySelectorAll(".swiper-slide").length;
    const canLoop = slideCount > MAX_PER_VIEW;

    const swiper = new Swiper(el, {
      modules: [Autoplay, Navigation],
      loop: canLoop,
      rewind: !canLoop,
      speed: 2000,
      grabCursor: true,
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 26 },
        992: { slidesPerView: 3, spaceBetween: 26 },
        1200: { slidesPerView: MAX_PER_VIEW, spaceBetween: 26 },
      },
    });

    entries.push({ el, swiper });
  });

  return () => {
    entries.forEach(({ el, swiper }) => {
      swiper.destroy(true, true);
      delete el.dataset.swiperInit;
    });
  };
}