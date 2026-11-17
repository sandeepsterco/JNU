import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import { notFound } from "next/navigation";
import SchoolHeader from "@/components/header/SchoolHeader";

interface SearchParams {
    search?: string;
    duration?: string;
    school?: string;
}

interface FacultyDetailProps {
    searchParams: Promise<SearchParams>;
}

export default async function FacultyDetail({ searchParams }: FacultyDetailProps) {
    const slug = await getSlug();
    const resolvedSearchParams = await searchParams;
    const { data, error } = await apiFetch(`faculty/${slug}`);

    if (error || !data.status) {
        notFound();
    }

    const combinedHTML = Object.values(data?.faculty?.cms).join('') || '';
    const school = resolvedSearchParams.school;

    return (
        <>
            {school && <SchoolHeader parentSlug="school" slug={school} customClass="school_inner_header school_header" />}
            <ReactParserDynamic html={combinedHTML} searchParams={resolvedSearchParams} />
        </>
    );
}