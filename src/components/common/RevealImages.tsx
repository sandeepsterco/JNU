"use client"
import { useEffect } from "react"

export default function RevealImages(){

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

            document.querySelectorAll(selector).forEach((el)=>observer.observe(el));
            observers.push(observer);
        })

        return () => observers.forEach((o) => o.disconnect());
    }, [])

    return null;
}