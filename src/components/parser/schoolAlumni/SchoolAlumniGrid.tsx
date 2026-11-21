"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BASE_URL } from "@/config/config";
import SchoolAlumniVideo from "./SchoolAlumniVideo";

export interface SchoolAlumni {
  name: string;
  course: string;
  batch: string;
  thumbnail: string;
  logo: string;
  video?: string | null;
  designation: string;
  slug: string;
  message: string;
}

export default function SchoolAlumniGrid({
  alumni,
  school,
}: {
  alumni: SchoolAlumni[];
  school: string;
}) {
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");
  const filteredAlumni = alumni.filter((item) =>
    activeTab === "video" ? Boolean(item.video?.trim()) : !item.video?.trim(),
  );

  return (
    <section className="alumni_mainsec hero_bg_pattern">
      <div className="container">
        <div className="alumni_network_tabs" role="tablist" aria-label="Alumni media type">
          <button
            id="alumni-image-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "image"}
            aria-controls="alumni-media-panel"
            className={activeTab === "image" ? "active" : ""}
            onClick={() => setActiveTab("image")}
          >
            Image
          </button>
          <button
            id="alumni-video-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "video"}
            aria-controls="alumni-media-panel"
            className={activeTab === "video" ? "active" : ""}
            onClick={() => setActiveTab("video")}
          >
            Video
          </button>
        </div>

        <div
          id="alumni-media-panel"
          className="gridbox_three"
          role="tabpanel"
          aria-labelledby={activeTab === "image" ? "alumni-image-tab" : "alumni-video-tab"}
        >
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumniItem) =>
              alumniItem.video?.trim() ? (
                <SchoolAlumniVideo
                  key={alumniItem.slug}
                  name={alumniItem.name}
                  course={alumniItem.course}
                  batch={alumniItem.batch}
                  thumbnail={alumniItem.thumbnail}
                  logo={alumniItem.logo}
                  video={alumniItem.video.trim()}
                  designation={alumniItem.designation}
                  slug={alumniItem.slug}
                />
              ) : (
                <div key={alumniItem.slug} className="alumni_slider_bx">
                  <figure className="alumni_img">
                    <Image
                      alt={alumniItem.name}
                      loading="lazy"
                      className="img-fluid"
                      width={575}
                      height={675}
                      src={alumniItem.thumbnail}
                    />
                  </figure>
                  {alumniItem.logo && (
                    <figure className="alumni_logo">
                      <Image
                        loading="lazy"
                        alt={alumniItem.name}
                        width={150}
                        height={166}
                        className="img-fluid"
                        src={alumniItem.logo}
                      />
                    </figure>
                  )}

                  <div className="alumni_bx_bottom">
                    <figure className="qoute_icon">
                      <Image
                        className="img-fluid"
                        alt="quote"
                        src="/images/icons/qoute.svg"
                        width={121}
                        height={101}
                        loading="lazy"
                      />
                    </figure>
                    {alumniItem.message && (
                      <h4
                        className="alumni_msg_desc"
                        dangerouslySetInnerHTML={{ __html: alumniItem.message }}
                      />
                    )}
                    {alumniItem.name && (
                      <h5 dangerouslySetInnerHTML={{ __html: alumniItem.name }} />
                    )}
                    {alumniItem.course && (
                      <p className="mb-0">
                        {alumniItem.course}
                        <span>Batch {alumniItem.batch}</span>
                      </p>
                    )}
                    {!alumniItem.course && alumniItem.designation && (
                      <p className="mb-0">
                        {alumniItem.designation}
                        <span>Batch {alumniItem.batch}</span>
                      </p>
                    )}
                  </div>
                  {alumniItem.slug && (
                    <Link
                      className="overlap_btn"
                      href={`${BASE_URL}alumni/${alumniItem.slug}?school=${encodeURIComponent(school)}`}
                    />
                  )}
                </div>
              ),
            )
          ) : (
            <p className="alumni_network_empty">
              No {activeTab === "image" ? "image" : "video"} alumni are available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
