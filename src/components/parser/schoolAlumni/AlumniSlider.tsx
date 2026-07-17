"use client"
import { useRef } from "react";
import type { AlumniDataInterface } from "./SchoolAlumni";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from "swiper/modules";
import '@/components/homepage/alumni/alumni.css';

interface PlacementSliderPropsInterface {
    data: AlumniDataInterface[]
}

export default function AlumniSlider({ data }: PlacementSliderPropsInterface) {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const hasMultiple = data.length > 3;

    const togglePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const figure = button.closest('.alumni_img');
        if (!figure) return;

        const video = figure.querySelector<HTMLVideoElement>('.alumni_video');
        const poster = figure.querySelector<HTMLImageElement>('.alumni_poster');

        if (!video) return;

        if (video.paused) {
            if (poster) poster.style.display = 'none';
            video.style.display = 'block';
            video.play();
            button.textContent = '❚❚';
        } else {
            video.pause();
            button.textContent = '▶';
        }
    }

    return (
        <section className="our_alumni_section">
            <div className="container">
                <div className="alumni_header">
                    <div className="head_title">
                        <h3 className="font18" data-aos="fade-up">OUR ALUMNI</h3>
                        <blockquote data-aos="fade-up">Shaping Career Creating Impact
                        </blockquote>
                    </div>

                    {hasMultiple && (
                        <div className="alumni_header_right" data-aos="fade-up">
                            <div ref={prevRef} className="alumni-prev swiper-button-prev custom_slider_btn">
                                <img src="/images/icons/nav-arrow-prev.svg" className="img-fluid" alt="Previous slide" />
                            </div>
                            <div ref={nextRef} className="alumni-next swiper-button-next custom_slider_btn">
                                <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="Next slide" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="full-width">
                <div className="max-content-lg pe-lg-0 me-lg-0">
                    <div className="alumni_slider_section" data-aos="fade-up">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            className="alumni_swiper"
                            loop={hasMultiple}
                            autoplay={hasMultiple ? {
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            } : false}
                            speed={1000}
                            slidesPerView={1}
                            spaceBetween={0}
                            effect="slide"
                            navigation={hasMultiple ? {
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            } : false}
                            onBeforeInit={(swiper: any) => {
                                if (typeof swiper.params.navigation !== "boolean") {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }}
                            onSwiper={(swiper) => {
                                setTimeout(() => {
                                    if (typeof swiper.params.navigation !== "boolean") {
                                        swiper.navigation.destroy();
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                });
                            }}
                            grabCursor={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 3
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 3
                                },
                                1200: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 3
                                }
                            }}
                        >
                            {data.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="alumni_slider_bx">
                                        {!item.video ? (
                                            <>
                                                <figure className="alumni_img">
                                                    <Image
                                                        src={item.thumbnail ?? ''}
                                                        alt={item.name ?? ''}
                                                        className="img-fluid"
                                                        width={575}
                                                        height={395}
                                                        loading="lazy"
                                                    />
                                                </figure>

                                                <figure className="alumni_logo">
                                                    <img
                                                        src={item.logo ?? ''}
                                                        alt={item.name}
                                                        className="img-fluid"
                                                    />
                                                </figure>

                                                <div className="alumni_bx_bottom">
                                                    <figure className="qoute_icon">
                                                        <img
                                                            src="/images/icons/qoute.svg"
                                                            className="img-fluid"
                                                            alt="quote"
                                                        />
                                                    </figure>

                                                    <h4>{item.message}</h4>

                                                    <h5>{item.name}</h5>

                                                    <p>
                                                        {item.course} <span>{item.batch}</span>
                                                    </p>
                                                </div>

                                                <Link href={`${BASE_URL}alumni/${item.slug}`} className="overlap_btn" />
                                            </>
                                        ) : (
                                            <div className="alumni_img">
                                                <figure className="alumni_img">
                                                    <video
                                                        className="alumni_video"
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                    >
                                                        <source
                                                            src={item.video}
                                                            type="video/mp4"
                                                        />
                                                    </video>

                                                    <Image
                                                        src={item.thumbnail ?? ''}
                                                        alt={item.name ?? ''}
                                                        className="alumni_poster img-fluid"
                                                        width={575}
                                                        height={675}
                                                        loading="lazy"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="play-pause-btn"
                                                        onClick={(e) => togglePlayPause(e)}
                                                    >
                                                        ▶
                                                    </button>
                                                </figure>

                                                <figure className="alumni_logo">
                                                    <img
                                                        src={item.logo ?? ''}
                                                        alt={item.name}
                                                        className="img-fluid"
                                                    />
                                                </figure>

                                                <div className="alumni_cnt">
                                                    <h5>{item.name}</h5>

                                                    <p>
                                                        {item.course} <span>{item.batch}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

        </section>
    )
}