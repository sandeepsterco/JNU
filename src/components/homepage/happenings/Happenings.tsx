"use client"
import { useRef, useState } from 'react'
import './happenings.css'

// ─── Types ───────────────────────────────────────────────────────────────────

interface DateInfo {
    day: string
    month: string
    year: string
}

interface VideoItem {
    placeholder: string
    src: string
    date: DateInfo
    title: string
    link: string
}

interface BoxItem {
    date: DateInfo
    title: string
    link: string
}

interface GridItem extends BoxItem {
    image: string
}

interface FeaturedItem {
    image: string
    date: DateInfo
    title: string
    link: string
}

interface ScheduleItem {
    date: DateInfo
    title: string
    logo: string
    link: string
}

interface VideoGridHappening {
    id: number
    type: 'video_grid'
    video: VideoItem
    grid: GridItem
}

interface ScheduleGridHappening {
    id: number
    type: 'schedule_grid'
    schedule: ScheduleItem
    grid: {
        left: {
            text: BoxItem
            image: string
        }
        right: FeaturedItem
    }
}

interface ImageGridHappening {
    id: number
    type: 'image_grid'
    grid: GridItem
    featured: FeaturedItem
}

type HappeningItem = VideoGridHappening | ScheduleGridHappening | ImageGridHappening

// ─── Data ────────────────────────────────────────────────────────────────────

const happeningsData: HappeningItem[] = [
    {
        id: 1,
        type: 'video_grid',
        video: {
            placeholder: '/images/placeholders/happening-placeholder.webp',
            src: '/videos/campus-video.mp4',
            date: { day: '28', month: 'Mar', year: '26' },
            title: 'TEDx JNU. Beyond the Obvious – Breaking Patterns, Building Futures',
            link: '#',
        },
        grid: {
            image: '/images/placeholders/happening-placeholder-2.webp',
            date: { day: '25', month: 'Feb', year: '26' },
            title: 'Talk on Ambekar Vision of Social Justice & The Constitution in the Twenty-First Century',
            link: '#',
        },
    },
    {
        id: 2,
        type: 'schedule_grid',
        schedule: {
            date: { day: '27', month: 'Mar', year: '26' },
            title: '12th Professor V.S. Mani Memorial International Law Moot Court Competition - 2026',
            logo: '/images/happenings/happ_logo.webp',
            link: '#',
        },
        grid: {
            left: {
                text: {
                    date: { day: '27', month: 'Feb', year: '26' },
                    title: 'Largest Millet Based Pizza - India Book of Records Attempt',
                    link: '#',
                },
                image: '/images/placeholders/happening-placeholder-2.webp',
            },
            right: {
                image: '/images/placeholders/happening-placeholder.webp',
                date: { day: '27', month: 'Jan', year: '26' },
                title: 'Guest Lecture on " New Trends in Millet Technology " by Dr. Satyen Yadav, Chairman, India Millet Initiative',
                link: '#',
            },
        },
    },
    {
        id: 3,
        type: 'image_grid',
        grid: {
            image: '/images/placeholders/happening-placeholder-2.webp',
            date: { day: '10', month: 'Oct', year: '25' },
            title: 'CPR Training of general public and community',
            link: '#',
        },
        featured: {
            image: '/images/placeholders/happening-placeholder.webp',
            date: { day: '12', month: 'Nov', year: '25' },
            title: 'Guest Lecture on " AIML for Bio-medical applications" by Dr. D. Narendhar Singh',
            link: '#',
        },
    },
]

const aosDelays: number[] = [200, 400, 600]

// ─── Small reusable pieces ────────────────────────────────────────────────────

function DateBlock({ date }: { date: DateInfo }) {
    return (
        <div className="date">
            {date.day} <span>{date.month} <br />{date.year}</span>
        </div>
    )
}

function HappBox({ data }: { data: BoxItem }) {
    return (
        <div className="happ_Bx">
            <DateBlock date={data.date} />
            <p>{data.title}</p>
            <span className="happ_next">
                <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
            </span>
            <a href={data.link} className="overlap_btn"></a>
        </div>
    )
}

function HappGrid({ image, box }: { image: string; box: BoxItem }) {
    return (
        <div className="happ_grid">
            <figure>
                <img src={image} className="img-fluid" alt="happening" />
            </figure>
            <HappBox data={box} />
        </div>
    )
}

function HappeningImg({ data }: { data: FeaturedItem }) {
    return (
        <div className="happening_img">
            <figure>
                <img src={data.image} className="img-fluid" alt="happening" />
            </figure>
            <div className="happening_img_cnt">
                <DateBlock date={data.date} />
                <p>{data.title}</p>
                <span className="happ_next">
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </span>
                <a href={data.link} className="overlap_btn"></a>
            </div>
        </div>
    )
}

// ─── Video block (replaces jQuery toggle) ────────────────────────────────────

function VideoBlock({ data }: { data: VideoItem }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoBoxRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

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
                <img src={data.placeholder} className="img-fluid" alt="happening" />
                <button
                    className={`video_btn ${isPlaying ? 'pause_btn' : 'play_btn'}`}
                    onClick={handleToggle}
                >
                    <img
                        src={isPlaying ? '/images/icons/pause-icon.svg' : '/images/icons/play-icon.svg'}
                        alt={isPlaying ? 'Pause' : 'Play'}
                    />
                </button>
                <div className="happ_video" ref={videoBoxRef} style={{ display: 'none' }}>
                    <video ref={videoRef} muted loop playsInline>
                        <source src={data.src} type="video/mp4" />
                    </video>
                </div>
            </figure>
            <div className="happening_video_cnt">
                <DateBlock date={data.date} />
                <p>{data.title}</p>
                <a className="happ_next" href={data.link}>
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </a>
            </div>
        </div>
    )
}

// ─── Column block renderers ───────────────────────────────────────────────────

function VideoGridBlock({ item }: { item: VideoGridHappening }) {
    return (
        <>
            <VideoBlock data={item.video} />
            <HappGrid image={item.grid.image} box={item.grid} />
        </>
    )
}

function ScheduleGridBlock({ item }: { item: ScheduleGridHappening }) {
    return (
        <>
            <div className="happ_sch">
                <div className="happ_sch_Bx">
                    <DateBlock date={item.schedule.date} />
                    <p>{item.schedule.title}</p>
                </div>
                <figure>
                    <img src={item.schedule.logo} className="img-fluid" alt="jnu" />
                </figure>
                <span className="happ_next">
                    <img src="/images/icons/next.svg" className="img-fluid" alt="next" />
                </span>
                <a href={item.schedule.link} className="overlap_btn"></a>
            </div>
            <div className="happ_grid">
                <div className="happ_left">
                    <HappBox data={item.grid.left.text} />
                    <figure>
                        <img src={item.grid.left.image} className="img-fluid" alt="happening" />
                    </figure>
                </div>
                <HappeningImg data={item.grid.right} />
            </div>
        </>
    )
}

function ImageGridBlock({ item }: { item: ImageGridHappening }) {
    return (
        <>
            <HappGrid image={item.grid.image} box={item.grid} />
            <HappeningImg data={item.featured} />
        </>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

function renderBlock(item: HappeningItem) {
    switch (item.type) {
        case 'video_grid':     return <VideoGridBlock item={item} />
        case 'schedule_grid':  return <ScheduleGridBlock item={item} />
        case 'image_grid':     return <ImageGridBlock item={item} />
    }
}

export default function Happenings() {
    return (
        <section className="happening_section">
            <div className="container-fluid">
                <div className="happening_header">
                    <h5 className="font18">HAPPENINGS@JNU</h5>
                    <a href="#">
                        <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                    </a>
                </div>
                <div className="happening_grid">
                    {happeningsData.map((item, index) => (
                        <div
                            key={item.id}
                            className="happening_Bx"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={aosDelays[index]}
                        >
                            {renderBlock(item)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}