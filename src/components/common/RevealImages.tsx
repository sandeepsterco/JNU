"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function RevealImages(){
    const pathname = usePathname();

    useEffect(()=>{
        if (window.innerWidth < 992) return;

        const imageMap = [
            { selector: '.image',  className: 'reveal-image'  },
            { selector: '.image2', className: 'reveal-image2' },
            { selector: '.image3', className: 'reveal-image3' },
        ];

        const observers: IntersectionObserver[] = [];

        imageMap.forEach(({selector, className})=>{
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add(className);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin:"0px 0px -100px 0px"
            });

            document.querySelectorAll(selector).forEach((el)=>{
                // skip elements that already have the class (avoids re-adding on same page)
                if (!el.classList.contains(className)) {
                    observer.observe(el);
                }
            });
            observers.push(observer);
        })

        return () => observers.forEach((o) => o.disconnect());
    }, [pathname])

    return null;
}