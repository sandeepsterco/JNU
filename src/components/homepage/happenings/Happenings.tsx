import Link from 'next/link'
import { BASE_URL } from '@/config/config'
import HappeningGrid from './HappeningGrid'
import './happenings.css'

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

interface HappeningsPropsInterface {
    data: {
        title: string
        slug?: string
    }
    modular: NewsEvent[]
}


export default function Happenings({ data, modular }: HappeningsPropsInterface) {
    

    return (
        <section className="happening_section">
            <div className="container-fluid">
                <div className="happening_header">
                    {data?.title && (
                        <h5 className="font18" dangerouslySetInnerHTML={{ __html: data.title }} />
                    )}
                    {data?.slug && (
                        <Link href={`${BASE_URL}${data.slug}`}>
                            <img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                        </Link>
                    )}
                </div>

                <HappeningGrid modular={modular} />

                
            </div>
        </section>
    )
}