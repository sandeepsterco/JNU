import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api"
import { getSlug } from "@/lib/getSlug";
import Link from "next/link";

interface PageDataInterface {
    data: DataInterface[]
}

interface DataInterface {
    id: number;
    name: string;
    slug: string;
}
export default async function SchoolDepartments() {
    const school = await getSlug();
    const { data, error } = await apiFetch(`departments-by-school/${school}`);

    if (error || !data.status) throw new Error(`Failed to fetch Departments`);
    const departments = (data as PageDataInterface)?.data ?? [];

    return (
        <ul className="our_department_list">
            {departments.map((department) => (
                <li key={department.id}>
                    <span>{department.name}</span>
                    <figure><img src="/images/icons/nav-arrow-next.svg" alt="next arrow" /></figure>
                    <Link href={`${BASE_URL}department/${department.slug}`} className="overlap_btn"></Link>
                </li>
            ))}
        </ul>
    )
}