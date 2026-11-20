import Image from "next/image";
import { notFound } from "next/navigation";
import apiFetch from "@/lib/api";
import SchoolHeader from "@/components/header/SchoolHeader";
import '@/app/(common)/(inner)/leadership-management/[slug]/leadership.css'

interface IAlumni {
  name: string;
  course: string | null;
  batch:string;
  thumbnail: string;
  logo: string;
  video: string;
  designation:string;
  slug:string;
  message:string;
}

export default async function SchoolTestimonialDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ school?: string }>;
}) {
  const [{ slug }, { school }] = await Promise.all([params, searchParams]);
  const { data, error } = await apiFetch(
    `alumni/${slug}`,
  );

  if (error) {
    throw new Error("Failed to load Alumni details");
  }

  if (!data?.status) {
    notFound();
  }

  const alumniData = data.alumni[0] as IAlumni;

  return (
    <>
      {school && <SchoolHeader parentSlug="school" slug={school} customClass="school_inner_header school_header" />}
      <section className="testimonials_detail_section">
        <div className="container-fluid">
          <div className="testimonials_path">
            <div className="container">
              <div className="testimonials_main">
                <div className="testimonials_image_sec">
                  <figure>
                    <Image
                      src={alumniData?.thumbnail || ''}
                      className="img-fluid"
                      alt={alumniData.name}
                      width={575}
                      height={675}
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="testimonials_content_sec">
                  <p className="content_16_26" dangerouslySetInnerHTML={{__html:alumniData.message || ''}} />
                  <div className="author_details">
                    <h4 dangerouslySetInnerHTML={{__html:alumniData.name}} />

                    {alumniData?.course && (
                      <p className="course mb-0" dangerouslySetInnerHTML={{__html:alumniData.course}} />
                    )}

                    {!alumniData?.course && alumniData?.designation && (
                      <p className="designation mb-0" dangerouslySetInnerHTML={{__html:alumniData.designation}} />
                    )}

                    {alumniData?.batch && (
                      <p className="designation" dangerouslySetInnerHTML={{__html:alumniData.batch}} />
                    )}
                  </div>

                  <div className="bottom_line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}
