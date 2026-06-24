"use client";

import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    id: "tab1",
    title: "Global Educational Experience",
  },
  {
    id: "tab2",
    title: "Student Life",
  },
  {
    id: "tab3",
    title: "Facilities",
  },
  {
    id: "tab4",
    title: "Clubs & Societies",
  },
];

export default function VideoTabs() {
  const [activeTab, setActiveTab] = useState("tab1");
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
        {tabs.map((tab) => (
          <div key={tab.id}>
            {/* Mobile Drawer Heading */}
            <h3
              className={`tab_drawer_heading ${
                activeTab === tab.id ? "d_active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
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
                    <h3>A Hub for Global Exchange of Ideas</h3>

                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem
                    </p>

                    <ul>
                      <li>
                        <h5>
                          140<sup>+</sup>
                        </h5>
                        <p>International Students</p>
                      </li>

                      <li>
                        <h5>
                          20<sup>+</sup>
                        </h5>
                        <p>Prestigious Universities</p>
                      </li>

                      <li>
                        <h5>
                          50<sup>+</sup>
                        </h5>
                        <p>International Students</p>
                      </li>
                    </ul>

                    <a href="#">
                      <img
                        src="/images/icons/nav-arrow-next.svg"
                        className="img-fluid"
                        alt="arrow"
                      />
                    </a>
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
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}