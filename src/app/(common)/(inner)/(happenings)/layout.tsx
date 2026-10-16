import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import NotFound from "@/app/not-found";
import NewsFilter from "./news-events/NewsFilter";
import HappeningsWrapper from "./HappeningsWrapper";
import './happenings.css'

export default async function HappeningPageLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(0);
    const { data, error } = await apiFetch(`cms/${slug}`);

    if (error || !data.status) {
        return <NotFound />;
    }

    const [{ data: schoolData, error: schoolError }, { data: departmentData, error: departmentError }] = await Promise.all([apiFetch(`schools`), apiFetch(`departments`)]);

    // const isNewsDetailPage = slug === 'news-events' && childSlug.trim() !== '' && childSlug !== slug;

    return (
        <HappeningsWrapper
            filters={
                <NewsFilter
                    schools={schoolData?.data ?? []}
                    departments={departmentData?.data ?? []}
                />
            }
        >
            {children}
        </HappeningsWrapper>
    )
}