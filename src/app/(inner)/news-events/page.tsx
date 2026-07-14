import apiFetch from '@/lib/api'
import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL } from '@/config/config';
import { getSlug } from '@/lib/getSlug';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsFilter from './NewsFilter';
import './happenings.css'

interface DataInterface {
    name: string;
    date: string;
    id: number;
    image: string;
    slug: string;
}

interface FeaturedNewsInterface {
    name: string;
    date: string;
    image: string;
    video?: string;
    featured: string;
    display_order?: string;
    schools?: string[] | null;
    departments?: string[] | null;
    slug: string;
    id: number;
}

interface NewsResponseInterface {
    newsAndEvents: {
        data: DataInterface[];
    };
    featuredNewsAndEvents: FeaturedNewsInterface[]
}

interface PageProps{
    searchParams:Promise<{[key:string]:string | string[] | undefined}>
}

export default async function NewsEventsPage({searchParams}:PageProps) {
    const params = await searchParams;

    const school = typeof params.school === 'string' ? params.school : undefined;
    const department = typeof params.department === 'string' ? params.department : undefined
    const year = typeof params.year === 'string' ? params.year : undefined;

    const query = new URLSearchParams();
    if(school) query.set('school', school);
    if(department) query.set('department', department);
    if(year) query.set('year', year);

    const { data, error } = await apiFetch(`news-events${query.toString() ? `?${query.toString()}` : ''}`);

    const [{data:schoolData, error:schoolError}, {data:departmentData, error:departmentError}] = await Promise.all([apiFetch(`schools`), apiFetch(`departments`)]);

    const slug = await getSlug();
    const newsResponse = (data as NewsResponseInterface)?.newsAndEvents;
    const featuredNews = (data as NewsResponseInterface)?.featuredNewsAndEvents ?? [];

    return (
        <div className="gallery_sec leadership_detail_section">
            <div className="container">
                <NewsFilter
                    schools={schoolData?.data ?? []}
                    departments={departmentData?.data ?? []}
                />

                {featuredNews.length > 0 && (
                    <FeaturedNews data={featuredNews} />
                )}

                {newsResponse?.data?.length > 0 && (
                    <div className="gallery_listing news_listing">
                        {newsResponse?.data.map((item) => (
                            <div key={item.id} className="gallery_box">
                                <Image src={item.image} alt={item.name} width={488} height={375} loading='lazy' />
                                <div className="gallery_overlay">
                                    {item?.date && (
                                        <span>{new Date(item.date).toLocaleDateString('en-GB', {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }).replace(/ /g, '.')}</span>
                                    )}
                                    {item?.name && (
                                        <h4>{item.name}</h4>
                                    )}
                                </div>
                                <Link className="overlap_btn" href={`${BASE_URL}${slug}/${item.slug}`}></Link>
                            </div>
                        ))}

                    </div>
                )}

                <div className="load_more_btn">
                    <button>
                        Load More
                        <span>
                            <img src="/images/nav-arrow-next.svg" className="img-fluid" alt="arrow" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}