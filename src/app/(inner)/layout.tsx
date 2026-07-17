import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import NotFound from "../not-found";
import '@/styles/inner.css'

export default async function InnerPageLayout({ children }: { children: React.ReactNode }) {
    // Use first path segment so nested routes (e.g. /faculty/[slug]) still load section CMS head data
    const slug = await getSlug(0);
    const childSlug = await getSlug(-1);
    const {data, error} = await apiFetch(`cms/${slug}`);

    if(error){
        return <NotFound />;
    }

    const headData = data?.data

    const isNewsDetailPage = slug === 'news-events' && childSlug.trim() !== '' && childSlug !== slug;

    const showInnerHead = !isNewsDetailPage && childSlug.trim() !== '';

    return (
        <main className="site_main">
            {showInnerHead && <InnerHead headData={headData} />}
            {children}
        </main>
    )
}