export function InitTabs(root: HTMLElement) {
  const tabGroups = root.querySelectorAll<HTMLElement>(".tabbed-content");

  tabGroups.forEach((container) => {
    const tabs = container.querySelector<HTMLElement>(".tabs");
    if (!tabs) return;

    const links = Array.from(
      tabs.querySelectorAll<HTMLAnchorElement>("a")
    );

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(".item")
    );

    if (!links.length || !items.length) return;

    const activate = (id: string) => {
      links.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${id}`);
      });

      items.forEach((item) => {
        item.classList.toggle("active", item.id === id);
      });
    };

    // Default active
    const activeLink =
      links.find((link) => link.classList.contains("active")) ?? links[0];

    const defaultId = activeLink
      .getAttribute("href")
      ?.replace("#", "");

    if (defaultId) {
      activate(defaultId);
    }

    // Desktop (Tabs)
    links.forEach((link) => {
      link.onclick = (e) => {
        if (window.getComputedStyle(tabs).display === "none") return;

        e.preventDefault();

        const id = link.getAttribute("href")?.replace("#", "");
        if (!id) return;

        activate(id);
      };
    });

    // Mobile (Accordion)
    items.forEach((item) => {
      const btn = item.querySelector<HTMLButtonElement>(".accordion-title");
      if (!btn) return;
    
      btn.onclick = () => {
        // Only run on mobile
        if (window.getComputedStyle(tabs).display !== "none") return;
    
        const isActive = item.classList.contains("active");
    
        // Close all
        items.forEach((i) => i.classList.remove("active"));
        links.forEach((l) => l.classList.remove("active"));
    
        // Open clicked item
        if (!isActive) {
          item.classList.add("active");
    
          tabs
            .querySelector<HTMLAnchorElement>(`a[href="#${item.id}"]`)
            ?.classList.add("active");
        }
      };
    });
    
  });
}