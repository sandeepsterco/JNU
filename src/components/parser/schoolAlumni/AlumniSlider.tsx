import type { AlumniDataInterface } from "./SchoolAlumni";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import "@/components/homepage/alumni/alumni.css";

interface PlacementSliderPropsInterface {
  data: AlumniDataInterface[];
}

export default function AlumniSlider({ data }: PlacementSliderPropsInterface) {
  const hasMultiple = data.length > 3;

  return (

      <div className="max-content-lg pe-lg-0 me-lg-0">
        <div className="alumni_slider_section" data-aos="fade-up">
          {/* Vanilla Swiper container — hydrated by InitAlumniSwiper via CmsEnhancer */}
          <div
            className="swiper alumni_swiper"
            data-loop={hasMultiple ? "true" : "false"}
          >
            <div className="swiper-wrapper">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`swiper-slide ${
                    index % 2 === 0 ? "alumni-even" : "alumni-odd"
                  } ${item.video ? "has-video" : ""}`}
                >
                  <div className="alumni_slider_bx">
                    {!item.video ? (
                      <>
                        <figure className="alumni_img">
                          <Image
                            src={item.thumbnail ?? ""}
                            alt={item.name ?? ""}
                            className="img-fluid"
                            width={575}
                            height={395}
                            loading="lazy"
                          />
                        </figure>
                        {item.logo && (
                          <figure className="alumni_logo">
                            <img
                              src={item.logo ?? ""}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </figure>
                        )}

                        <div className="alumni_bx_bottom">
                          <figure className="qoute_icon">
                            <img
                              src="/images/icons/qoute.svg"
                              className="img-fluid"
                              alt="quote"
                            />
                          </figure>

                          <h4 className="alumni_msg_desc">{item.message}</h4>

                          <h5>{item.name}</h5>

                          <p>
                            {item.course} <span>{item.batch}</span>
                          </p>
                        </div>

                        <Link
                          href={`${BASE_URL}alumni/${item.slug}`}
                          className="overlap_btn"
                        />
                      </>
                    ) : (
                      <div className="alumni_img">
                        <figure className="alumni_img">
                          <video
                            className="alumni_video"
                            muted
                            playsInline
                            preload="metadata"
                          >
                            <source src={item.video} type="video/mp4" />
                          </video>

                          <Image
                            src={item.thumbnail ?? ""}
                            alt={item.name ?? ""}
                            className="alumni_poster img-fluid"
                            width={575}
                            height={675}
                            loading="lazy"
                          />

                          {/* no onClick — handled by delegated listener in InitAlumniSwiper */}
                          <button type="button" className="play-pause-btn">
                            ▶
                          </button>
                        </figure>
                        {item.logo && (
                          <figure className="alumni_logo">
                            <img
                              src={item.logo ?? ""}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </figure>
                        )}

                        <div className="alumni_cnt">
                          <h5>{item.name}</h5>
                          <p>
                            {item.course} <span>{item.batch}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}