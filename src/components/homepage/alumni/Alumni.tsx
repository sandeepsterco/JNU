
"use client"
import AlumniSlider from "./AlumniSlider";
import { useRef } from "react";
import './alumni.css'

const alumniData = [
    {
      type: "quote",
      image: "/images/placeholders/alumni-placeholder-2.webp",
      logo: "/images/homepage/alumni/deloitte-logo.webp",
      quote:
        "My journey at JNU shaped both my professional path and personal growth",
      name: "Priyanshi Bhadoria",
      program: "B.Tech CSE",
      batch: "Batch 2025",
    },
    {
      type: "video",
      video: "/videos/lab2.mp4",
      poster: "/images/placeholders/alumni-placeholder.webp",
      logo: "/images/homepage/alumni/alumni-bosch.webp",
      name: "Amit Kumar",
      program: "B.Tech CSE",
      batch: "Batch 2025",
    },
    {
      type: "quote",
      image: "/images/placeholders/alumni-placeholder-2.webp",
      logo: "/images/homepage/alumni/alumni-maersk.webp",
      quote:
        "The vibrant learning culture at JNU prepared me for every challenge ahead",
      name: "Shreya Shree",
      program: "B.Tech CSE",
      batch: "Batch 2025",
    },
    {
      type: "video",
      video: "/videos/lab2.mp4",
      poster: "/images/placeholders/alumni-placeholder.webp",
      logo: "/images/homepage/alumni/alumni-amazon.webp",
      name: "Priyanshi Bhadoria",
      program: "B.Tech CSE",
      batch: "Batch 2025",
    },{
        type: "quote",
        image: "/images/placeholders/alumni-placeholder-2.webp",
        logo: "/images/homepage/alumni/alumni-maersk.webp",
        quote:
          "The vibrant learning culture at JNU prepared me for every challenge ahead",
        name: "Shreya Shree",
        program: "B.Tech CSE",
        batch: "Batch 2025",
      },
  ];

export default function HomeAlumni() {
    const prevRef = useRef<HTMLDivElement>(null);
     const nextRef = useRef<HTMLDivElement>(null);

    return (
      <section className="our_alumni_section">
        <div className="container">
          <div className="alumni_header">
            <div className="head_title">
              <h3
                className="font18"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                OUR ALUMNI
              </h3>
  
              <blockquote
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                Shaping Career Creating Impact
              </blockquote>
            </div>
  
            <div
              className="alumni_header_right"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
                <div ref={prevRef} className="alumni-prev swiper-button-prev custom_slider_btn">
                    <img src="/images/icons/nav-arrow-prev.svg" className="img-fluid" alt="arrow" />
                </div>
                <div ref={nextRef} className="alumni-next swiper-button-next custom_slider_btn">
                    <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                </div>
            </div>
          </div>
        </div>
  
        <div className="full-width">
          <div className="max-content-lg pe-lg-0 me-lg-0">
            <AlumniSlider alumniData={alumniData} prevRef={prevRef} nextRef={nextRef} />
          </div>
        </div>
      </section>
    );
  }