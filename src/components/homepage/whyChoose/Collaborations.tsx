"use client"
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

interface ImageInterface{
    image:string;
}

interface CollaborationPropsInterface{
    data:{
        title:string;
        images:ImageInterface[];
    }
}

export default function Collaborations({data}:CollaborationPropsInterface) {
    return (
        <div className="int_collabration_section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            <div className="container">
                <div className="int_collabration_grid">
                    {data?.title && (
                        <h3 className="font24">{data.title}</h3>
                    )}
                    <div className="int_logo_slider">
                        <Swiper
                            className="int_swiper"
                            modules={[Autoplay, Navigation]}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
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
                            keyboard={{
                                enabled: true,
                            }}
                            scrollbar={{
                                el: ".home-scrollbar",
                                draggable: true,
                                snapOnRelease: true
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 30
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 40
                                }
                            }}
                        >
                            {data.images.map((item, idx)=>(
                                <SwiperSlide key={idx}>
                                    <figure>
                                        <Image width={152} height={76} loading="lazy" src={item.image} alt="miammi-university" className="img-fluid" />
                                    </figure>
                                </SwiperSlide>
                            ))}
                            
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}