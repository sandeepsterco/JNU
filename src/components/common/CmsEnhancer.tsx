"use client";

import type Swiper from "swiper";
import { InitProgramNav } from "@/lib/cms/initProgramNav";
import { InitTabs } from "@/lib/cms/initTabs";
import { InitAdfSwiper } from "@/lib/cms/initAdfSwiper";
import { useEffect } from "react";
import { InitPlacementSwiper } from "@/lib/cms/initPlacementSwiper";
import { InitResearchSwiper } from "@/lib/cms/initResearchSwiper";
import { InitResearchHighlightSwiper } from "@/lib/cms/InitResearchHighlightSwiper";
import { InitMaxContent } from "@/lib/cms/initMaxContent";
import { usePathname } from "next/navigation";
import { InitGalleryPopup } from "@/lib/cms/initGalleryPopup";
import { InitDepartmentHero } from "@/lib/cms/initDepartmentHero";
import { InitAlumniSwiper } from "@/lib/cms/initAlumniSwiper";
import { InitAccordion } from "@/lib/cms/initAccordion";
import { InitGallery } from "@/lib/cms/initGallery";
import { initAcademicCampusSwiper } from "@/lib/cms/initAcademicCampusSwiper";
import { InitReadMore } from "@/lib/cms/initReadMore";
import { initSuccessspeakSwiper } from "@/lib/cms/initSuccessspeakSwiper";

function waitForLayout() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export default function CmsEnhancer({ containerId }: { containerId: string }) {
  const pathname = usePathname();
  
  useEffect(() => {
    let cancelled = false;
    let instances: Swiper[] = [];

    const cleanupFns: (() => void)[] = [];

    async function init() {

      await waitForLayout();
      if (cancelled) return;



      const root = document.getElementById(containerId);
      if (!root) return;

      // Initialize tabs
      if (root.querySelector(".tabbed-content")) {
        InitTabs(root);
      }

      // Initialize accordion
      if (root.querySelector(".custom-tabs")) {
        const cleanup = InitAccordion(root);
        cleanupFns.push(cleanup);
      }

      // Initialize gallery
      if (root.querySelector('[data-fancybox="gallery"]')) {
        const cleanup = await InitGallery(root);
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".program_nav")) {
        const cleanup = InitProgramNav(root);
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".adfSwiper:not([data-swiper-init])")) {
        const cleanup = await InitAdfSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".school_placement_logo_swiper")) {
        const cleanup = await InitPlacementSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".container")) {
        cleanupFns.push(InitMaxContent(root));
      }

      if (root.querySelector(".research_swiper:not([data-swiper-init])")) {
        const cleanup = await InitResearchSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }
      if (root.querySelector(".highlights_highlights:not([data-swiper-init])")) {
        const cleanup = await InitResearchHighlightSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }
       if (root.querySelector(".success_speak_slider:not([data-swiper-init])")) {
        const cleanup = await initSuccessspeakSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }

      if(root.querySelector('.custom_cms_lightbox')){
        const cleanup = await InitGalleryPopup(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".depart_hero:not([data-swiper-init])")) {
        const cleanup = await InitDepartmentHero(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }

      if (root.querySelector(".alumni_swiper:not([data-swiper-init])")) {
        const cleanup = await InitAlumniSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }
       if (root.querySelector(".aca_campusauditoriumSwiper:not([data-swiper-init])")) {
        const cleanup = await initAcademicCampusSwiper(root);
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupFns.push(cleanup);
      }
      

      // inside init(), with the others
      if (root.querySelector(".read-btn")) {
        cleanupFns.push(InitReadMore(root));
      }
    }

    init();

    return () => {
      cancelled = true;
      instances.forEach((s) => s.destroy(true, true));
      instances = [];
      
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [containerId, pathname]);

  return null;
}