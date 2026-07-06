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
          <div key={tab.id}>
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
                        src="/videos/campus-video.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div className="video_content">
                    {data?.overlayheading && (
                      <h3 dangerouslySetInnerHTML={{__html:data.overlayheading}} />
                    )}

                    <div dangerouslySetInnerHTML={{__html:data.overlaydescription}} />

                    {data?.overlaycounter && (
                      <ul>
                        {data.overlaycounter.map((item, idx)=>(
                          <li key={idx}>
                            <h5 dangerouslySetInnerHTML={{__html:item?.count}} />
                            <p dangerouslySetInnerHTML={{__html:item.title}} />
                          </li>
                        ))} 
                      </ul>
                    )}

                    {data?.overlayslug && (
                      <Link href={data.overlayslug}>
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