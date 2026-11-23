import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api";
import "@/components/homepage/placement/placement.css";
import "@/components/homepage/research/research.css";
import "@/components/homepage/alumni/alumni.css";
import "@/components/homepage/happenings/happenings.css";
import "@/components/homepage/faqs/faq.css";
import "@/styles/common/statsWrapper.css";
import "../school.css";
import { notFound } from "next/navigation";
import SchoolAlumniGrid, {
  type SchoolAlumni,
} from "@/components/parser/schoolAlumni/SchoolAlumniGrid";

export default async function SchoolAlumniPage({
  params,
  searchParams,
}: {
  params: Promise<{ school: string }>;
  searchParams: Promise<{
    search?: string;
    duration?: string;
    school?: string;
  }>;
}) {
  const { ...resolvedSearchParams } = await searchParams;
  const { school } = await params;

  const [{ data, error }, {data:alumniResponse}] = await Promise.all([
    apiFetch(`school/${school}/alumni-network`),
    apiFetch(`schools/${school}/alumni`)
  ]);

  if (error || !data.status) {
    return notFound();
  }

  const cmsData = data?.data?.sections ?? {};

  const combineHTML = Object.values(cmsData).join("");

  //   if (!cmsData || cmsData?.length === 0) return <SchoolNoData />;

  const alumniData = (alumniResponse?.alumni as SchoolAlumni[]) || [];

  return (
    <>
    {alumniData && alumniData.length > 0 && (
        <SchoolAlumniGrid alumni={alumniData} school={school} />
    )}


      {/* {combineHTML && (
        <ReactParserDynamic
          html={combineHTML}
          data={data}
          searchParams={resolvedSearchParams}
        />
      )} */}
    </>
  );
}
