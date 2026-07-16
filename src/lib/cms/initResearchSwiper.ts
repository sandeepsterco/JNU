
import type Swiper from "swiper";

const SELECTOR = ".research_swiper:not([data-swiper-init])";

export async function InitResearchSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Pagination, Autoplay, Navigation }] =
    await Promise.all([import("swiper"), import("swiper/modules")]);
  await Promise.all([import("swiper/css"), import("swiper/css/pagination")]);

  const instances: Swiper[] = [];

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";

    instances.push(
      new SwiperCore(slider, {
        modules: [Pagination, Autoplay, Navigation],
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 2000,
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "slide",
        navigation: {
            nextEl: ".arival-next",
            prevEl: ".arival-prev",
        },
        grabCursor: true,
        breakpoints: {
            320: {
                slidesPerView:1,
                spaceBetween: 0
            },
            768: {
                slidesPerView:2,
                spaceBetween: 0
            },
            992: {
                slidesPerView:3,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 4,
                spaceBetween:0
            }
        }
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}