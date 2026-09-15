"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import type { FacilityInterface } from "./DepartmentFacilities";

interface Props {
  facilities: FacilityInterface[];
}

export default function DepartmentFacilitiesSlider({ facilities }: Props) {
  return (
    <div className="dep_facilitysec">
      <Swiper
        className="dep_facilitis"
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={2000}
        slidesPerView={1}
        spaceBetween={0}
        grabCursor
        navigation={{ nextEl: ".arival-next", prevEl: ".arival-prev" }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 0 },
          992: { slidesPerView: 3, spaceBetween: 0 },
          1200: { slidesPerView: 4.1, spaceBetween: 0 },
        }}
      >
        {facilities.map((facility) => (
          <SwiperSlide key={facility.slug}>
            <div className="dept_facilites_bx image">
              <figure>
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="img-fluid"
                />
              </figure>
              <div className="dept_fac_bx_bottom">
                <p>{facility.name}</p>
              </div>
              {/* <a href={`/facilities/${facility.slug}`} className="overlap_btn"></a> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}