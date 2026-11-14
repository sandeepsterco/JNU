import apiFetch from '@/lib/api'
import { getSlug } from '@/lib/getSlug';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsList from './NewsList';

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
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsEventsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const school = typeof params.school === 'string' ? params.school : undefined;
    const department = typeof params.department === 'string' ? params.department : undefined
    const date = typeof params.date === 'string' ? params.date : undefined;

    const query = new URLSearchParams();
    if (school) query.set('school', school);
    if (department) query.set('department', department);
    if (date) query.set('date', date);

    const { data, error } = await apiFetch(`news-events${query.toString() ? `?${query.toString()}` : ''}`);

    if (error) {
        throw new Error('Failed to load news and events')
    }

    const slug = await getSlug();
    const newsAndEvents = (data as NewsResponseInterface)?.newsAndEvents;
    const featuredNews = (data as NewsResponseInterface)?.featuredNewsAndEvents ?? [];

    return (
        <>
            {featuredNews.length > 0 && (
                <FeaturedNews data={featuredNews} />
            )}

            {newsAndEvents?.data?.length === 0 ? (
                <div className="news_empty_state">
                    <p>No news or events found{school || department || date ? ' for the selected filters.' : '.'}</p>
                </div>
            ) : (
                <NewsList
                    initialData={newsAndEvents?.data ?? []}
                    slug={slug}
                    filters={{ school, department, date }}
                    hasMoreInitially={Boolean(newsAndEvents?.next_page_url)}
                />
            )}
        </>
    )
}