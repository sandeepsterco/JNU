"use client";

import { useEffect, useMemo, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";

export interface TestimonialDataInterface {
    name: string;
    slug: string;
    type: string | null;
    image: string | null;
    video: string | null;
    video_url: string | null;
    year: string | number | null;
    course: string | null;
    description: string | null;
    profile_image: string | null;
    display_order: number | null;
}

const EMPTY_TESTIMONIALS: TestimonialDataInterface[] = [];

interface PageDataInterface {
    data: {
        modular: {
            testimonials: TestimonialDataInterface[];
        };
    };
}

export default function SchoolTestimonial({
    data,
    params
}: {
    params?: string;
    data: PageDataInterface;
}) {
    const testimonials = data?.data?.modular?.testimonials ?? EMPTY_TESTIMONIALS;

    const PRIORITY_TYPES = ["Students", "Parents", "Alumni"];

    const groups = useMemo(() => {
        const map = new Map<string, TestimonialDataInterface[]>();

        testimonials.forEach((item) => {
            const key = item.type?.trim() || "Others";
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(item);
        });

        map.forEach((list) =>
            list.sort(
                (a, b) =>
                    (a.display_order ?? Number.MAX_SAFE_INTEGER) -
                    (b.display_order ?? Number.MAX_SAFE_INTEGER)
            )
        );

        const priorityIndex = (type: string) =>
            PRIORITY_TYPES.findIndex(
                (p) => p.toLowerCase() === type.toLowerCase()
            );

        return Array.from(map.entries())
            .map(([type, items], firstSeen) => ({ type, items, firstSeen }))
            .sort((a, b) => {
                const ai = priorityIndex(a.type);
                const bi = priorityIndex(b.type);

                // both are priority types -> follow Students / Parents / Alumni order
                if (ai !== -1 && bi !== -1) return ai - bi;
                // only one is a priority type -> it goes first
                if (ai !== -1) return -1;
                if (bi !== -1) return 1;
                // neither -> keep API first-seen order
                return a.firstSeen - b.firstSeen;
            })
            .map(({ type, items }) => ({ type, items }));
    }, [testimonials]);

    const [activeType, setActiveType] = useState<string | null>(null);

    // Bind Fancybox once; delegated binding also covers slides rendered after tab changes
    useEffect(() => {
        Fancybox.bind("[data-fancybox='testimonial-videos']", {});
        return () => {
            Fancybox.unbind("[data-fancybox='testimonial-videos']");
            Fancybox.close();
        };
    }, []);

    if (groups.length === 0) return null;

    const active = groups.find((group) => group.type === activeType) ?? groups[0];
    const activeTab = groups.findIndex((group) => group.type === active.type);

    return (
        <div className="custom_tabs">
            <div className="tab_nav" role="tablist">
                {groups.map((group, index) => (
                    <button
                        type="button"
                        id={`testimonial-tab-${index}`}
                        key={group.type}
                        role="tab"
                        aria-selected={index === activeTab}
                        aria-controls="school-testimonial-panel"
                        className={index === activeTab ? "active" : ""}
                        onClick={() => setActiveType(group.type)}
                    >
                        {group.type}
                    </button>
                ))}
            </div>

            <div className="tab_content">
                <div
                    id="school-testimonial-panel"
                    className="tab_panel active"
                    role="tabpanel"
                    aria-labelledby={`testimonial-tab-${activeTab}`}
                >
                    <div className="success_speak_slider" data-react-swiper>
                        {/* key forces Swiper to re-init when the tab changes */}
                        <Swiper
                            key={active.type}
                            className="swiper success_speak_swiper"
                            modules={[Autoplay]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1200: { slidesPerView: 4 },
                            }}
                        >
                            {active.items.map((item) => (
                                <SwiperSlide key={item.slug}>
                                    <TestimonialCard item={item} params={params} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TestimonialCard({ item, params }: { item: TestimonialDataInterface; params?:string; }) {
    // video_url (YouTube/Vimeo/etc.) takes priority; otherwise use the uploaded file
    const videoSrc = item.video_url || item.video || "";
    const hasVideo = Boolean(videoSrc);
    const isUploadedFile =
        !item.video_url && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(videoSrc);
    const meta = [item.course, item.year].filter(Boolean).join(" • ");

    if (hasVideo) {
        return (
            <div className="success_speak_videobx">
                {item.image && (
                    <figure>
                        <Image
                            src={item.image}
                            alt={item.name}
                            className="img-fluid"
                            loading="lazy"
                            width={533}
                            height={610}
                        />
                    </figure>
                )}
                <div className="success_speak_bx_flex">
                    <span>
                        <button type="button" className="play-pause-btn" aria-label={`Play ${item.name}`} >▶</button>
                    </span>
                    <figcaption>
                        <h5>{item.name}</h5>
                        <h6>{item.course}</h6>
                        <p>{item.year}</p>
                        
                        {item.description && <p>{item.description}</p>}
                    </figcaption>
                </div>
                <a
                    href={videoSrc}
                    data-fancybox="testimonial-videos"
                    data-type={isUploadedFile ? "html5video" : undefined}
                    data-caption={item.name}
                    className="overlap_btn"
                    aria-label={`Play ${item.name}`}
                />
            </div>
        );
    }

    return (
      
            <div className="success_speak_bx">
                {item.description && <p>{item.description}</p>}
                <div className="success_speak_bx_flex">
                    {item.image && (
                        <span>
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="img-fluid"
                                loading="lazy"
                                width={41}
                                height={41}
                            />
                        </span>
                    )}
                    <figcaption>
                        <h5>{item.name}</h5>
                        <h6>{item.course}</h6>
                        <p>{item.year}</p>
                    </figcaption>
                      <Link href={`${BASE_URL}school/${params || ''}/testimonials/${item.slug}`} className="overlap_btn"></Link>
                </div>
                {/* <a href="#" className="overlap_btn" aria-label={item.name} /> */}
            </div>
        
    );
}