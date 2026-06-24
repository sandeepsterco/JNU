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

const slideTiming = 5000;

export default function HomeBanner({data}) {
    const swiperRef = useRef<SwiperType | null>(null);

    const startProgressAnimation = useCallback(()=>{
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

    useEffect(()=>{
        const swiper = swiperRef.current;
        if (!swiper) return;

        swiper.on('realIndexChange',startProgressAnimation);
        return()=>{
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
                    delay:slideTiming,
                    disableOnInteraction:false
                }}
                pagination={{
                    el: ".hero_pagination",
                    clickable: true,
                    renderBullet:(index:number, className:string)=>{
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
                onSwiper={(swiper)=>{
                    swiperRef.current = swiper;
                    setTimeout(startProgressAnimation, 0);
                }}
                className="hero_swiper"
            >

                <SwiperSlide>
                    <div className="slider_inner">
                        <div className="slidetitle_container">
                            <div className="slider_title">
                                <blockquote>Best Private University</blockquote>
                                <h4>in Rajasthan</h4>
                                <p>One Planet Research 2013</p>
                                <div className="logo_banner">
                                    <img src="/images/logos/oneplanet_logo.webp" className="img-fluid w-100" alt="oneplanet" />
                                    <div className="emp_by">
                                        empowered by
                                        <span>imec, Wageningen University & Research, Radboud University and Radboudumc</span>
                                    </div>
                                </div>
                                <div className="banner_btn">
                                    <a href="#0" className="explore_btn">Explore JNU</a>
                                    <a href="#0" className="apply_now">Apply Now</a>
                                </div>
                            </div>
                        </div>
                        <picture>
                            <source media="(max-width: 767px)" srcSet="images/mobslider01.webp" />
                            <Image width={3271} height={1832} loading='eager' fetchPriority='high' src="/images/homepage/banner/slider01.webp" alt="slider image" className="img-fluid w-100" />
                        </picture>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slider_inner">
                        <div className="slidetitle_container">
                            <div className="slider_title">
                                <blockquote>Best Private University</blockquote>
                                <h4>in Rajasthan</h4>
                                <p>One Planet Research 2013</p>
                                <div className="logo_banner">
                                    <img src="/images/logos/oneplanet_logo.webp" className="img-fluid w-100" alt="oneplanet" />
                                    <div className="emp_by">
                                        empowered by
                                        <span>imec, Wageningen University & Research, Radboud University and Radboudumc</span>
                                    </div>
                                </div>
                                <div className="banner_btn">
                                    <a href="#0" className="explore_btn">Explore JNU</a>
                                    <a href="#0" className="apply_now">Apply Now</a>
                                </div>
                            </div>
                        </div>
                        <picture>
                            <source media="(max-width: 767px)" srcSet="images/mobslider01.webp" />
                            <Image width={3271} height={1832} loading='eager' fetchPriority='high' src="/images/homepage/banner/slider01.webp" alt="slider image" className="img-fluid w-100" />
                        </picture>
                    </div>
                </SwiperSlide>

                <div className="hero_pagination swiper-pagination"></div>
            </Swiper>
        </section>
    )
}