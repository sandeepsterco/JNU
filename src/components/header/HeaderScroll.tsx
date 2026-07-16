'use client'

import { useEffect, useRef } from 'react'

const HIDE_SECTIONS = ['.testim_sec']

export default function HeaderScroll({
    baseClass,
    children,
}: {
    baseClass: string
    children: React.ReactNode
}) {
    const headerRef = useRef<HTMLElement>(null)
    const lastScrollTop = useRef(0)

    useEffect(() => {
        const header = headerRef.current
        if (!header) return

        const onScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop

            header.classList.toggle('header_fix', scrollTop > 0)

            // hide/show on scroll direction, and force-hide inside certain sections
            let insideAnySection = false
            for (const selector of HIDE_SECTIONS) {
                const section = document.querySelector<HTMLElement>(selector)
                if (!section) continue
                const sectionTop = section.getBoundingClientRect().top + window.scrollY
                const sectionBottom = sectionTop + section.offsetHeight
                if (scrollTop >= sectionTop - 100 && scrollTop <= sectionBottom) {
                    insideAnySection = true
                    break
                }
            }

            if (insideAnySection) {
                header.style.transform = 'translateY(-100%)'
            } else if (scrollTop > lastScrollTop.current && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)'
            } else if (scrollTop < lastScrollTop.current) {
                header.style.transform = 'translateY(0)'
            }

            if (scrollTop <= 0) {
                header.style.transform = 'translateY(0)'
            }

            lastScrollTop.current = scrollTop
        }

        onScroll() 
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header ref={headerRef} className={baseClass} style={{ transition: 'transform 0.3s ease' }}>
            {children}
        </header>
    )
}