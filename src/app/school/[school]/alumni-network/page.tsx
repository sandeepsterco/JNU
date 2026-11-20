import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import "@/components/homepage/placement/placement.css";
import "@/components/homepage/research/research.css";
import "@/components/homepage/alumni/alumni.css";
import "@/components/homepage/happenings/happenings.css";
import "@/components/homepage/faqs/faq.css";
import "@/styles/common/statsWrapper.css";
import SchoolNoData from "@/components/ui/SchoolNoData";
import "../school.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import SchoolAlumniVideo from "@/components/parser/schoolAlumni/SchoolAlumniVideo";
import { BASE_URL } from "@/config/config";
import Link from "next/link";

interface IAlumni{
    name:string;
    course:string;
    batch:string;
    thumbnail:string;
    logo:string;
    video?:string | null;
    designation:string;
    slug:string;
    message:string;
}

export default async function SchoolAlumniPage({
  params,
  searchParams,
}: {
  params: Promise<{ school: string }>;
  searchParams: Promise<{
    search?: string;
    duration?: string;
    school?: string;
  }>;
}) {
  const { ...resolvedSearchParams } = await searchParams;
  const { school } = await params;

  const [{ data, error }, {data:alumniResponse}] = await Promise.all([
    apiFetch(`school/${school}/alumni-network`),
    apiFetch(`schools/${school}/alumni`)
  ]);

  if (error || !data.status) {
    return notFound();
  }

  const cmsData = data?.data?.sections ?? {};

  const combineHTML = Object.values(cmsData).join("");

  //   if (!cmsData || cmsData?.length === 0) return <SchoolNoData />;

  const alumniData = (alumniResponse?.alumni as IAlumni[]) || [];

  return (
    <>
    {alumniData && alumniData.length > 0 && (
        <section className="alumni_mainsec hero_bg_pattern">
            <div className="container">
                <div className="gridbox_three">
                    {alumniData.map((alumniItem, idx)=>(
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
                                {alumniItem?.message && (
                                    <h4 className="alumni_msg_desc" dangerouslySetInnerHTML={{__html:alumniItem.message}} />
                                )}
                                {alumniItem?.name && (
                                    <h5 dangerouslySetInnerHTML={{__html:alumniItem.name}} />
                                )}

                                {alumniItem?.designation && (
                                    <p className="mb-0" dangerouslySetInnerHTML={{__html:alumniItem.designation}} />
                                )}

                                {alumniItem?.batch && (
                                    <p>Batch <span>{alumniItem.batch}</span></p>
                                )}
                                
                            </div>
                            {alumniItem?.slug && (
                                <Link className="overlap_btn" href={`${BASE_URL}alumni/${alumniItem.slug}`}></Link>
                            )}
                        </div>
                        )
                    ))}
                    
                </div>
            </div>
        </section>
    )}


      {combineHTML && (
        <ReactParserDynamic
          html={combineHTML}
          data={data}
          searchParams={resolvedSearchParams}
        />
      )}
    </>
  );
}
