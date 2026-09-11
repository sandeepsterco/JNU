import './leadership.css'
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import { notFound } from "next/navigation";
import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";


export default async function LeadershipDetail({ searchParams }:any) {
    const slug = await getSlug();
    const resolvedSearchParams = await searchParams;
    const { data, error } = await apiFetch(`leadership/${slug}`);

    if (error || !data.status) {
        notFound();
    }

    const combinedHTML = Object.values(data?.data?.cms).join('') || '';
    
    return (
        <ReactParserDynamic html={combinedHTML} searchParams={resolvedSearchParams} />
    );
}