import Image from "next/image";
import { notFound } from "next/navigation";
import apiFetch from "@/lib/api";
import '@/app/(common)/(inner)/leadership-management/[slug]/leadership.css'

interface TestimonialDetail {
  name: string;
  image: string | null;
  video: string | null;
  video_url: string | null;
  year: string | number | null;
  course: string | null;
  description: string | null;
  profile_image: string | null;
  type: string | null;
  detail_image: string | null;
}

interface TestimonialDetailResponse {
  status: boolean;
  testimonial_details: {
    detail: TestimonialDetail;
  };
}

export default async function SchoolTestimonialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, error } = await apiFetch(
    `testimonials/${encodeURIComponent(slug)}`,
  );

  if (error) {
    throw new Error("Failed to load testimonial details");
  }

  if (!data?.status || !data?.testimonial_details?.detail) {
    notFound();
  }

  const testimonial = (data as TestimonialDetailResponse).testimonial_details
    .detail;
  const meta = [testimonial.course, testimonial.year]
    .filter(Boolean)
    .join(" • ");

  return (
    <>
      <section className="leadership_detail_section">
        <div className="container-fluid">
          <div className="detail_main">
            <div className="detail_left">
              
            </div>
            <div className="detail_right">
              <div className="image_sec">
                <figure>
                  <img
                    src={testimonial?.detail_image || ''}
                    className="img-fluid"
                    alt={testimonial.name}
                  />
                </figure>
              </div>
              <div className="content_sec">
                {/* <h3 className="title24_36">test</h3> */}
                <p className="content_16_26">{testimonial.description}</p>
                <div className="author_details">
                  <h4>{testimonial.name}</h4>
                  <p className="designation">{testimonial.course}</p>
                </div>
                
                <div className="bottom_line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="leadership_detail_section school_testimonial_detail_page">
        <div className="container">
          <div className="detail_main">
            <article className="school_testimonial_detail_content">
              <div className="school_testimonial_detail_copy">
                {testimonial.type && (
                  <p className="school_testimonial_detail_type">
                    {testimonial.type}
                  </p>
                )}
                <h1>{testimonial.name}</h1>
                {meta && (
                  <p className="school_testimonial_detail_meta">{meta}</p>
                )}

                {testimonial.detail_image && (
                  <figure className="school_testimonial_detail_image">
                    <Image
                      src={testimonial.detail_image}
                      alt={testimonial.name}
                      width={760}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </figure>
                )}

                <div className="description">
                  {testimonial.description && <p>{testimonial.description}</p>}
                </div>

                {testimonial.video && (
                  <video
                    className="school_testimonial_detail_video"
                    controls
                    preload="none"
                    poster={testimonial.image || undefined}
                  >
                    <source src={testimonial.video} />
                    Your browser does not support video playback.
                  </video>
                )}
                {testimonial.video_url && (
                  <a
                    className="school_testimonial_watch_link"
                    href={testimonial.video_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch testimonial
                  </a>
                )}
              </div>
            </article>
          </div>
        </div>
      </section> */}
    </>
  );
}
