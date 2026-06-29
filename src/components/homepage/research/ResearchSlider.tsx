"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";

interface ResearchSlider{
    name:string;
    image:string;
    slug:string;
}

interface ResearchSliderInterface{
    data:ResearchSlider[]
}

export default function ResearchSlider({data}:ResearchSliderInterface) {
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
                {data?.map((item, idx)=>(
                    <SwiperSlide key={idx}>
                        <div className="research_slider_bx image">
                            <figure>
                                <Image
                                    width={636}
                                    height={610}
                                    loading="lazy"
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid"
                                />
                            </figure>
                            {item?.name && (
                                <div className="research_bx_bottom">
                                    <p dangerouslySetInnerHTML={{__html:item.name}} />
                                </div>
                            )}
                            
                            <Link href={`${BASE_URL}research/${item.slug}`} className="overlap_btn"></Link>
                        </div>
                    </SwiperSlide>
                ))}
                
            </Swiper>

        </div>
    );
}