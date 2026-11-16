import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export async function initPlacementsOverviewSlider(
  root: HTMLElement
): Promise<() => void> {
  const instances: Swiper[] = [];
  const elements = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".placement_ovr_slider:not([data-swiper-init])"
    )
  );

  elements.forEach((el) => {
    const nextEl = el.querySelector<HTMLElement>(".swiper-button-next");
    const prevEl = el.querySelector<HTMLElement>(".swiper-button-prev");
    const paginationEl = el.querySelector<HTMLElement>(".swiper-pagination");

    const swiper = new Swiper(el, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 4,
      spaceBetween: 0,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      pagination: paginationEl
        ? { el: paginationEl, clickable: true }
        : false,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });

    el.setAttribute("data-swiper-init", "true");
    instances.push(swiper);
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
    elements.forEach((el) => el.removeAttribute("data-swiper-init"));
  };
}