"use client"

import { BASE_URL } from "@/config/config"
import Link from "next/link"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

interface NewsEvent {
    name: string
    date: string            // ISO: "2026-06-26"
    image: string | null
    video: string | null    // URL or null
    display_order: string | null
    schools: string | null
    departments: string | null
    slug: string
}

interface ISchoolHappening {
    data: {
        modular: {
            ['news-events']: NewsEvent[]
        }
    }
}

function parseDate(iso: string): { day: string; month: string; year: string } {
    const d = new Date(iso)
    return {
        day: String(d.getUTCDate()).padStart(2, "0"),
        month: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
        year: String(d.getUTCFullYear()).slice(2),
    }
}

function DateBlock({ date }: { date: { day: string; month: string; year: string } }) {
    return (
        <div className="date">
            {date.day} <span> {date.month} <br />{date.year}</span>
        </div>
    )
}

function openVideo(src: string) {
    Fancybox.show([{ src, type: "html5video" }])
}

function HappeningCard({ item, variant }: { item: NewsEvent; variant: "image" | "blue" }) {
    const date = parseDate(item.date)
    // null, "" or whitespace-only => no video
    const videoUrl = typeof item.video === "string" ? item.video.trim() : ""
    const hasVideo = videoUrl !== ""

    return (
        <div className={`happ_card happ_card_${variant}`}>
            {/* Middle card is solid blue (no image), as per design */}
            {variant === "image" && item.image && (
                <figure className="happ_card_img">
                    <img src={item.image} className="img-fluid" alt={item.name} />
                </figure>
            )}

            <div className="happ_card_top">
                <DateBlock date={date} />
                <span className="happ_next">
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </span>
            </div>

            {hasVideo && (
                <button
                    type="button"
                    className="video_btn play_btn"
                    aria-label={`Play video: ${item.name}`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        openVideo(videoUrl)
                    }}
                >
                    <img src="/images/icons/play-icon.svg" alt="Play" />
                </button>
            )}

            <p className="happ_card_title">{item.name}</p>

            <Link href={`${BASE_URL}news-events/${item.slug}`} className="overlap_btn" aria-label={item.name}></Link>
        </div>
    )
}

function toOrder(value: string | null): number | null {
    if (value === null || value === undefined || String(value).trim() === "") return null
    const n = Number(value)
    return Number.isNaN(n) ? null : n
}

const aosDelays = [200, 400, 600]

export default function SchoolHappeningGrid({ data }: { data: ISchoolHappening }) {
    const items = [...(data?.data?.modular?.["news-events"] ?? [])]
        .sort((a, b) => {
            // items with a display_order come first (ascending); null/""/invalid go last
            const ao = toOrder(a.display_order)
            const bo = toOrder(b.display_order)
            if (ao === bo) return 0 // equal (or both unset): keep original API order
            if (ao === null) return 1
            if (bo === null) return -1
            return ao - bo
        })
        .slice(0, 3)

    if (!items.length) return null

    return (
        <div className="happening_grid happening_grid_3">
            {items.map((item, i) => (
                <div
                    key={item.slug}
                    className="happening_col"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={aosDelays[i]}
                >
                    <HappeningCard item={item} variant={i === 1 ? "blue" : "image"} />
                </div>
            ))}
        </div>
    )
}

/* ---------- suggested CSS (adjust to your stylesheet) ----------

.happening_grid_3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
@media (max-width: 991px) { .happening_grid_3 { grid-template-columns: 1fr; } }

.happ_card { position: relative; height: 280px; overflow: hidden; color: #fff; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
.happ_card_blue { background: #1e3f8a; }
.happ_card_img { position: absolute; inset: 0; margin: 0; }
.happ_card_img img { width: 100%; height: 100%; object-fit: cover; }
.happ_card_image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.65)); }
.happ_card_top { position: absolute; top: 15px; left: 20px; right: 20px; display: flex; justify-content: space-between; z-index: 2; }
.happ_card_title { position: relative; z-index: 2; margin: 0; }
.video_btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 4; border: 0; background: transparent; cursor: pointer; }
.overlap_btn { position: absolute; inset: 0; z-index: 3; }

---------------------------------------------------------------- */