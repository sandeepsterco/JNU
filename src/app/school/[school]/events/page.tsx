import apiFetch from '@/lib/api'
import NewsFilter from './NewsFilter';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsList from './NewsList';
import "@/app/(common)/(inner)/(happenings)/happenings.css";

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
        next_page_url: string | null;
    };
    featuredNewsAndEvents: FeaturedNewsInterface[]
}

interface PageProps {
    params: Promise<{ school: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

interface SchoolNavigationResponse {
    schoolId?: string | number
}

export default async function NewsEventsPage({ params, searchParams }: PageProps) {
    const { school } = await params;
    const resolvedSearchParams = await searchParams;

    const department = typeof resolvedSearchParams.department === 'string' ? resolvedSearchParams.department : undefined;
    const date = typeof resolvedSearchParams.date === 'string' ? resolvedSearchParams.date : undefined;

    const [{ data: navigationData, error: navigationError }, { data: departmentData, error: departmentError }] = await Promise.all([
        apiFetch(`school/${school}/navigation?q=header`),
        apiFetch('departments'),
    ]);

    if (navigationError) {
        throw new Error('Failed to load school information for news and events');
    }

    if (departmentError) {
        throw new Error('Failed to load departments for news and events');
    }

    const schoolId = (navigationData as SchoolNavigationResponse | null)?.schoolId;
    if (schoolId === undefined || schoolId === null || String(schoolId) === '') {
        throw new Error(`School ID is missing for "${school}"`);
    }

    const query = new URLSearchParams({ school: String(schoolId) });
    if (department) query.set('department', department);
    if (date) query.set('date', date);

    const { data, error } = await apiFetch(`news-events?${query.toString()}`);

    if (error) {
        throw new Error('Failed to load news and events')
    }

    const newsAndEvents = (data as NewsResponseInterface)?.newsAndEvents;
    const featuredNews = (data as NewsResponseInterface)?.featuredNewsAndEvents ?? [];

    return (
        <div className="gallery_sec leadership_detail_section">
            <div className="container">
                <NewsFilter
                    fixedSchoolId={schoolId}
                    departments={departmentData?.data ?? []}
                />
                {featuredNews.length > 0 && (
                    <FeaturedNews data={featuredNews} />
                )}

                {newsAndEvents?.data?.length === 0 ? (
                    <div className="news_empty_state">
                        <p>No news or events found{department || date ? ' for the selected filters.' : '.'}</p>
                    </div>
                ) : (
                    <NewsList
                        key={`${schoolId}-${department ?? ''}-${date ?? ''}`}
                        initialData={newsAndEvents?.data ?? []}
                        slug={`school/${school}/events`}
                        filters={{ school: String(schoolId), department, date }}
                        hasMoreInitially={Boolean(newsAndEvents?.next_page_url)}
                    />
                )}
            </div>
        </div>
    )
}