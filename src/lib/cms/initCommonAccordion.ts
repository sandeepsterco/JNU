export function InitCommonAccordion(root: HTMLElement) {
    const wrappers = root.querySelectorAll<HTMLElement>(".common_accordion");
    const cleanupFns: (() => void)[] = [];
  
    wrappers.forEach((wrapper) => {
      const items = Array.from(
        wrapper.querySelectorAll<HTMLElement>(".fundacc_item")
      );
      if (!items.length) return;
  
      const closeAll = () => {
        items.forEach((item) => {
          item.classList.remove("fundacc_active");
          const panel = item.querySelector<HTMLElement>(".fundacc_panel");
          if (panel) panel.style.height = "0px";
        });
      };
  
      items.forEach((item) => {
        const heading = item.querySelector<HTMLElement>(".fundacc_heading");
        const panel = item.querySelector<HTMLElement>(".fundacc_panel");
        const inner = item.querySelector<HTMLElement>(".fundacc_inner");
        if (!heading || !panel || !inner) return;
  
        const onClick = (e: Event) => {
          e.preventDefault();
          const isActive = item.classList.contains("fundacc_active");
  
          // Close all items in this wrapper
          closeAll();
  
          // Open clicked item if it was closed
          if (!isActive) {
            item.classList.add("fundacc_active");
            panel.style.height = inner.scrollHeight + "px";
          }
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
  
      // Keep open panel height correct on window resize
      const onResize = () => {
        const activeItem = wrapper.querySelector<HTMLElement>(
          ".fundacc_item.fundacc_active"
        );
        if (!activeItem) return;
  
        const panel = activeItem.querySelector<HTMLElement>(".fundacc_panel");
        const inner = activeItem.querySelector<HTMLElement>(".fundacc_inner");
        if (panel && inner) {
          panel.style.height = inner.scrollHeight + "px";
        }
      };
  
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));
    });
  
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }