"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const imageMap = [
  { selector: '.image',  className: 'reveal-image'  },
  { selector: '.image2', className: 'reveal-image2' },
  { selector: '.image3', className: 'reveal-image3' },
]

export default function RevealImages() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.innerWidth < 992) return

    const observers: IntersectionObserver[] = []
    const ioMap = new Map<string, IntersectionObserver>()

    imageMap.forEach(({ selector, className }) => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className)
              io.unobserve(entry.target)
            }
          })
        },
        { rootMargin: "0px 0px -100px 0px" }
      )
      ioMap.set(selector, io)
      observers.push(io)
    })

    const observeEl = (el: Element) => {
      imageMap.forEach(({ selector, className }) => {
        if (el.matches?.(selector) && !el.classList.contains(className)) {
          ioMap.get(selector)!.observe(el)
        }
        // also catch matches nested inside newly added nodes
        el.querySelectorAll?.(selector).forEach((child) => {
          if (!child.classList.contains(className)) {
            ioMap.get(selector)!.observe(child)
          }
        })
      })
    }

    // 1. Observe whatever already exists right now
    imageMap.forEach(({ selector, className }) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains(className)) {
          ioMap.get(selector)!.observe(el)
        }
      })
    })

    // 2. Watch for anything added later (async-rendered images/components)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) observeEl(node)
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observers.forEach((o) => o.disconnect())
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}