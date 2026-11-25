import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
// import NotFound from "@/app/not-found";
import '@/styles/inner.css'
import '@/app/(common)/(inner)/(happenings)/happenings.css'
import { notFound } from "next/navigation";

export default async function InnerPageLayout({ children }: { children: React.ReactNode }) {
    // const slug = await getSlug(0);
    // const childSlug = await getSlug(-1);
    const {data, error} = await apiFetch(`cms/news-events`);

    if(error) notFound();

    // const headData = data?.data

    // const isNewsDetailPage = slug === 'news-events' && childSlug.trim() !== '' && childSlug !== slug;

    // const showInnerHead = !isNewsDetailPage && childSlug.trim() !== '';

    return (
        <>
            {children}
        </>
        // <main className="site_main">
            // {/* {showInnerHead && <InnerHead headData={headData} />} */}
            // {children}
        // </main>
    )
}