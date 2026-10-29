import apiFetch from "@/lib/api";
import NoData from "@/components/ui/NoData";
import LeadershipGrid, {
  LeadershipItem,
} from "@/components/leadership/LeadershipGrid";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";

export default async function LeadershipManagement({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } = await apiFetch(`leadership?page=${currentPage}`);

  const leadershipItems: LeadershipItem[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const pagination = data?.data;

  return (
    <section className="leadership_section">
      <div className="container">
        {error ? (
          <NoData heading="Leadership data unavailable" para={error} />
        ) : leadershipItems.length === 0 ? (
          <NoData
            heading="No leadership data found"
            para="Please check back soon."
          />
        ) : (
          <>
            <LeadershipGrid items={leadershipItems} />
            <PaginationWrapper
              currentPage={pagination?.current_page || 1}
              totalPages={pagination?.last_page || 1}
            />
          </>
        )}
      </div>
    </section>
  );
}