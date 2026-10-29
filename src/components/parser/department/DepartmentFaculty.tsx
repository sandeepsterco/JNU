import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";

import DepartmentFacultySlider from "./Departmentfacultyslider";

interface PageDataInterface {
  data: {
    modular: {
      faculty: FacultyInterface[];
    };
  };
}

export interface FacultyInterface {
  name: string;
  image: string;
  slug: string;
  designation?: string;
}

export default async function DepartmentFaculty() {
  const departmentSlug = await getSlug();
  const { data, error } = await apiFetch(`department/${departmentSlug}`);

  if (error || !data.status)
    throw new Error(`Failed to fetch Department Faculty`);

  const departmentFacultyData =
    (data as PageDataInterface)?.data?.modular?.faculty ?? [];

  if (departmentFacultyData.length === 0) return null;

  return <DepartmentFacultySlider faculty={departmentFacultyData} />;
}