import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import "./programsOffered.css";
import ProgramMainData from "./ProgramMainData";

interface SpecialInterface {
  name: string;
  slug: string;
  id: number;
}

export interface ProgramsDataInterface {
  name: string;
  id: number;
  slug: string;
  course_name: string;
  school_name: string;
  specializations: SpecialInterface[];
  duration: string;
}

interface ProgramsOfferedProps {
  searchParams: {
    search?: string;
    school?: string;
    duration?: string;
    degree?: string;
    specialization?: string;
  };
}

export default async function ProgramsOffered({
  searchParams,
}: ProgramsOfferedProps) {
  const { search, school, duration, degree, specialization } = searchParams;
  const currentSlug = await getSlug(0);
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (school) params.set("school", school);
  if (duration) params.set("duration", duration);
  if (degree) params.set("degree", degree);
  if (specialization) params.set("specialization", specialization);

  const { data, error } = await apiFetch(`programs?${params.toString()}`);

  const programsData: ProgramsDataInterface[] = data.data ?? [];

  return (
    <>
      <ProgramMainData
        search={search}
        school={school}
        duration={duration}
        degree={degree}
        specialization={specialization}
        programsData={programsData}
        currentSlug={currentSlug}
        data={data}
      />
    </>
  );
}
