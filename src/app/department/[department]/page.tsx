import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug";
import NotFound from "@/app/not-found";
import '@/components/homepage/placement/placement.css'
import '@/components/homepage/research/research.css'
import '@/components/homepage/alumni/alumni.css'
import '@/components/homepage/happenings/happenings.css'
import '@/components/homepage/faqs/faq.css'
import '@/styles/school.css'

export default async function DepartmentHomePage({params, searchParams}:{params:Promise<{department:string}>; searchParams:Promise<{search?:string; duration?:string; school?:string;}>}) {
    const {...resolvedSearchParams} = await searchParams;
    const {department} = await params;
    const {data, error} = await apiFetch(`school/${department}`);


    // if(error || !data.status) {
    //     return <NotFound />
    // }

    // const cmsData = data?.data?.cms ?? {};
    // const modularData = data?.data?.modular ?? {};

    // const combineHTML = Object.values(cmsData).join('');

    // if(!cmsData || cmsData?.length === 0) return <SchoolNoData />

    // return (
    //     <>
    //         <ReactParserDynamic html={combineHTML} searchParams={resolvedSearchParams} />
    //     </>
    // )

    
}