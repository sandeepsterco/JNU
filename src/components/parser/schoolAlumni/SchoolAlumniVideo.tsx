"use client";

import { BASE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface SchoolAlumniVideoProps {
  name: string;
  course: string;
  batch: string;
  thumbnail: string;
  logo: string;
  video: string;
  designation?:string;
  slug:string;
}

export default function SchoolAlumniVideo({
  name,
  course,
  batch,
  thumbnail,
  logo,
  video: videoUrl,
  designation,
  slug
}: SchoolAlumniVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      try {
        await videoElement.play();
        setHasStarted(true);
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play alumni video", error);
      }
      return;
    }

    videoElement.pause();
    setIsPlaying(false);
  };

  return (
    <div className="alumni_slider_bx">
      <div className="alumni_img">
        <figure className="alumni_img">
          <video
            ref={videoRef}
            className="alumni_video"
            muted
            playsInline
            preload="metadata"
            style={{ display: hasStarted ? "block" : "none" }}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          <Image
            src={thumbnail}
            alt={name}
            className="alumni_poster img-fluid"
            width={575}
            height={675}
            loading="lazy"
            style={{ display: hasStarted ? "none" : "block" }}
          />

          <button
            type="button"
            className="play-pause-btn"
            aria-label={isPlaying ? "Pause alumni video" : "Play alumni video"}
            onClick={togglePlayback}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </figure>

        {logo && (
          <figure className="alumni_logo">
            <Image
              loading="lazy"
              alt={name}
              width={150}
              height={166}
              className="img-fluid"
              src={logo}
            />
          </figure>
        )}

        <div className="alumni_cnt">
          {name && (
                                    <h5 dangerouslySetInnerHTML={{__html:name}} />
                                )}
          {course && (
            <p className="mb-0" >{course}<span>{batch}</span></p>
        )}

        {!course && designation && (
            <p className="mb-0" >{designation}<span>{batch}</span></p>
        )}
        </div>
        {slug && (
          <Link className="overlap_btn" href={`${BASE_URL}alumni/${slug}`}></Link>
        )}
      </div>
      
    </div>
  );
}
