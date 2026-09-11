import apiFetch from "@/lib/api";
import NoData from "@/components/ui/NoData";
import SchoolGrid from "@/components/schools/SchoolGrid";
import {
  LeadershipItem,
} from "@/components/leadership/LeadershipGrid";
import './schools.css'

export default async function SchoolPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { data, error } = await apiFetch(`schools`);

  const SchoolItems: LeadershipItem[] = Array.isArray(data?.data)
    ? data.data
    : [];

  return (
    <section className="leadership_section">
      <div className="container">
        {error ? (
          <NoData heading="Leadership data unavailable" para={error} />
        ) : SchoolItems.length === 0 ? (
          <NoData
            heading="No leadership data found"
            para="Please check back soon."
          />
        ) : (
          <>
            <SchoolGrid items={SchoolItems} />
          </>
        )}
      </div>
    </section>
  );
}