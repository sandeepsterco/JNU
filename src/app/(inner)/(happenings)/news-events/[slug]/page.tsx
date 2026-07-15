import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import { notFound } from "next/navigation";

interface SearchParams {
    search?: string;
    duration?: string;
    school?: string;
}

interface FacultyDetailProps {
    searchParams: Promise<SearchParams>;
    params:any
}

export default async function FacultyDetail({ searchParams, params }: FacultyDetailProps) {
    const {slug} = await params;
    const resolvedSearchParams = await searchParams;
    const {data, error} = await apiFetch(`news-events/${slug}`);

    const cmsData = data?.newsAndEvent?.cms ?? [];

    const combinedHTML = Object.values(cmsData).join('') || '';

    return (
        <ReactParserDynamic html={combinedHTML} searchParams={resolvedSearchParams} />
    );
}