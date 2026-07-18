import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import FAQs from "@/components/homepage/faqs/FAQs";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";

interface SearchParams{
    search?:string;
    duration?:string;
    school?:string;
}

export default async function ProgramDetailPage({params, searchParams}:{params:Promise<{slug:string}>, searchParams:Promise<SearchParams>}){
    const {slug} = await params;
    const resolvedSearchParams = await searchParams;
    const mainSlug = await getSlug(0);
    const {data, error} = await apiFetch(`${mainSlug}/${slug}`);

    if(error || !data.status) throw new Error(`Failed to fetch program detail`);

    const pageData = data?.data;

    const combinedHtml = Object.values(pageData?.cms ?? {}).join('');

    const {faqs:modularFAQ} = pageData?.modular ?? {};

    return(
        <>
            {pageData.cms.length == 0 ? <ComingSoon /> : (
                <>
                    <ReactParserDynamic html={combinedHtml} searchParams={resolvedSearchParams} />
                    <FAQs data={{title:'Frequently Asked Questions'}} modular={modularFAQ} />
                </>
            )}
        </>
    )
}