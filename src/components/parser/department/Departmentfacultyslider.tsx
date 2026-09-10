"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import type { FacultyInterface } from "./DepartmentFaculty";

interface DepartmentFacultySliderProps {
    faculty: FacultyInterface[];
}

function setFacultyEvenSlides(swiper: SwiperType) {
  swiper.slides.forEach((slideEl, idx) => {
    const realIndex =
      typeof swiper.slides[idx]?.getAttribute === "function"
        ? Number(swiper.slides[idx].getAttribute("data-swiper-slide-index") ?? idx)
        : idx;

    slideEl.classList.remove("is-even", "is-odd");
    slideEl.classList.add(realIndex % 2 === 0 ? "is-even" : "is-odd");
  });
}

export default function DepartmentFacultySlider({
  faculty,
}: DepartmentFacultySliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="depfac_slider_sec">
      <div className="swiper depart_faculty">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={2000}
          slidesPerView={1}
          spaceBetween={2}
          effect="slide"
          grabCursor={true}
          navigation={{
            nextEl: ".arival-next",
            prevEl: ".arival-prev",
          }}
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
              spaceBetween: 2,
            },
            1200: {
              slidesPerView: 3.4,
              spaceBetween: 2,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={(swiper) => {
            setFacultyEvenSlides(swiper);
          }}
          onLoopFix={(swiper) => {
            setFacultyEvenSlides(swiper);
          }}
        >
          {faculty.map((faculty, idx) => (
            <SwiperSlide key={faculty.slug} className={idx%2===0 ? 'faculty-even' : ''}>
              <div className="depat_faculty_bx image">
                <figure className="dep_fac_img">
                  <img
                    src={faculty.image || "/images/dept_faculty_01.webp"}
                    alt={faculty.name}
                    className="img-fluid"
                  />
                </figure>
                <div className="dep_facubx_btm">
                  <h5 className="font18">{faculty.name}</h5>
                  <p>{faculty.designation}</p>
                </div>
                <a href="#" className="overlap_btn"></a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Nav arrows the `navigation` config above is wired to */}
      <div className="arival-prev" aria-label="Previous slide" />
      <div className="arival-next" aria-label="Next slide" />
    </div>
  );
}