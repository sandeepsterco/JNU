"use client"
import type { PlacementDataInterface } from "./SchoolPlacements";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import 'swiper/css'

interface PlacementSliderPropsInterface {
    data: PlacementDataInterface[]
}

export default function PlacementSlider({ data }: PlacementSliderPropsInterface) {
    return (
        <Swiper
            className="placement_slider"
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            speed={2000}
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
                nextEl: '.arival-next',
                prevEl: '.arival-prev'
            }}
            grabCursor={true}
            keyboard={{
                enabled: true,
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 26
                }
            }}
        >
            {data?.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <div className="placement_Bx image">
                        <figure>
                            <Image src={item?.image ?? '/images/placeholders/placement-placeholder.webp'} alt={item.name} className="img-fluid" width={533} height={610} loading="lazy" />
                        </figure>

                        <div className="placement_cnt">
                            <div className="placement_des">
                                {item?.name && (
                                    <h4>{item.name}</h4>
                                )}
                                {item?.company && (
                                    <p>{item.company}</p>
                                )}
                            </div>
                            {item?.package && (
                                <figcaption dangerouslySetInnerHTML={{ __html: item.package }} />
                            )}

                        </div>
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    )
}