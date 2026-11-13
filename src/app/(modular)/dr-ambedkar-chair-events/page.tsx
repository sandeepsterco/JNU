import ReactParserDynamic from "@/components/common/reactParser/ReactParserDynamic";
import apiFetch from "@/lib/api";

interface SearchParams {
  search?: string;
  duration?: string;
  school?: string;
  degree?: string;
  specialization?: string;
}

export default async function AmbedkarChairEventPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { data, error } = await apiFetch(`modular/dr-ambedkar-chair-events`);

  const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");

  return (
    <div className="startup_ecomain hero_bg_pattern">
      <ReactParserDynamic
        html={combinedHtml}
        searchParams={resolvedSearchParams}
      />
    </div>
  );
}
