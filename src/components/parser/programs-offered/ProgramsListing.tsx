"use client";

import NoData from "@/components/ui/NoData";
import type { ProgramsDataInterface } from "./ProgramsOffered";
import Link from "next/link";
import { APPLY_NOW, BASE_URL } from "@/config/config";
import { loadMorePrograms } from "@/actions/loadMorePrograms";
import { useEffect, useState, useTransition } from "react";
import Loading from "@/app/loading";

interface Filters {
  search?: string;
  school?: string;
  duration?: string;
  degree?: string;
  specialization?: string;
}

export default function ProgramsListing({
  programsData,
  currentSlug,
  filters,
  hasMoreInitially,
  loading
}: {
  programsData: ProgramsDataInterface[];
  currentSlug: string;
  filters: Filters;
  hasMoreInitially: boolean;
  loading:Boolean
}) {
  const [items, setItems] = useState<ProgramsDataInterface[]>(programsData);
  const [hasMore, setHasMore] = useState(hasMoreInitially);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setItems(programsData);
    setHasMore(hasMoreInitially);
    setPage(1);
  }, [programsData, hasMoreInitially]);

  const handleLoadMore = () => {
    startTransition(async () => {
      const nextPage = page + 1;

      const result = await loadMorePrograms(nextPage, filters);
      setItems((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(result.currentPage ?? nextPage);
    });
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="progrem_right">


      {items?.length == 0 && <NoData />}


      <div className="program_list_grid">
        {items?.length > 0 &&
          items.map((item, idx) => (
            <div key={item.id+idx} className="program_grid_bx">
              <div className="program_bx_left">
                <h4>
                  <Link href={`${BASE_URL}${currentSlug}/${item.slug}`}>
                    {item.name}
                  </Link>
                </h4>
                <ul className="graduate_bx">
                  {item?.course_name && <li>{item.course_name}</li>}
                  {item?.school_name && <li>{item.school_name}</li>}
                </ul>
                {item?.specializations && item?.specializations?.length > 0 && (
                  <ul className="specialization_flex">
                    <li>Specialization Offered:</li>
                    {item.specializations.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                )}

                {item?.duration && (
                  <h5>
                    <strong>Duration</strong> {item.duration}
                  </h5>
                )}
              </div>
              <div className="program_bx_right">
                <h4>Eligibility</h4>
                <h5>Fee Structure</h5>
                <Link href={APPLY_NOW ?? '/apply-now'} className="apply_now">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
      </div>

      {hasMore && (
        <div className="load_more_btn">
          <button
            className="load_btn"
            onClick={handleLoadMore}
            disabled={isPending}
          >
            {" "}
            {isPending ? "Loading..." : "Load More"}
            <span>
              <img
                src="/images/icons/nav-arrow-next.svg"
                className="img-fluid"
                alt="arrow"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
