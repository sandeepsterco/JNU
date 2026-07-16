import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import PlacementSlider from "./PlacementSlider";

export interface PlacementDataInterface{
    name:string;
    company:string;
    package:string;
    image:string;
}

interface PageDataInterface{
    data:{
        modular:{
            placements:PlacementDataInterface[]
        }
    }
}

export default async function SchoolPlacements() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const {data, error} = await apiFetch(`${parentSlug}/${slug}`);

    if(error || !data.status) throw new Error(`Failed to fetch school placements`)

    const pageData = (data as PageDataInterface)?.data?.modular?.placements ?? [];

    if(pageData && pageData?.length === 0) return;

    return (
        <div className="placement_left">
            <PlacementSlider data={pageData} />
        </div>
    )
}