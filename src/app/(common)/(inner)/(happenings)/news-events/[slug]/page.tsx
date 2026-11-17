import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";
import SchoolHeader from "@/components/header/SchoolHeader";
import BackBtn from "@/components/common/BackBtn";

interface SearchParams {
  search?: string;
  duration?: string;
  school?: string;
}

interface FacultyDetailProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

export default async function FacultyDetail({
  searchParams,
  params,
}: FacultyDetailProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const { data, error } = await apiFetch(`news-events/${slug}`);
  if (error || !data?.status) notFound();

  const cmsData = data?.newsAndEvent?.cms ?? [];

  const combinedHTML = Object.values(cmsData).join("") || "";
  const schoolSlug = resolvedSearchParams.school;

  return (
    <>
      {schoolSlug && (
        <SchoolHeader
          parentSlug="school"
          slug={schoolSlug}
          customClass="school_header school_inner_header"
        />
      )}
      <ReactParserDynamic
        html={combinedHTML}
        searchParams={resolvedSearchParams}
      />

      <div className="container">
        <BackBtn />
      </div>
    </>
  );
}
