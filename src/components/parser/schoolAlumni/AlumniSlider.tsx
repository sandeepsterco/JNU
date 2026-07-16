"use client"
import type { AlumniDataInterface } from "./SchoolAlumni";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import 'swiper/css'

interface PlacementSliderPropsInterface {
    data: AlumniDataInterface[]
}

export default function AlumniSlider({ data }: PlacementSliderPropsInterface) {

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
        <div className="full-width">
            <div className="max-content-lg pe-lg-0 me-lg-0">
                <div className="alumni_slider_section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <Swiper
                        className="alumni_swiper"
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={1000}
                        slidesPerView={1}
                        spaceBetween={0}
                        effect="slide"
                        navigation={{
                            nextEl: ".alumni-next",
                            prevEl: ".alumni-prev",
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
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    className="img-fluid"
                                                    width={575}
                                                    height={395}
                                                    loading="lazy"
                                                />
                                            </figure>

                                            <figure className="alumni_logo">
                                                <img
                                                    src={item.logo}
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
                                                    src={item.thumbnail}
                                                    alt={item.name}
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
                                                    src={item.logo}
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
    )
}