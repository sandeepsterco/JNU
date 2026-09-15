"use client"
import { useState, useRef, useTransition, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { loadMoreGallery } from "@/actions/loadMoreGallery";
import "swiper/css";
import "swiper/css/navigation";

const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

interface DataInterface {
    date: string
    id: number
    slug: string;
    thumbnail: string;
    title: string;
}

interface GalleryListProps {
    galleryData: DataInterface[]
    hasMoreInitially: boolean
    filters: { school?: string; department?: string; date?: string }
}

export default function GalleryGrid({ galleryData, hasMoreInitially, filters }: GalleryListProps) {
    const [updatedData, setUpdatedData] = useState(galleryData)
    const [page, setPage] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const [hasMore, setHasMore] = useState(hasMoreInitially)
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleLoadMore = () => {
        startTransition(async () => {
            const nextPage = page + 1;
            const result = await loadMoreGallery({ page: nextPage, ...filters })

            setUpdatedData((prev) => [...prev, ...result.data])
            setHasMore(result.hasMore)
            setPage(nextPage)
        })
    }

    const openModal = (index: number) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const activeItem = updatedData[activeIndex];

    return (
        <>
            <div className="gallery_listing">
                {updatedData.map((item, index) => (
                    <div
                        key={item.id}
                        className="gallery_box cursor-pointer"
                        onClick={() => openModal(index)}
                    >
                        <Image
                            src={item?.thumbnail ? item.thumbnail : `/images/placeholders/hapennig_gallery_placeholder.webp`}
                            alt={item.title}
                            width={760}
                            height={600}
                            loading="lazy"
                        />
                        <div className="gallery_overlay">
                            {item?.date && <span>{formatDate(item.date)}</span>}
                            {item.title && <h4 dangerouslySetInnerHTML={{ __html: item.title }} />}
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="load_more_btn">
                    <button className="load_btn" onClick={handleLoadMore} disabled={isPending}>
                        {isPending ? 'Loading...' : 'Load More'}
                        <span>
                            <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                        </span>
                    </button>
                </div>
            )}


            {isOpen && (
                <div className="gallery_modal" style={{ display: "flex" }}>
                    <div className="gallery_wrap">
                        <button className="gallery_close" onClick={closeModal}>
                            ✕
                        </button>

                        <Swiper
                            modules={[Navigation]}
                            loop={updatedData.length > 1}
                            initialSlide={activeIndex}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.realIndex);
                            }}
                            className="gallerySwiper"
                        >
                            {updatedData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <img
                                        src={item?.thumbnail ? item.thumbnail : `/images/placeholders/hapennig_gallery_placeholder.webp`}
                                        alt={item.title}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="gallery_info">
                            {activeItem?.date && (
                                <div className="gallery_date">{formatDate(activeItem.date)}</div>
                            )}
                            {activeItem?.title && (
                                <div
                                    className="gallery_title"
                                    dangerouslySetInnerHTML={{ __html: activeItem.title }}
                                />
                            )}
                            <div className="gallery_nav">
                                <div
                                    className="gallery_prev cursor-pointer"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                >
                                    <img src="/images/icons/left_arrow.svg" alt="prev" />
                                </div>
                                <div
                                    className="gallery_next cursor-pointer"
                                    onClick={() => swiperRef.current?.slideNext()}
                                >
                                    <img src="/images/icons/right_arrow.svg" alt="next" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}