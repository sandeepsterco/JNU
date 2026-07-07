import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import '@/styles/inner.css'
import NotFound from "../not-found";

export default async function InnerPageLayout({ children }: { children: React.ReactNode }) {
    // Use first path segment so nested routes (e.g. /faculty/[slug]) still load section CMS head data
    const slug = await getSlug(0);
    const {data, error} = await apiFetch(`cms/${slug}`);

    // if(error){
    //     return <NotFound />;
    // }

    const headData = data?.data

    return (
        <main className="site_main">
            <InnerHead headData={headData} />
            {children}
        </main>
    )
}