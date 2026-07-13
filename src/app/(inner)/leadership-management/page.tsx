import apiFetch from "@/lib/api";
import NoData from "@/components/ui/NoData";
import LeadershipGrid, {LeadershipItem} from "@/components/leadership/LeadershipGrid";

export default async function LeadershipManagement() {
  const { data, error } = await apiFetch("leadership");

  const leadershipItems: LeadershipItem[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

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
          <LeadershipGrid items={leadershipItems} />
        )}
      </div>
    </section>
  );
}