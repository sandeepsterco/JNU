export function InitCommonAccordion(root: HTMLElement) {
  const wrappers = root.querySelectorAll<HTMLElement>(".common_accordion");
  const cleanupFns: (() => void)[] = [];

  wrappers.forEach((wrapper) => {
    const allItems = Array.from(
      wrapper.querySelectorAll<HTMLElement>(".fundacc_item")
    );

    // Resolve the parts of an item. `inner` falls back to the panel's first
    // child so CMS markup without .fundacc_inner still works.
    const getParts = (item: HTMLElement) => {
      const heading = item.querySelector<HTMLElement>(".fundacc_heading");
      const panel = item.querySelector<HTMLElement>(".fundacc_panel");
      const inner =
        item.querySelector<HTMLElement>(".fundacc_inner") ??
        (panel?.firstElementChild as HTMLElement | null);
      return { heading, panel, inner };
    };

    // Only keep items that are actually usable
    const items = allItems.filter((item) => {
      const { heading, panel, inner } = getParts(item);
      return heading && panel && inner;
    });
    if (!items.length) return;

    const closeAll = () => {
      items.forEach((item) => {
        item.classList.remove("fundacc_active");
        const { panel } = getParts(item);
        if (panel) panel.style.height = "0px";
      });
    };

    const openItem = (item: HTMLElement) => {
      const { panel, inner } = getParts(item);
      if (!panel || !inner) return;
      item.classList.add("fundacc_active");
      panel.style.height = inner.scrollHeight + "px";
    };

    // Re-measure the currently open panel
    const syncHeight = () => {
      const active = wrapper.querySelector<HTMLElement>(
        ".fundacc_item.fundacc_active"
      );
      if (!active) return;
      const { panel, inner } = getParts(active);
      if (panel && inner) panel.style.height = inner.scrollHeight + "px";
    };

    items.forEach((item) => {
      const { heading } = getParts(item);
      if (!heading) return;

      const onClick = (e: Event) => {
        e.preventDefault();
        const isActive = item.classList.contains("fundacc_active");

        // Close all items in this wrapper
        closeAll();

        // Open clicked item if it was closed
        if (!isActive) openItem(item);
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(e);
        }
      };

      heading.addEventListener("click", onClick);
      heading.addEventListener("keydown", onKeyDown);

      // Accessibility
      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");

      cleanupFns.push(() => {
        heading.removeEventListener("click", onClick);
        heading.removeEventListener("keydown", onKeyDown);
      });
    });

    // Keep the open panel's height correct when content or layout changes
    // (window resize, images loading, a hidden tab becoming visible)
    window.addEventListener("resize", syncHeight);
    cleanupFns.push(() => window.removeEventListener("resize", syncHeight));

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(syncHeight);
      items.forEach((item) => {
        const { inner } = getParts(item);
        if (inner) ro.observe(inner);
      });
      cleanupFns.push(() => ro.disconnect());
    }

    // Open the first item by default, unless the author already marked one active
    const defaultItem =
      items.find((i) => i.classList.contains("fundacc_active")) ?? items[0];

    closeAll();
    const raf = requestAnimationFrame(() => openItem(defaultItem));
    cleanupFns.push(() => cancelAnimationFrame(raf));
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}