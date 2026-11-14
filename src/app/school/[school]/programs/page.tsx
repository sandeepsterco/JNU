import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug";
import '@/components/homepage/placement/placement.css'
import '@/components/homepage/research/research.css'
import '@/components/homepage/alumni/alumni.css'
import '@/components/homepage/happenings/happenings.css'
import '@/components/homepage/faqs/faq.css'
import '@/styles/common/statsWrapper.css'
import SchoolNoData from "@/components/ui/SchoolNoData";
import '../school.css'
import { notFound } from "next/navigation";
import ProgramsOffered from "@/components/parser/programs-offered/ProgramsOffered";

export default async function SchoolPages({params, searchParams}:{params:Promise<{school:string}>; searchParams:Promise<{search?:string; duration?:string; school?:string;}>}) {
    const {...resolvedSearchParams} = await searchParams;
    const {school} = await params;
    const {data, error} = await apiFetch(`school/${school}/programs`);


    if(error || !data.status) {
        return notFound();
    }

    const cmsData = data?.data?.sections ?? {};
    const modularData = data?.data?.modular ?? {};

    const combineHTML = Object.values(cmsData).join('');

    // if(!cmsData || cmsData?.length === 0) return <SchoolNoData />

    return (
        <>
        <ProgramsOffered searchParams={resolvedSearchParams} />
            {/* <ReactParserDynamic html={combineHTML} searchParams={resolvedSearchParams} /> */}
        </>
    )
}