export function InitAccordion(root: HTMLElement) {
  const customTabs = root.querySelectorAll<HTMLElement>(".custom-tabs");

  customTabs.forEach((container) => {
    const accordionTabs = Array.from(
      container.querySelectorAll<HTMLElement>(".accordion_tab")
    );

    if (!accordionTabs.length) return;

    const closeAllTabs = (excludeTab?: HTMLElement) => {
      accordionTabs.forEach((tab) => {
        if (tab === excludeTab) return;

        tab.classList.remove("accordion_active");
        const content = tab.querySelector<HTMLElement>(".tab_content");
        if (content) {
          content.style.height = "0px";
        }
      });
    };

    const openTab = (tab: HTMLElement) => {
      const content = tab.querySelector<HTMLElement>(".tab_content");
      if (!content) return;

      tab.classList.add("accordion_active");
      content.style.height = content.scrollHeight + "px";

      // Recalculate height on content change (images, etc.)
      const observer = new ResizeObserver(() => {
        if (tab.classList.contains("accordion_active")) {
          content.style.height = content.scrollHeight + "px";
        }
      });
      observer.observe(content);
    };

    const toggleTab = (tab: HTMLElement) => {
      const isOpen = tab.classList.contains("accordion_active");

      if (isOpen) {
        closeAllTabs();
      } else {
        closeAllTabs(tab);
        openTab(tab);
      }
    };

    // Add click handlers to tab headings
    accordionTabs.forEach((tab) => {
      const heading = tab.querySelector<HTMLElement>(".tab_heading");
      if (!heading) return;

      heading.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTab(tab);
      });

      // Allow keyboard navigation
      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");

      heading.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTab(tab);
        }
      });
    });

    // Optional: Open first tab by default
    if (accordionTabs.length > 0) {
      openTab(accordionTabs[0]);
    }
  });

  return () => {
    // Cleanup function
    customTabs.forEach((container) => {
      const accordionTabs = container.querySelectorAll<HTMLElement>(
        ".accordion_tab"
      );
      accordionTabs.forEach((tab) => {
        const heading = tab.querySelector<HTMLElement>(".tab_heading");
        if (heading) {
          heading.removeEventListener("click", () => {});
          heading.removeEventListener("keydown", () => {});
        }
      });
    });
  };
}