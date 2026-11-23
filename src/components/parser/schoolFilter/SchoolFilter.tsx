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

interface SchoolFilterProps {
    currentSlug?: string;
}

export default async function SchoolFilter({ currentSlug: selectedSlug }: SchoolFilterProps) {
    const parentSlug = await getSlug(0);
    const fallbackSlug = parentSlug === "school" ? await getSlug(1) : await getSlug();
    const currentSlug = selectedSlug ?? fallbackSlug;

    const { data, error } = await apiFetch(`schools`);

    if (error || !data.status) throw new Error(`Failed to fetch School`)

    const pageData = (data as PageDataInterface)?.data ?? [];

    if (!pageData || pageData.length === 0) return null;

    return <SchoolDropdown data={pageData} currentSlug={currentSlug} />;
}