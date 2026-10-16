import NoData from '@/components/ui/NoData';
import apiFetch from '@/lib/api'
import GalleryGrid from './GalleryGrid';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

interface GalleryDataInterface {
    title: string;
    thumbnail: string;
    date: string;
    slug: string;
    id: number
}

interface GalleryResponseInterface {
    gallery: {
        data: GalleryDataInterface[]
        next_page_url:string | null;
    }
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

    const { data, error } = await apiFetch(`gallery${query.toString()?`?${query.toString()}` : ''}`);

    if (error) {
        throw new Error('Failed to load Galleries')
    }

    const galleryData = (data as GalleryResponseInterface)?.gallery ?? { data: [], next_page_url:null };

    return (
        <>
            {galleryData?.data?.length === 0 && <NoData />}
            {galleryData?.data?.length > 0 && <GalleryGrid galleryData={galleryData.data} filters={{ school, department, date }} hasMoreInitially={Boolean(galleryData?.next_page_url)} />}
        </>
    )
}