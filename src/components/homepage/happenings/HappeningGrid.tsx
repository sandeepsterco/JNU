"use client"

import { useRef, useState } from "react"
import { BASE_URL } from "@/config/config"
import Link from "next/link"

interface NewsEvent {
    name: string
    date: string           // ISO: "2026-06-26"
    image: string
    video: string          // "" or URL
    display_order: string
    schools: string | null
    departments: string | null
    slug: string
}

function parseDate(iso: string): { day: string; month: string; year: string } {
    const d = new Date(iso)
    return {
        day: String(d.getUTCDate()).padStart(2, '0'),
        month: d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
        year: String(d.getUTCFullYear()).slice(2),
    }
}

function HappBox({ item }: { item: NewsEvent }) {
    const date = parseDate(item.date)
    return (
        <div className="happ_Bx">
            <DateBlock date={date} />
            <p>{item.name}</p>
            <span className="happ_next">
                <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
            </span>
            <Link href={`${BASE_URL}news-events/${item.slug}`} className="overlap_btn"></Link>
        </div>
    )
}

function HappGrid({ item }: { item: NewsEvent }) {
    return (
        <div className="happ_grid">
            <figure>
                <img src={item.image} className="img-fluid" alt={item.name} />
            </figure>
            <HappBox item={item} />
        </div>
    )
}

export function DateBlock({ date }: { date: { day: string; month: string; year: string } }) {
    return (
        <div className="date">
            {date.day} <span>{date.month}<br />{date.year}</span>
        </div>
    )
}


function VideoBlock({ item }: { item: NewsEvent }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoBoxRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const date = parseDate(item.date)

    const handleToggle = () => {
        const video = videoRef.current
        const videoBox = videoBoxRef.current
        if (!video || !videoBox) return
        if (video.paused) {
            videoBox.style.display = 'block'
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div className="happening_video">
            <figure className="happ_video_wrap">
                <img src={item.image} className="img-fluid" alt={item.name} />
                {item.video && (
                    <button
                        className={`video_btn ${isPlaying ? 'pause_btn' : 'play_btn'}`}
                        onClick={handleToggle}
                    >
                        <img
                            src={isPlaying ? '/images/icons/pause-icon.svg' : '/images/icons/play-icon.svg'}
                            alt={isPlaying ? 'Pause' : 'Play'}
                        />
                    </button>
                )}
                {item.video && (
                    <div className="happ_video" ref={videoBoxRef} style={{ display: 'none' }}>
                        <video ref={videoRef} muted loop playsInline>
                            <source src={item.video} type="video/mp4" />
                        </video>
                    </div>
                )}
            </figure>
            <div className="happening_video_cnt">
                <DateBlock date={date} />
                <p>{item.name}</p>
                <Link className="happ_next" href={`${BASE_URL}news-events/${item.slug}`}>
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </Link>
            </div>
        </div>
    )
}

function VideoGridBlock({ items }: { items: NewsEvent[] }) {
    const [primary, secondary] = items
    return (
        <>
            <VideoBlock item={primary} />
            {secondary && <HappGrid item={secondary} />}
        </>
    )
}

function ScheduleGridBlock({ items }: { items: NewsEvent[] }) {
    const [scheduleItem, leftItem, rightItem] = items
    const date = parseDate(scheduleItem.date)

    return (
        <>
            {/* Left: schedule card */}
            <div className="happ_sch">
                <div className="happ_sch_Bx">
                    <DateBlock date={date} />
                    <p>{scheduleItem.name}</p>
                </div>
                <figure>
                    <img src={scheduleItem.image} className="img-fluid" alt={scheduleItem.name} />
                </figure>
                <span className="happ_next">
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </span>
                <Link href={`${BASE_URL}news-events/${scheduleItem.slug}`} className="overlap_btn"></Link>
            </div>

            {/* Right: small box + featured image */}
            <div className="happ_grid">
                {leftItem && (
                    <div className="happ_left">
                        <HappBox item={leftItem} />
                        <figure>
                            <img src={leftItem.image} className="img-fluid" alt={leftItem.name} />
                        </figure>
                    </div>
                )}
                {rightItem && <HappeningImg item={rightItem} />}
            </div>
        </>
    )
}

function HappeningImg({ item }: { item: NewsEvent }) {
    const date = parseDate(item.date)
    return (
        <div className="happening_img">
            <figure>
                <img src={item.image} className="img-fluid" alt={item.name} />
            </figure>
            <div className="happening_img_cnt">
                <DateBlock date={date} />
                <p>{item.name}</p>
                <span className="happ_next">
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </span>
                <Link href={`${BASE_URL}news-events/${item.slug}`} className="overlap_btn"></Link>
            </div>
        </div>
    )
}


function ImageGridBlock({ items }: { items: NewsEvent[] }) {
    const [primary, secondary] = items
    return (
        <>
            <HappGrid item={primary} />
            {secondary && <HappeningImg item={secondary} />}
        </>
    )
}

const aosDelays = [200, 400, 600]

export default function HappeningGrid({ modular }: { modular: any }) {
    const sorted = [...(modular ?? [])].sort(
        (a, b) => Number(a.display_order) - Number(b.display_order)
    )

    const block1 = sorted.slice(0, 2)
    const block2 = sorted.slice(2, 5)
    const block3 = sorted.slice(5, 7)

    return (
        <div className="happening_grid">
            {block1.length > 0 && (
                <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[0]}>
                    <VideoGridBlock items={block1} />
                </div>
            )}
            {block2.length > 0 && (
                <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[1]}>
                    <ScheduleGridBlock items={block2} />
                </div>
            )}
            {block3.length > 0 && (
                <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[2]}>
                    <ImageGridBlock items={block3} />
                </div>
            )}
        </div>
    )
}