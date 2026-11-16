import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import NotFound from "@/app/not-found";
import '@/styles/inner.css'

export default async function AmbedkarChairLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(0);
    const childSlug = await getSlug(-1);
    const {data, error} = await apiFetch(`modular/dr-ambedkar-chair-events`);

    if(error){
        return <NotFound />;
    }

    const headData = data?.data

    const isNewsDetailPage = slug === 'news-events' && childSlug.trim() !== '' && childSlug !== slug;

    const showInnerHead = !isNewsDetailPage && childSlug.trim() !== '';

    return (
        <main className="site_main">
            <InnerHead headData={headData} />
            {children}
        </main>
    )
}