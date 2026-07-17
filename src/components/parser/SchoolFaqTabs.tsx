import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import FaqTabs from "../homepage/faqs/FaqTabs";

export interface FaqDataInterface {
    question: string;
    answer: string;
    type: string;
    slug: string;
}

interface PageDataInterface {
    data: {
        modular: {
            faqs: FaqDataInterface[]
        }
    }
}

export default async function SchoolFaqTabs() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const { data, error } = await apiFetch(`${parentSlug}/${slug}`);

    if (error || !data.status) throw new Error(`Failed to fetch Faqs`)

    const pageData = (data as PageDataInterface)?.data?.modular?.faqs ?? [];

    if (pageData && pageData?.length === 0) return;

    return (
        <FaqTabs modular={pageData} />
    )
}