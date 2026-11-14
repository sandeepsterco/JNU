import apiFetch from "@/lib/api";
import NotFound from "@/app/not-found";
import { getSlug } from "@/lib/getSlug";
import NewsDetailActions from "./NewsDetailActions";
import NoData from "@/components/ui/NoData";


const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

export default async function NewsDetailLayout({ children, params }: Readonly<{ children: React.ReactNode, params: any }>) {
    const { slug } = await params;
    const parentSlug = await getSlug(0);
    const { data, error } = await apiFetch(`news-events/${slug}`);

    if (error || !data.status) {
        return <NotFound />;
    }

    const headData = data?.newsAndEvent?.detail ?? {}
    const cmsData = data?.newsAndEvent?.cms ?? []
    const combinedHTML = Object.values(cmsData).join('') || '';

    return (
        <>
            <section className="inner_head">
                <div className="container">
                    <div className="news_detail_header">
                        {headData?.date && (
                            <p>{formatDate(headData.date)}</p>
                        )}
                        {headData?.name && (
                            <h1 dangerouslySetInnerHTML={{ __html: headData.name }} />
                        )}
                        <NewsDetailActions title={headData?.name} />
                    </div>
                </div>
            </section>
            {combinedHTML === '' ? <NoData /> : children}
        </>
    )
}