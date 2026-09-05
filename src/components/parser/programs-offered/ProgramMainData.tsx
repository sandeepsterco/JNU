"use client";

import { useState } from "react";
import ProgramsLeftFilter from "./ProgramsLeftFilter";
import ProgramsListing from "./ProgramsListing";
import type { ProgramsDataInterface } from "./ProgramsOffered";
import ProgramSearch from "./ProgramSearch";

interface ProgramPropsInterface {
  search?: string;
  school?: string;
  duration?: string;
  degree?: string;
  specialization?: string;
  programsData: ProgramsDataInterface[];
  currentSlug: string;
  data: any;
}

export default function ProgramMainData({
  search,
  school,
  duration,
  degree,
  specialization,
  programsData,
  currentSlug,
  data,
}: ProgramPropsInterface) {
  const [loading, isDataLoading] = useState(false);

  return (
    <>
      <div className="prg_search">
        <ProgramSearch isDataLoading={isDataLoading} />
      </div>

      <div className="program_listing_grid">
        <div className="progrem_left">
          <ProgramsLeftFilter isDataLoading={isDataLoading} />
        </div>

        <ProgramsListing
          key={`${search ?? ""}-${school ?? ""}-${duration ?? ""}-${degree ?? ""}-${specialization ?? ""}`}
          programsData={programsData}
          currentSlug={currentSlug}
          filters={{ search, school, duration, degree, specialization }}
          hasMoreInitially={Boolean(data?.next_page_url)}
          loading={loading}
        />
      </div>
    </>
  );
}
