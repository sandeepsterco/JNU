import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import Image from "next/image";

export interface ResearchDataInterface {
    name:string;
    image:string;
    short_description:string;
}

interface PageDataInterface {
    data: {
        modular: {
            research: ResearchDataInterface[]
        }
    }
}

export default async function SchoolResearch() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const { data, error } = await apiFetch(`${parentSlug}/${slug}`);

    if (error || !data.status) throw new Error(`Failed to fetch School Research`)

    const pageData = (data as PageDataInterface)?.data?.modular?.research ?? [];

    if (pageData && pageData?.length === 0) return;

    return (
        <div className="research_grid">
            {pageData?.map((item, idx)=>(
                <div key={idx} className="research_Bx">
                    <figure>
                        <Image src={item?.image ?? '/images/placeholders/school-research.webp'} className="img-fluid" alt={item.name} width={475} height={340} loading="lazy" />
                    </figure>
                    <figcaption>
                        {item?.name && (
                            <h4 dangerouslySetInnerHTML={{__html:item.name}} />
                        )}
                        {item?.short_description && (
                            <p>{item.short_description}</p>
                        )}
                    </figcaption>
                </div>
            ))}
            
        </div>
    )
}