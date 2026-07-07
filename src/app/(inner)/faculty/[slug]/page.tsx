import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import { notFound } from "next/navigation";

export default async function FacultyDetail(){
    const slug = await getSlug();
    const {data, error} = await apiFetch(`faculty/${slug}`)

    if(error || !data.status){
        notFound();
    }

    const combinedHTML = Object.values(data?.faculty?.cms).join('') || '';

    return(
        <ReactParserDynamic html={combinedHTML} />
    )
}