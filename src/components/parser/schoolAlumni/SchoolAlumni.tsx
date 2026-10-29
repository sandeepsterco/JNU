import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug"
import AlumniSlider from "./AlumniSlider";

export interface AlumniDataInterface {
    name: string;
    batch: string;
    course: string;
    message: string;
    thumbnail: string;
    logo: string;
    video?: string | null;
    slug?: string;
}

interface PageDataInterface {
    data: {
        modular: {
            alumni: AlumniDataInterface[]
        }
    }
}

export default async function SchoolAlumni() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const { data, error } = await apiFetch(`${parentSlug}/${slug}`);

    if (error || !data.status) throw new Error(`Failed to fetch School Alumni`)

    const pageData = (data as PageDataInterface)?.data?.modular?.alumni ?? [];

    if (pageData && pageData?.length === 0) return;

    return (


        <AlumniSlider data={pageData} />

    )
}