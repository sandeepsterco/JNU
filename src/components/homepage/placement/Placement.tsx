"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import './placement.css'
import { Autoplay, Navigation } from 'swiper/modules'

export default function HomePlacement() {
    return (
        <section className="placement_section">
            <div className="max-container-lg">
                <div className="placement_wrapper">
                    <div className="container">
                        <div className="placement_header">
                            <div className="head_title">
                                <h3 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">PLACEMENTS</h3>
                                <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Trusted by Leading <br />Global Employers</blockquote>
                            </div>
                            <div className="placement_header_right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                                    massa.</p>
                                <a href="#"><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></a>
                            </div>
                        </div>
                        <div className="placement_grid">
                            <div className="placement_left">
                                <Swiper
                                    className="placement_slider"
                                    modules={[Autoplay, Navigation]}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false
                                    }}
                                    speed={2000}
                                    slidesPerView={1}
                                    spaceBetween={0}
                                    effect='slide'
                                    navigation={{
                                        nextEl: ".arival-next",
                                        prevEl: ".arival-prev",
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
                                    <SwiperSlide className="swiper-slide">
                                        <div className="placement_Bx image">
                                            <figure>
                                                <img src="/images/placeholders/placement-placeholder.webp" alt="placement" className="img-fluid" />
                                            </figure>
                                            <div className="placement_cnt">
                                                <div className="placement_des">
                                                    <h4>Nikita Sharma</h4>
                                                    <p>placed at Cognizant</p>
                                                </div>
                                                <figcaption>
                                                    <span>18</span> LPA
                                                </figcaption>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="placement_Bx image">
                                            <figure>
                                                <img src="/images/placeholders/placement-placeholder.webp" alt="placement" className="img-fluid" />
                                            </figure>
                                            <div className="placement_cnt">
                                                <div className="placement_des">
                                                    <h4>Abhinav Singh Chauhan</h4>
                                                    <p>placed at Cognizant</p>
                                                </div>
                                                <figcaption>
                                                    <span>24</span> LPA
                                                </figcaption>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="placement_Bx image">
                                            <figure>
                                                <img src="/images/placeholders/placement-placeholder.webp" alt="placement" className="img-fluid" />
                                            </figure>
                                            <div className="placement_cnt">
                                                <div className="placement_des">
                                                    <h4>Abhinav Singh Chauhan</h4>
                                                    <p>placed at Cognizant</p>
                                                </div>
                                                <figcaption>
                                                    <span>24</span> LPA
                                                </figcaption>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="placement_right">
                                <ul>
                                    <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                        <h4>6.5K<sup>+</sup></h4>
                                        <p>Job Offers Secured Across Multiple Domains and Sectors</p>
                                    </li>
                                    <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                        <h4>27<span>LPA</span></h4>
                                        <p>Highest Placement Package Offered by Top Recruiters</p>
                                    </li>
                                    <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                        <h4>5.5<span>LPA</span></h4>
                                        <p>Average Placement Package Offered to Our Graduates</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="placement_logos" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            <Swiper
                                className="placement_logo_swiper"
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
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                        spaceBetween: 0
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 0
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 0
                                    },
                                    1200: {
                                        slidesPerView: 6,
                                        spaceBetween: 0
                                    }
                                }}
                            >
                                <SwiperSlide className="swiper-slide">
                                    <figure>
                                        <img src="/images/homepage/placement/deloitte.webp" alt="deloitte" className="img-fluid" />
                                    </figure>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <figure>
                                        <img src="/images/homepage/placement/decathlon.webp" alt="decathlon" className="img-fluid" />
                                    </figure>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}