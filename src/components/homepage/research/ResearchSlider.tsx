"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ResearchSlider() {
    return (
        <div className="research_slider_section">
            <Swiper
                modules={[Navigation, Autoplay]}
                className="research_swiper"
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={2000}
                slidesPerView={1}
                spaceBetween={0}
                effect="slide"
                navigation={{
                    nextEl: ".arival-next",
                    prevEl: ".arival-prev",
                }}
                grabCursor={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                }}
            >
                <SwiperSlide>
                    <div className="research_slider_bx image">
                        <figure>
                            <img
                                src="/images/placeholders/reaserch-placeholder.webp"
                                alt="reaserch"
                                className="img-fluid"
                            />
                        </figure>
                        <div className="research_bx_bottom">
                            <p>Nerves in skin can slow melanoma growth</p>
                        </div>
                        <a href="#" className="overlap_btn"></a>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="research_slider_bx image">
                        <figure>
                            <img
                                src="/images/placeholders/reaserch-placeholder.webp"
                                alt="reaserch"
                                className="img-fluid"
                            />
                        </figure>
                        <div className="research_bx_bottom">
                            <p>Shaping the energy transition, Diversity, and Discovery</p>
                        </div>
                        <a href="#" className="overlap_btn"></a>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="research_slider_bx image">
                        <figure>
                            <img
                                src="/images/placeholders/reaserch-placeholder.webp"
                                alt="reaserch"
                                className="img-fluid"
                            />
                        </figure>
                        <div className="research_bx_bottom">
                            <p>Research & development partnerships</p>
                        </div>
                        <a href="#" className="overlap_btn"></a>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="research_slider_bx image">
                        <figure>
                            <img
                                src="/images/placeholders/reaserch-placeholder.webp"
                                alt="reaserch"
                                className="img-fluid"
                            />
                        </figure>
                        <div className="research_bx_bottom">
                            <p>Nerves in skin can slow melanoma growth</p>
                        </div>
                        <a href="#" className="overlap_btn"></a>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
}