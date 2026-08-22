import apiFetch from "@/lib/api";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import { getSlug } from "@/lib/getSlug";
import ProgramSearch from "./ProgramSearch";
import NoData from "@/components/ui/NoData";
import ProgramsLeftFilter from "./ProgramsLeftFilter";
import "./programsOffered.css";
import ProgramsListing from "./ProgramsListing";
import { loadMorePrograms } from "@/actions/loadMorePrograms";

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
  };
}

export default async function ProgramsOffered({
  searchParams,
}: ProgramsOfferedProps) {
  const { search, school, duration, degree } = searchParams;
  const currentSlug = await getSlug(0);
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (school) params.set("school", school);
  if (duration) params.set("duration", duration);
  if (degree) params.set("degree", degree);

  const { data, error } = await apiFetch(`programs?${params.toString()}`);

  const programsData: ProgramsDataInterface[] = data.data ?? [];

  return (
    <>
      <div className="prg_search">
        <ProgramSearch />
      </div>
      <div className="program_listing_grid">
        <div className="progrem_left">
          <ProgramsLeftFilter />
        </div>

        <ProgramsListing programsData={programsData} currentSlug={currentSlug} filters={{ search, school, duration, degree }} hasMoreInitially={Boolean(data?.next_page_url)} />
      </div>
    </>
  );
}
