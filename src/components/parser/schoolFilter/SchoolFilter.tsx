import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import SchoolDropdown from "./SchoolDropdown";

export interface DataInterface {
    id: number;
    name: string;
    slug: string;
}

interface PageDataInterface {
    data: DataInterface[]
}

export default async function SchoolFilter() {
    const parentSlug = await getSlug(0);
    const currentSlug = await getSlug();

    const { data, error } = await apiFetch(parentSlug.includes('school') ? `schools` : '');

    if (error || !data.status) throw new Error(`Failed to fetch School`)

    const pageData = (data as PageDataInterface)?.data ?? [];

    if (!pageData || pageData.length === 0) return null;

    return <SchoolDropdown data={pageData} currentSlug={currentSlug} />;
}