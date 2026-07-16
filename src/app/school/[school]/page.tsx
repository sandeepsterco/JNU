import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug";
import '@/styles/school.css'
import '@/components/homepage/placement/placement.css'
import '@/components/homepage/research/research.css'
import '@/components/homepage/alumni/alumni.css'
import '@/components/homepage/happenings/happenings.css'

export default async function SchoolHomePage({params, searchParams}:{params:Promise<{school:string}>; searchParams:Promise<{search?:string; duration?:string; school?:string;}>}) {
    const {...resolvedSearchParams} = await searchParams;
    const {school} = await params;
    const {data, error} = await apiFetch(`school/${school}`);


    if(error || !data.status) throw new Error(`Failed to fetch School Homepage`);

    const cmsData = data?.data?.cms ?? {};
    const modularData = data?.data?.modular ?? {};

    const combineHTML = Object.values(cmsData).join('');

    return (
        <>
            <ReactParserDynamic html={combineHTML} searchParams={resolvedSearchParams} />
        </>
    )
}