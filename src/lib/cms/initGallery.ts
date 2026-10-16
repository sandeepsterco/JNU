let fancyboxCSSLoaded = false;

function loadFancyboxCSS() {
  if (fancyboxCSSLoaded) return;
  
  // Dynamically import CSS only when needed
  import("@fancyapps/ui/dist/fancybox/fancybox.css");
  fancyboxCSSLoaded = true;
}

export async function InitGallery(root: HTMLElement) {
  try {
    // Only load CSS if gallery exists
    loadFancyboxCSS();

    const { Fancybox } = await import("@fancyapps/ui");

    // Bind Fancybox to all gallery elements
    Fancybox.bind('[data-fancybox="gallery"]', {
      Carousel: {
        infinite: true,
        Thumbs: false,
        Toolbar: {
          display: {
            left: ["counter"],
            right: ["fullscreen", "close"],
          },
        },
      },
    });

    return () => {
      Fancybox.destroy();
    };
  } catch (error) {
    console.error("Failed to load Fancybox:", error);
    return () => {};
  }
}