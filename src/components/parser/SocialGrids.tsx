import HappeningGrid from "@/components/homepage/happenings/HappeningGrid";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import SocialGrid from "../homepage/social/SocialGrid";

export interface SocialDataInterface {
    name: string;
    image: string;
    slug: string;
}

interface PageDataInterface {
    data: {
        modular: {
            ['social-wall']: SocialDataInterface[]
        }
    }
}

export default async function SocialGrids() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const { data, error } = await apiFetch(`${parentSlug}/${slug}`);

    if (error || !data.status) throw new Error(`Failed to fetch Social Grid`)

    const pageData = (data as PageDataInterface)?.data?.modular?.[`social-wall`] ?? [];

    if (pageData && pageData?.length === 0) return;

    return (
        <SocialGrid modular={pageData} />
    )
}