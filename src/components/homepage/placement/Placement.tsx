"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import './placement.css'
import { Autoplay, Navigation } from 'swiper/modules'
import { BASE_URL } from '@/config/config';
import Link from 'next/link';
import Image from 'next/image';

interface PackageInterface{
    package:string;
    description:string;
}

interface ModularPlacementInterface{
    name:string;
    company:string;
    package:string;
    image:string;
    slug:string;
}

interface LogoInterface{
    image:string;
    alt:string;
}

interface PlacementPropsInterface{
    data:{
        title:string;
        subtitle:string;
        description:string;
        packages:PackageInterface[];
        slug?:string;
        logos:LogoInterface[];
    },
    modular:ModularPlacementInterface[]
}

export default function HomePlacement({data, modular}:PlacementPropsInterface) {

    return (
        <section className="placement_section">
            <div className="max-container-lg">
                <div className="placement_wrapper">
                    <div className="container">
                        <div className="placement_header">
                            <div className="head_title">
                                {data?.title && (
                                    <h3 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">{data.title}</h3>
                                )}
                                {data?.subtitle && (
                                    <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" dangerouslySetInnerHTML={{__html:data.subtitle}} />
                                )}
                            </div>
                            <div className="placement_header_right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                {data?.description && (
                                    <p dangerouslySetInnerHTML={{__html:data.description}} />
                                )}

                                {data?.slug && (
                                    <Link href={`${BASE_URL}${data?.slug}`}><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></Link>
                                )}
                                
                            </div>
                        </div>
                        <div className="placement_grid">
                            <div className="placement_left">
                                {modular && modular?.length > 0 && (
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
                                        {modular.map((item, idx)=>(
                                            <SwiperSlide key={idx} className="swiper-slide">
                                                <div className="placement_Bx image">
                                                    <figure>
                                                        <Image width={533} height={610} loading='lazy' src={item.image} alt="placement" className="img-fluid" />
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
                                                            <figcaption dangerouslySetInnerHTML={{__html:item.package}} />
                                                        )}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        
                                    </Swiper>
                                )}
                                
                            </div>
                            <div className="placement_right">
                                {data?.packages && data?.packages?.length > 0 && (
                                    <ul>
                                        {data.packages.map((item, idx)=>(
                                            <li key={idx} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                                <h4 dangerouslySetInnerHTML={{__html:item.package}} />
                                                <p dangerouslySetInnerHTML={{__html:item.description}} />
                                            </li>
                                        ))}
                                        
                                    </ul>
                                )}
                                
                            </div>
                        </div>

                        {data?.logos && data.logos?.length > 0 && (
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
                                    {data.logos.map((item, idx)=>(
                                        <SwiperSlide key={idx} className="swiper-slide">
                                            <figure>
                                                <Image width={246} height={125} loading='lazy' src={item?.image} alt={item?.alt} className="img-fluid" />
                                            </figure>
                                        </SwiperSlide>
                                    ))}
                                    
                                </Swiper>
                            </div>
                        )}

                        
                    </div>
                </div>
            </div>
        </section>
    )
}