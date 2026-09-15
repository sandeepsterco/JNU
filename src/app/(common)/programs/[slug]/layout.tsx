import NotFound from "@/app/not-found";
import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import '@/styles/inner.css'

export default async function ProgramInnerPageLayout({ children, params }: { children: React.ReactNode, params:Promise<{slug:string}> }) {
    const {slug} = await params;
    const mainSlug = await getSlug(0);
    const {data, error} = await apiFetch(`${mainSlug}/${slug}`);

    if(error || !data.status){
        return <NotFound />;
    }

    const headData = data?.data?.detail;

    return (
        <main className="site_main">
            <InnerHead headData={headData} />
            {children}
        </main>
    )
}