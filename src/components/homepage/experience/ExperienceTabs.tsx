"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CounterInterface{
  count:string;
  title:string;
}

interface TabsInterface{
  tab:string;
  video?:string | null;
  id?:string;
  heading?:string;
  description?:string;
  buttonlink?:string;
  count1?:string;
  count2?:string;
  count3?:string;
  counttitle1?:string;
  counttitle2?:string;
  counttitle3?:string;
}

interface VideoTabsInterface{
  data:{
    overlayheading:string;
    overlaydescription:string;
    overlaycounter:CounterInterface[];
    overlayslug?:string;
    videotabs:TabsInterface[];
  }
}

export default function VideoTabs({data}:VideoTabsInterface) {
  const [activeTab, setActiveTab] = useState(data?.videotabs[0]?.id);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="video_tab custom-tabs"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <div className="tab_container">
        {data.videotabs.map((tab) => (
          <div className="tabs_item" key={tab.id}>
            {/* Mobile Drawer Heading */}
            <h3
              className={`tab_drawer_heading ${
                activeTab === tab.id ? "d_active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.tab}
            </h3>

            {/* Tab Content */}
            {activeTab === tab.id && (
              <div className={`home_tab_content ${tab.id}`}>
                <div className="video_section">


                  <div id="youtube-player">
                    <video
                      ref={activeTab === tab.id ? videoRef : null}
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source
                        src={tab.video || ""}
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div className="video_content">
                    {tab?.heading && (
                      <h3 dangerouslySetInnerHTML={{__html:tab.heading}} />
                    )}

                    {tab?.description && (
                      <div dangerouslySetInnerHTML={{__html:tab.description}} />
                    )}

                    {(tab?.count1 || tab?.count2 || tab?.count3) && (
                      <ul>
                          {tab?.count1 && (
                            <li>
                              <h5 dangerouslySetInnerHTML={{__html:tab?.count1}} />
                              <p dangerouslySetInnerHTML={{__html:tab?.counttitle1 || ''}} />
                            </li>
                          )}

                          {tab?.count2 && (
                            <li>
                              <h5 dangerouslySetInnerHTML={{__html:tab?.count2}} />
                              <p dangerouslySetInnerHTML={{__html:tab?.counttitle2 || ''}} />
                            </li>
                          )}

                          {tab?.count3 && (
                            <li>
                              <h5 dangerouslySetInnerHTML={{__html:tab?.count3}} />
                              <p dangerouslySetInnerHTML={{__html:tab?.counttitle3 || ''}} />
                            </li>
                          )}

                          
                      </ul>
                    )}

                    {tab?.buttonlink && (
                      <Link href={tab.buttonlink}>
                        <img
                          src="/images/icons/nav-arrow-next.svg"
                          className="img-fluid"
                          alt="arrow"
                        />
                      </Link>
                    )}
                    
                  </div>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Tabs */}
      <div className="tab_buttons">
        <div className="max-container-lg">
          <ul className="tabs">
            {data.videotabs.map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.tab}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}