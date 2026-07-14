"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function FeaturedNews({ data }: { data: any }) {
    return (
        <section className="news_event_sec">
            {data?.length > 1 && (
                <div className="news_nav">
                    <div className="gallery_prev news-prev">
                        <img src="/images/icons/left_arrow.svg" />
                    </div>
                    <div className="gallery_next news-next">
                        <img src="/images/icons/right_arrow.svg" />
                    </div>
                </div>
            )}

            <Swiper
                className="news_event_swiper"
                loop={true}
                modules={[Navigation, Autoplay]}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.news-next',
                    prevEl: '.news-prev',
                }}
            >
                {data.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="news_card">
                            <div className="news_content">
                                {item?.date && (
                                    <span className="date">{new Date(item.date).toLocaleDateString('en-GB', {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}</span>
                                )}
                                {item?.name && (
                                    <h2 dangerouslySetInnerHTML={{ __html: item.name }} />
                                )}

                            </div>
                            <div className="news_image">
                                <img src={item.image} alt={item.name} />
                            </div>
                        </div>
                    </SwiperSlide >
                ))}

            </Swiper>
        </section>
    )
}