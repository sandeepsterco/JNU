"use client";

import { useEffect, useMemo, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

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

interface PageDataInterface {
    data: {
        modular: {
            testimonials: TestimonialDataInterface[];
        };
    };
}

export default function SchoolTestimonial({
    data,
}: {
    params?: any;
    data: PageDataInterface;
}) {
    const testimonials = data?.data?.modular?.testimonials ?? [];

    // Group by `type` (Students / Parents / Alumni ...) keeping first-seen order
    const groups = useMemo(() => {
        const map = new Map<string, TestimonialDataInterface[]>();
        testimonials.forEach((item) => {
            const key = item.type || "Others";
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
        return Array.from(map.entries()).map(([type, items]) => ({ type, items }));
    }, [testimonials]);

    const [activeTab, setActiveTab] = useState(0);

    // Bind Fancybox once; delegated binding also covers slides rendered after tab changes
    useEffect(() => {
        Fancybox.bind("[data-fancybox='testimonial-videos']", {});
        return () => {
            Fancybox.unbind("[data-fancybox='testimonial-videos']");
            Fancybox.close();
        };
    }, []);

    if (groups.length === 0) return null;

    const active = groups[Math.min(activeTab, groups.length - 1)];

    return (
        <div className="custom_tabs">
            <div className="tab_nav" role="tablist">
                {groups.map((group, index) => (
                    <label
                        key={group.type}
                        role="tab"
                        aria-selected={index === activeTab}
                        className={index === activeTab ? "active" : ""}
                        onClick={() => setActiveTab(index)}
                    >
                        {group.type}
                    </label>
                ))}
            </div>

            <div className="tab_content">
                <div className="tab_panel active" role="tabpanel">
                    <div className="success_speak_slider">
                        {/* key forces Swiper to re-init when the tab changes */}
                        <Swiper
                            key={active.type}
                            className="swiper success_speak_swiper"
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            // modules={[Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            // pagination={{ clickable: true }}
                            // navigation
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1200: { slidesPerView: 4 },
                            }}
                        >
                            {active.items.map((item) => (
                                <SwiperSlide key={item.slug}>
                                    <TestimonialCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TestimonialCard({ item }: { item: TestimonialDataInterface }) {
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
                {item.profile_image && (
                    <span>
                        <Image
                            src={item.profile_image}
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
            </div>
            {/* <a href="#" className="overlap_btn" aria-label={item.name} /> */}
        </div>
    );
}