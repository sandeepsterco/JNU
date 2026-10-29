import type Swiper from "swiper";

const CONTAINER_SELECTOR = ".custom_cms_lightbox";
const ITEM_SELECTOR = ".custom_lightbox";

interface GalleryItem {
  thumbnail: string;
  title: string;
  date: string;
}

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export async function InitGalleryPopup(root: HTMLElement): Promise<() => void> {
  const containers = root.querySelectorAll<HTMLElement>(
    `${CONTAINER_SELECTOR}:not([data-gallery-init])`
  );
  if (!containers.length) return () => {};

  const [{ default: SwiperCore }, { Navigation }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const cleanupFns: (() => void)[] = [];

  containers.forEach((container) => {
    container.dataset.galleryInit = "true";

    const boxes = Array.from(
      container.querySelectorAll<HTMLElement>(ITEM_SELECTOR)
    );
    if (!boxes.length) return;

    const items: GalleryItem[] = boxes.map((box) => {
      const img = box.querySelector("img");
      const overlayTitle = box.querySelector(".gallery_overlay h4");
      const overlayDate = box.querySelector(".gallery_overlay span");
      return {
        thumbnail: box.dataset.thumbnail || img?.getAttribute("src") || "",
        title: box.dataset.title || overlayTitle?.innerHTML || img?.getAttribute("alt") || "",
        date: box.dataset.date || overlayDate?.textContent || "",
      };
    });

    // Build the modal once per container, appended to <body> so it
    // isn't clipped by any overflow:hidden ancestor from the CMS html.
    const modal = document.createElement("div");
    modal.className = "gallery_modal";
    modal.style.display = "none";
    modal.innerHTML = `
      <div class="gallery_wrap">
        <button class="gallery_close" type="button">✕</button>
        <div class="gallerySwiper swiper">
          <div class="swiper-wrapper">
            ${items
              .map(
                (item) => `
              <div class="swiper-slide">
                <img src="${item.thumbnail}" alt="" />
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="gallery_info">
          <div class="gallery_date"></div>
          <div class="gallery_title"></div>
          <div class="gallery_nav">
            <div class="gallery_prev cursor-pointer"><img src="/images/icons/left_arrow.svg" alt="prev" /></div>
            <div class="gallery_next cursor-pointer"><img src="/images/icons/right_arrow.svg" alt="next" /></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const dateEl = modal.querySelector<HTMLElement>(".gallery_date")!;
    const titleEl = modal.querySelector<HTMLElement>(".gallery_title")!;
    const closeBtn = modal.querySelector<HTMLElement>(".gallery_close")!;
    const prevBtn = modal.querySelector<HTMLElement>(".gallery_prev")!;
    const nextBtn = modal.querySelector<HTMLElement>(".gallery_next")!;
    const swiperEl = modal.querySelector<HTMLElement>(".gallerySwiper")!;

    let swiperInstance: Swiper | null = null;

    const updateInfo = (index: number) => {
      const item = items[index];
      if (!item) return;
      dateEl.textContent = item.date ? formatDate(item.date) : "";
      dateEl.style.display = item.date ? "" : "none";
      titleEl.innerHTML = item.title || "";
      titleEl.style.display = item.title ? "" : "none";
    };

    const openModal = (index: number) => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      if (!swiperInstance) {
        swiperInstance = new SwiperCore(swiperEl, {
          modules: [Navigation],
          loop: items.length > 1,
          initialSlide: index,
          on: { slideChange: (sw) => updateInfo(sw.realIndex) },
        });
      } else {
        swiperInstance.slideToLoop(index, 0);
      }
      updateInfo(index);
    };

    const closeModal = () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    };

    const boxHandlers: { el: HTMLElement; handler: () => void }[] = [];
    boxes.forEach((box, index) => {
      const handler = () => openModal(index);
      box.style.cursor = "pointer";
      box.addEventListener("click", handler);
      boxHandlers.push({ el: box, handler });
    });

    const onOverlayClick = (e: MouseEvent) => {
      if (e.target === modal) closeModal();
    };

    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", () => swiperInstance?.slidePrev());
    nextBtn.addEventListener("click", () => swiperInstance?.slideNext());
    modal.addEventListener("click", onOverlayClick);

    cleanupFns.push(() => {
      boxHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
      closeBtn.removeEventListener("click", closeModal);
      modal.removeEventListener("click", onOverlayClick);
      swiperInstance?.destroy(true, true);
      modal.remove();
      delete container.dataset.galleryInit;
    });
  });

  return () => cleanupFns.forEach((fn) => fn());
}