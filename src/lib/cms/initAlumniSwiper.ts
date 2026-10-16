import type Swiper from "swiper";

const SELECTOR = ".alumni_swiper:not([data-swiper-init])";

export async function InitAlumniSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Autoplay }] =
    await Promise.all([import("swiper"), import("swiper/modules")]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: Swiper[] = [];
  const removeListeners: (() => void)[] = [];

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
        effect: "slide",
        navigation: {
          nextEl: ".alumni-next",
          prevEl: ".alumni-prev",
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 3 },
          992: { slidesPerView: 3, spaceBetween: 3 },
          1200: { slidesPerView: 3.7, spaceBetween: 3 },
        },
      })
    );

    // Delegated play/pause handler — works no matter where the button
    // markup came from (React-rendered or CMS-parsed HTML).
    const handleClick = (e: Event) => {
      const button = (e.target as HTMLElement)?.closest<HTMLButtonElement>(
        ".play-pause-btn"
      );
      if (!button || !slider.contains(button)) return;

      const figure = button.closest(".alumni_img");
      if (!figure) return;

      const video = figure.querySelector<HTMLVideoElement>(".alumni_video");
      const poster = figure.querySelector<HTMLImageElement>(".alumni_poster");
      if (!video) return;

      if (video.paused) {
        if (poster) poster.style.display = "none";
        video.style.display = "block";
        video.play();
        button.textContent = "❚❚";
      } else {
        video.pause();
        button.textContent = "▶";
      }
    };

    slider.addEventListener("click", handleClick);
    removeListeners.push(() => slider.removeEventListener("click", handleClick));
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
    removeListeners.forEach((fn) => fn());
  };
}