import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api";

interface SearchParams{
    search?:string;
    duration?:string;
    school?:string;
}

export default async function DynamicInnerPage({params, searchParams}:{params:Promise<{slug:string}>, searchParams:Promise<SearchParams>}){
    const {slug} = await params;
    const resolvedSearchParams = await searchParams;
    const {data, error} = await apiFetch(`cms/${slug}`);

    const combinedHtml = Object.values(data?.data?.sections ?? {}).join(''); 

    return(
        <ReactParserDynamic html={combinedHtml} searchParams={resolvedSearchParams} />
    )
}