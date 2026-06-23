"use client"
import { useEffect, useRef } from "react";

function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animateCount(el: HTMLElement, target: number, suffix: string, supHTML: string, duration = 2000) {
    const start = performance.now();

    function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        const current = Math.floor(eased * target);
        el.innerHTML = current + suffix + supHTML;
        if (progress < 1) requestAnimationFrame(step);
        else el.innerHTML = target + suffix + supHTML;
    }

    requestAnimationFrame(step);
}

export default function StatsCounter() {
    const counterRef = useRef<HTMLDivElement | null>(null);
    const counted = useRef(false);



    useEffect(() => {
        const container = counterRef.current;
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted.current) {
                counted.current = true;

                container.querySelectorAll<HTMLElement>('figcaption').forEach((el) => {
                    const sup = el.querySelector('sup');
                    const supHTML = sup?.outerHTML ?? '';

                    const clone = el.cloneNode(true) as HTMLElement;
                    clone.querySelectorAll('sup').forEach(s => s.remove());
                    const text = clone.textContent?.trim() ?? '';

                    const countTo = parseInt(text);
                    const suffix = text.replace(String(countTo), '');

                    animateCount(el, countTo, suffix, supHTML);
                });
            }
        }, {
            threshold: 0.2
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, [])


    return (
        <div className="counter_stats" ref={counterRef}>
            <ul>
                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <figcaption>80K<sup>+</sup></figcaption>
                    Student Community
                </li>
                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <figcaption>16<sup>+</sup></figcaption>
                    Distinguished School
                </li>
                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <figcaption>750<sup>+</sup></figcaption>
                    Expert Faculties
                </li>
                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                    <figcaption>100<sup>+</sup></figcaption>
                    Programs
                </li>
            </ul>
        </div>
    )
}