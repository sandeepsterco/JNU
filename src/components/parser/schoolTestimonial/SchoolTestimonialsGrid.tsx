"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export interface SchoolTestimonial {
  name: string;
  image: string | null;
  video: string | null;
  video_url: string | null;
  year: string | number | null;
  course: string | null;
  description: string | null;
  profile_image: string | null;
  type: string | null;
  slug: string;
  display_order: number | null;
}

export default function SchoolTestimonialsGrid({
  schoolSlug,
  testimonials,
}: {
  schoolSlug: string;
  testimonials: SchoolTestimonial[];
}) {
  const groups = useMemo(() => {
    const grouped = new Map<string, SchoolTestimonial[]>();

    testimonials.forEach((testimonial) => {
      const type = testimonial.type || "Others";
      const items = grouped.get(type) ?? [];
      items.push(testimonial);
      grouped.set(type, items);
    });

    return Array.from(grouped, ([type, items]) => ({
      type,
      items: items.sort(
        (a, b) =>
          (a.display_order ?? Number.MAX_SAFE_INTEGER) -
          (b.display_order ?? Number.MAX_SAFE_INTEGER),
      ),
    }));
  }, [testimonials]);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='testimonial-videos']", {});
    return () => {
      Fancybox.unbind("[data-fancybox='testimonial-videos']");
      Fancybox.close();
    };
  }, []);

  if (groups.length === 0) {
    return (
      <section className="school_testimonials_grid">
        <div className="container">
          <p className="school_testimonials_empty">
            No testimonials are available at this time.
          </p>
        </div>
      </section>
    );
  }

  const activeGroup = groups[Math.min(activeTab, groups.length - 1)];

  return (
    <section className="school_testimonials_grid">
      <div className="container">
        <div className="school_testimonials_tabs" role="tablist" aria-label="Testimonial categories">
          {groups.map((group, index) => (
            <button
              key={group.type}
              id={`testimonial-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeTab}
              aria-controls="school-testimonial-panel"
              className={index === activeTab ? "active" : ""}
              onClick={() => setActiveTab(index)}
            >
              {group.type}
            </button>
          ))}
        </div>

        <div
          id="school-testimonial-panel"
          className="school_testimonials_cards"
          role="tabpanel"
          aria-labelledby={`testimonial-tab-${Math.min(activeTab, groups.length - 1)}`}
        >
          {activeGroup.items.map((testimonial, index) => (
            <article className="school_testimonial_card" key={testimonial.slug}>
              {testimonial.video || testimonial.video_url ? (
                <VideoTestimonialCard
                  testimonial={testimonial}
                  category={activeGroup.type}
                  imageLoading={index === 0 ? "eager" : "lazy"}
                />
              ) : (
                <QuoteTestimonialCard
                  testimonial={testimonial}
                  category={activeGroup.type}
                />
              )}
              <div className="school_testimonial_detail_link">
                <Link
                  href={`/school/${encodeURIComponent(schoolSlug)}/testimonials/${encodeURIComponent(testimonial.slug)}`}
                  aria-label={`Read ${testimonial.name}'s testimonial`}
                >
                  Read story <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoTestimonialCard({
  testimonial,
  category,
  imageLoading,
}: {
  testimonial: SchoolTestimonial;
  category: string;
  imageLoading: "eager" | "lazy";
}) {
  const videoSrc = testimonial.video_url || testimonial.video || "";
  const isUploadedFile =
    !testimonial.video_url && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(videoSrc);
  const image = testimonial.image || testimonial.profile_image;

  return (
    <div className="success_speak_videobx school_testimonial_video_card">
      {image ? (
        <figure>
          <Image
            src={image}
            alt={testimonial.name}
            className="img-fluid"
            loading={imageLoading}
            width={533}
            height={610}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </figure>
      ) : (
        <div className="school_testimonial_video_placeholder" aria-hidden="true" />
      )}
      <div className="success_speak_bx_flex">
        <span>
          <a
            href={videoSrc}
            data-fancybox="testimonial-videos"
            data-type={isUploadedFile ? "html5video" : undefined}
            data-caption={testimonial.name}
            className="play-pause-btn"
            aria-label={`Play ${testimonial.name}'s testimonial`}
          >
            <span aria-hidden="true">▶</span>
          </a>
        </span>
        <figcaption>
          <h5>{testimonial.name}</h5>
          <h6>{testimonial.course}</h6>
          {testimonial.year && <p>{testimonial.year}</p>}
          {testimonial.description && (
            <p className="school_testimonial_video_description">
              {testimonial.description}
            </p>
          )}
          {!testimonial.course && !testimonial.year && (
            <p>{testimonial.type || category}</p>
          )}
        </figcaption>
      </div>
    </div>
  );
}

function QuoteTestimonialCard({
  testimonial,
  category,
}: {
  testimonial: SchoolTestimonial;
  category: string;
}) {
  return (
    <div className="success_speak_bx school_testimonial_quote_card">
      {testimonial.description && (
        <p className="school_testimonial_message">{testimonial.description}</p>
      )}
      <div className="success_speak_bx_flex">
        {testimonial.image && (
          <span>
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              className="img-fluid"
              loading="lazy"
              width={54}
              height={54}
            />
          </span>
        )}
        <figcaption>
          <h5>{testimonial.name}</h5>
          <h6>{testimonial.course}</h6>
          {testimonial.year && <p>{testimonial.year}</p>}
          {!testimonial.course && !testimonial.year && (
            <p>{testimonial.type || category}</p>
          )}
        </figcaption>
      </div>
    </div>
  );
}
