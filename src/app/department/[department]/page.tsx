import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug";
import NotFound from "@/app/not-found";
import SchoolNoData from "@/components/ui/SchoolNoData";
import './department.css'
import '@/styles/common/statsWrapper.css'
import '@/components/homepage/placement/placement.css';
import '@/components/homepage/research/research.css'
import '@/components/homepage/faqs/faq.css'
import '@/components/homepage/happenings/happenings.css'

export default async function DepartmentHomePage({params, searchParams}:{params:Promise<{department:string}>; searchParams:Promise<{search?:string; duration?:string; school?:string;}>}) {
    const {...resolvedSearchParams} = await searchParams;
    const {department} = await params;
    const {data, error} = await apiFetch(`department/${department}`);


    if(error || !data.status) {
        return <NotFound />
    }

    const cmsData = data?.data?.cms ?? {};
    const modularData = data?.data?.modular ?? {};

    const combineHTML = Object.values(cmsData).join('');

    if(!cmsData || cmsData?.length === 0) return <SchoolNoData />

    return (
        <>
            <ReactParserDynamic html={combineHTML} searchParams={resolvedSearchParams} />
        </>
    )

    
}