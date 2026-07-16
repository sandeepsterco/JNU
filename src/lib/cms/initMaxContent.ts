// lib/cms/initMaxContent.ts

const BREAKPOINTS = [
    { min: 1400, classes: ["xxl", "xl", "lg", "md", "sm", ""] },
    { min: 1200, classes: ["xl", "lg", "md", "sm", ""] },
    { min: 992, classes: ["lg", "md", "sm", ""] },
    { min: 768, classes: ["md", "sm", ""] },
    { min: 575, classes: ["sm", ""] },
  ] as const;
  
  const ALL_SUFFIXES = ["xxl", "xl", "lg", "md", "sm", ""] as const;
  
  function classFor(suffix: string) {
    return suffix ? `.max-content-${suffix}` : ".max-content";
  }
  
  export function InitMaxContent(root: HTMLElement): () => void {
    const container = root.querySelector<HTMLElement>(".container");
    if (!container) return () => {};
  
    function apply(el: HTMLElement | null, value: string) {
      if (el) el.style.maxWidth = value;
    }
  
    function adjustMaxContent() {
      const containerWidth = container!.getBoundingClientRect().width;
      const rawWindowWidth = document.body.getBoundingClientRect().width;
      const windowWidth = Math.min(rawWindowWidth, 1920);
      const maxContentWidth =
        windowWidth - (windowWidth - containerWidth) / 2 + 13;
      const widthPx = `${maxContentWidth}px`;
  
      const matched = BREAKPOINTS.find((bp) => windowWidth >= bp.min);
      const activeSuffixes = new Set(matched ? matched.classes : []);
  
      ALL_SUFFIXES.forEach((suffix) => {
        const el = root.querySelector<HTMLElement>(classFor(suffix));
        if (!matched) {
          // below smallest breakpoint: only .max-content (no suffix) gets a value
          apply(el, suffix === "" ? widthPx : "");
          return;
        }
        apply(el, activeSuffixes.has(suffix) ? widthPx : "");
      });
    }
  
    // Debounced resize handler — original ran unthrottled on every resize tick
    let raf = 0;
    function onResize() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(adjustMaxContent);
    }
  
    adjustMaxContent(); // run once on mount, not just on first resize
    window.addEventListener("resize", onResize);
  
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }