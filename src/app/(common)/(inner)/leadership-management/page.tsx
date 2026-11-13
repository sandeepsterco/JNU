import apiFetch from "@/lib/api";
import NoData from "@/components/ui/NoData";
import LeadershipGrid, {
  LeadershipItem,
} from "@/components/leadership/LeadershipGrid";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";

export default async function LeadershipManagement({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [{ data, error }, {data:cmsData}] = await Promise.all([
    apiFetch(`leadership?page=${currentPage}`),
    apiFetch(`cms/leadership-management`),
  ]);

  const leadershipItems: LeadershipItem[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const pagination = data?.data;

  const combinedHTML = Object.values(cmsData?.data?.sections).join('') || '';

  return (
    <>
      <section className="leadership_section hero_bg_pattern">
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

      <ReactParserDynamic html={combinedHTML}  />

    </>
  );
}