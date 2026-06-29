"use client"
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useCallback, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './banner.css';
import Image from 'next/image';
import { APPLY_NOW } from '@/config/config';
import Link from 'next/link';

interface BannerItem {
    heading: string;
    subheading: string;
    logo: string;
    logodescription: string;
    banner: string;
    mobilebanner:string;
}

interface HomeBannerProps {
    data: {
        banner: BannerItem[]
    }
}

const slideTiming = 5000;

export default function HomeBanner({ data }: HomeBannerProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const bannerData = data.banner;

    const startProgressAnimation = useCallback(() => {
        document.querySelectorAll<HTMLElement>('.hero_pagination .progress').forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
        });

        const activeProgress = document.querySelector<HTMLElement>(
            ".hero_pagination .swiper-pagination-bullet-active .progress"
        );

        if (activeProgress) {
            activeProgress.style.animation = `progressAnim ${slideTiming}ms linear forwards`;
        }
    }, [])

    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        swiper.on('realIndexChange', startProgressAnimation);
        return () => {
            swiper.off('realIndexChange', startProgressAnimation);
        }
    }, [])

    return (
        <section className="hero_banner">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                loop={true}
                effect="fade"
                speed={500}
                autoplay={{
                    delay: slideTiming,
                    disableOnInteraction: false
                }}
                pagination={{
                    el: ".hero_pagination",
                    clickable: true,
                    renderBullet: (index: number, className: string) => {
                        const num = index + 1;
                        return `
                            <span class="${className}">
                                <span class="bullet-dot"></span>
                                <div class="bullet-content">
                                    <span class="bullet-num">${num}</span>
                                    <svg class="progress-ring" width="24" height="24" viewBox="0 0 24 24">
                                        <circle class="progressbg" cx="12" cy="12" r="11"></circle>
                                        <circle class="progress" cx="12" cy="12" r="11"></circle>
                                    </svg>
                                </div>
                            </span>
                        `;
                    }
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setTimeout(startProgressAnimation, 0);
                }}
                className="hero_swiper"
            >
                {bannerData?.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="slider_inner">
                            <div className="slidetitle_container">
                                <div className="slider_title">
                                    {item.heading && (
                                        <div dangerouslySetInnerHTML={{ __html: item?.heading }} />
                                    )}
                                    {item.subheading && (
                                        <p>{item.subheading}</p>
                                    )}
                                    <div className="logo_banner">
                                        {item.logo && (
                                            <img src={item.logo} className="img-fluid w-100" alt="Banner Logo" />
                                        )}
                                        {item.logodescription && (
                                            <div className="emp_by" dangerouslySetInnerHTML={{ __html: item.logodescription }} />
                                        )}
                                    </div>
                                    <div className="banner_btn">
                                        <Link href="#0" className="explore_btn">Explore JNU</Link>
                                        <Link href={APPLY_NOW ?? '/apply-now'} className="apply_now">Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                            <picture>
                                <source media="(max-width: 767px)" srcSet={item.mobilebanner} />
                                <Image width={3271} height={1832} loading='eager' fetchPriority='high' src={item.banner} alt="slider image" className="img-fluid w-100" />
                            </picture>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="hero_pagination swiper-pagination"></div>
            </Swiper>
        </section>
    )
}