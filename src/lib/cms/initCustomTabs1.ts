export function CustomTabs1(root: HTMLElement): () => void {
  const cleanups: (() => void)[] = [];

  const containers = root.querySelectorAll<HTMLElement>(".custom-tabs-1");

  containers.forEach((container) => {
    const contents = Array.from(
      container.querySelectorAll<HTMLElement>(".home_tab_content")
    );
    const tabs = Array.from(
      container.querySelectorAll<HTMLElement>("ul.home_tabs li")
    );
    const drawers = Array.from(
      container.querySelectorAll<HTMLElement>(".tab_drawer_heading")
    );

    if (!contents.length) return;

    let currentAnimation: Animation | null = null;

    const hideAll = () => {
      contents.forEach((c) => {
        c.style.display = "none";
      });
    };

    // Equivalent of jQuery fadeIn()
    const fadeIn = (el: HTMLElement) => {
      currentAnimation?.cancel();
      el.style.display = "block";

      if (typeof el.animate === "function") {
        currentAnimation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          easing: "ease",
        });
      }
    };

    const activate = (rel: string | null, animate = true) => {
      if (!rel) return;

      // rel is used as a class name of the content block
      const target = contents.find((c) => c.classList.contains(rel));
      if (!target) return;

      hideAll();
      if (animate) {
        fadeIn(target);
      } else {
        target.style.display = "block";
      }

      tabs.forEach((t) =>
        t.classList.toggle("home_active", t.getAttribute("rel") === rel)
      );

      drawers.forEach((d) =>
        d.classList.toggle("d_active", d.getAttribute("rel") === rel)
      );
    };

    // Initial state: hide all, show first (no animation, like the original)
    hideAll();
    contents[0].style.display = "block";

    // Keep tab / drawer active state in sync with the first content
    const firstRel =
      tabs[0]?.getAttribute("rel") ?? drawers[0]?.getAttribute("rel") ?? null;
    if (firstRel) {
      tabs.forEach((t) =>
        t.classList.toggle("home_active", t.getAttribute("rel") === firstRel)
      );
      drawers.forEach((d) =>
        d.classList.toggle("d_active", d.getAttribute("rel") === firstRel)
      );
    }

    // Tab clicks (desktop)
    tabs.forEach((tab) => {
      const handler = () => activate(tab.getAttribute("rel"));
      tab.addEventListener("click", handler);
      cleanups.push(() => tab.removeEventListener("click", handler));
    });

    // Drawer heading clicks (mobile)
    drawers.forEach((drawer) => {
      const handler = () => activate(drawer.getAttribute("rel"));
      drawer.addEventListener("click", handler);
      cleanups.push(() => drawer.removeEventListener("click", handler));
    });

    // $section.find('ul.home_tabs li:last').addClass('tab_last')
    const lastTab = tabs[tabs.length - 1];
    if (lastTab) {
      lastTab.classList.add("tab_last");
      cleanups.push(() => lastTab.classList.remove("tab_last"));
    }

    cleanups.push(() => currentAnimation?.cancel());
  });

  return () => cleanups.forEach((fn) => fn());
}