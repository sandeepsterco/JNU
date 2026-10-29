import HappeningGrid from "@/components/homepage/happenings/HappeningGrid";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"

export interface NewsDataInterface {
    name: string;
    date: string;
    image: string;
    video: string;
    featured?: string | null;
    display_order: string;
    slug: string;
}

interface PageDataInterface {
    data: {
        modular: {
            ['news-events']: NewsDataInterface[]
        }
    }
}

export default async function SchoolNews() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const { data, error } = await apiFetch(`${parentSlug}/${slug}`);

    if (error || !data.status) throw new Error(`Failed to fetch School News`)

    const pageData = (data as PageDataInterface)?.data?.modular?.[`news-events`] ?? [];

    if (pageData && pageData?.length === 0) return;

    return (
        <HappeningGrid modular={pageData} />
    )
}