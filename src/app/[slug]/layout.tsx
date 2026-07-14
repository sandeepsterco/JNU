import InnerHead from "@/components/header/InnerHead/InnerHead";
import apiFetch from "@/lib/api";
import NotFound from "../not-found";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import '@/styles/inner.css'

export default async function InnerPageLayout({ children, params }:Readonly< { children: React.ReactNode, params:any }>) {
    const {slug} = await params;

    const {data, error} = await apiFetch(`cms/${slug}`);

    if(error || !data.status){
        return <NotFound />;
    }

    const headData = data?.data

    return (
        <main className="site_main">
            <InnerHead headData={headData} />
            {data.data.sections.length == 0 ? <ComingSoon /> : children}
        </main>
    )
}