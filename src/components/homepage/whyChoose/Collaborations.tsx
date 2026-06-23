"use client"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function Collaborations() {
    return (
        <div className="int_collabration_section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            <div className="container">
                <div className="int_collabration_grid">
                    <h3 className="font24">International Collaboration</h3>
                    <div className="int_logo_slider">
                        <Swiper
                            className="int_swiper"
                            modules={[Autoplay, Navigation]}
                            loop={true}
                            autoplay={{
                                delay:3000,
                                disableOnInteraction:false
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
                                
                            }}
                        >
                            <SwiperSlide>
                                <figure>
                                    <img src="/images/logos/miammi-university.webp" alt="miammi-university" className="img-fluid" />
                                </figure>
                            </SwiperSlide>

                            <SwiperSlide>
                                <figure>
                                    <img src="/images/logos/anans.webp" alt="anans" className="img-fluid" />
                                </figure>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}