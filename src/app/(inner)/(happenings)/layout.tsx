import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import NotFound from "@/app/not-found";
import NewsFilter from "./news-events/NewsFilter";
import './happenings.css'

export default async function HappeningPageLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(0);
    const childSlug = await getSlug(-1);
    const { data, error } = await apiFetch(`cms/${slug}`);

    if (error) {
        return <NotFound />;
    }

    const [{ data: schoolData, error: schoolError }, { data: departmentData, error: departmentError }] = await Promise.all([apiFetch(`schools`), apiFetch(`departments`)]);

    const headData = data?.data

    const isNewsDetailPage = slug === 'news-events' && childSlug.trim() !== '' && childSlug !== slug;

    const showInnerHead = !isNewsDetailPage && childSlug.trim() !== '';

    return (
        <>
            {isNewsDetailPage ? (
                <>
                    
                    {children}
                </>
            ) : (
                <div className="gallery_sec leadership_detail_section">
                    <div className="container">
                        <NewsFilter
                            schools={schoolData?.data ?? []}
                            departments={departmentData?.data ?? []}
                        />
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}