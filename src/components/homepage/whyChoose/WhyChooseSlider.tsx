'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface ListInterface {
    heading: string;
    subheading: string;
}

export default function WhyChooseSlider({ lists }: { lists: ListInterface[] }) {
    if (!lists?.length) return null

    return (
        <>
            <Swiper
                className="homewhyswiper"
                wrapperTag="ul"
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ el: '.why_jnu_pagination', clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {lists.map((item, idx) => (
                    <SwiperSlide
                        tag="li"
                        key={idx}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        {item?.heading && <h4>{item.heading}</h4>}
                        {item?.subheading && <p>{item.subheading}</p>}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="why_jnu_pagination"></div>
        </>
    )
}