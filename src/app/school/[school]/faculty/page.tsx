import FacultyGrid from "@/components/faculty/FacultyGrid";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";

interface School {
    id: number;
    slug: string;
}

interface SchoolsResponse {
    data: School[];
}

interface PageProps {
    params: Promise<{ school: string }>;
}

export default async function SchoolFacultyList({ params }: PageProps) {
    const { school } = await params;
    const { data: schoolsResponse, error: schoolsError } = await apiFetch("schools");

    if (schoolsError) {
        throw new Error("Failed to load schools");
    }

    const schools = (schoolsResponse as SchoolsResponse | null)?.data ?? [];
    const matchedSchool = schools.find((item) => item.slug === school);

    if (!matchedSchool) {
        notFound();
    }

    const schoolId = String(matchedSchool.id);
    const initialQuery = new URLSearchParams({ school: schoolId });
    const { data: facultyResponse, error: facultyError } = await apiFetch(`faculty?${initialQuery.toString()}`);

    if (facultyError) {
        throw new Error("Failed to load faculty");
    }

    async function loadFaculty(params: { page?: number; search?: string; department?: string }) {
        "use server";
        const query = new URLSearchParams({ school: schoolId });
        if (params.page) query.set("page", String(params.page));
        if (params.search) query.set("search", params.search);
        if (params.department) query.set("department", params.department);

        const { data, error } = await apiFetch(`faculty?${query.toString()}`);
        if (error) throw new Error("Failed to load more faculty");
        return data.data;
    }

    return (
        <FacultyGrid
            key={schoolId}
            data={facultyResponse.data}
            loadFacultyAction={loadFaculty}
            fixedSchoolId={schoolId}
            schoolSlug={school}
        />
    );
}
