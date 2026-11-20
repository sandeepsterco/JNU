
"use client"
import AlumniSlider from "./AlumniSlider";
import { useRef } from "react";
import './alumni.css'

interface AlumniInterface{
  slug:string;
  thumbnail:string;
  logo:string;
  video?:string;
  message:string;
  name:string;
  batch:string;
  course:string;
}

interface AlumniPropsInterface{
  data:{
    title:string;
    subtitle:string;
    alumnigroup:AlumniInterface[];
  };
  modular:AlumniInterface[]
}

export default function HomeAlumni({data, modular}:AlumniPropsInterface) {
    const prevRef = useRef<HTMLDivElement>(null);
     const nextRef = useRef<HTMLDivElement>(null);

    return (
      <section className="our_alumni_section">
        <div className="container">
          <div className="alumni_header">
            <div className="head_title">
              {data?.title && (
                <h3
                  className="font18"
                  dangerouslySetInnerHTML={{__html:data.title}}
                />
              )}
              
              {data?.subtitle && (
                <blockquote
                  dangerouslySetInnerHTML={{__html:data.subtitle}}
                />
              )}
              
            </div>
  
            <div
              className="alumni_header_right"
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

        {modular && modular.length > 0 && (
          <div className="full-width">
            <div className="max-content-lg pe-lg-0 me-lg-0">
              <AlumniSlider alumniData={modular} prevRef={prevRef} nextRef={nextRef} />
            </div>
          </div>
        )}
  
        
      </section>
    );
  }