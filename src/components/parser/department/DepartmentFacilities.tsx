import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import DepartmentFacilitiesSlider from "./DepartmentFacilitiesSlider";

interface PageDataInterface {
  data: {
    modular: {
      facilities: FacilityInterface[];
    };
  };
}

export interface FacilityInterface {
  name: string;
  image: string;
  slug: string;
}

export default async function DepartmentFacilities() {
  const parentSlug = await getSlug(0);
  const departmentSlug = await getSlug();
  const { data, error } = await apiFetch(`${parentSlug}/${departmentSlug}`);

  if (error || !data.status)
    throw new Error(`Failed to fetch Department Facilities`);

  const departmentFacilities =
    (data as PageDataInterface)?.data?.modular?.facilities ?? [];

  if (departmentFacilities.length === 0) return null;

  return <DepartmentFacilitiesSlider facilities={departmentFacilities} />;
}