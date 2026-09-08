'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const HIDE_SECTIONS = ['.testim_sec']

export default function HeaderScroll({
    children,
}: {
    children: React.ReactNode
}) {
    const headerRef = useRef<HTMLElement>(null)
    const lastScrollTop = useRef(0)
    const pathname = usePathname()

    const isHomePage = pathname === '/'
    const isProgramPage = pathname.includes('program')
    const isSchoolPage = pathname.includes('school')

    const baseClass = `main_header ${
        isHomePage ? 'home_header' : isProgramPage ? 'inner_header' : ''
    }`

    useEffect(() => {
        const header = headerRef.current
        if (!header) return

        const onScroll = () => {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop

            header.classList.toggle('header_fix', scrollTop > 0)

            // Hide/show on scroll direction
            // and force-hide inside certain sections
            let insideAnySection = false

            for (const selector of HIDE_SECTIONS) {
                const section =
                    document.querySelector<HTMLElement>(selector)

                if (!section) continue

                const sectionTop =
                    section.getBoundingClientRect().top + window.scrollY

                const sectionBottom =
                    sectionTop + section.offsetHeight

                if (
                    scrollTop >= sectionTop - 100 &&
                    scrollTop <= sectionBottom
                ) {
                    insideAnySection = true
                    break
                }
            }

            if (insideAnySection) {
                header.style.top = '-100%'
            } else if (
                scrollTop > lastScrollTop.current &&
                scrollTop > 100
            ) {
                header.style.top = '-100%'
            } else if (scrollTop < lastScrollTop.current) {
                header.style.top = '0'
            }

            // Always show header at page top
            if (scrollTop <= 0) {
                header.style.top = '0'
            }

            // school_header only at top on school pages
            if (isSchoolPage) {
                header.classList.toggle(
                    'school_header',
                    scrollTop <= 0
                )
            } else {
                header.classList.remove('school_header')
            }

            lastScrollTop.current = scrollTop
        }

        onScroll()

        window.addEventListener('scroll', onScroll, {
            passive: true,
        })

        return () =>
            window.removeEventListener('scroll', onScroll)
    }, [pathname, isSchoolPage])

    return (
        <header
            ref={headerRef}
            className={baseClass}
            style={{
                transition: 'top 0.3s ease',
            }}
        >
            {children}
        </header>
    )
}