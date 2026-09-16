import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api";
import MediaGrid from "@/components/media-coverage/MediaGrid";

interface MediaInterface {
  title: string;
  image: string;
  date: string;
  slug: string;
  id: number;
}

interface MediaCoverageInterface {
  data:{
    data:MediaInterface[],
    next_page_url : null | string;
  }
}

export default async function MediaCoveragePage() {
  const { data, error } = await apiFetch(
    `media-coverage`,
  );

  if (error) {
    throw new Error("Failed to load Galleries");
  }

  const mediaData = (data as MediaCoverageInterface)?.data ?? {
    data: [],
    next_page_url: null,
  };

  return (
    <div className="gallery_sec leadership_detail_section">
      <div className="container">
        {mediaData?.data?.length === 0 && <NoData />}
        {mediaData?.data?.length > 0 && (
          <MediaGrid
            mediaData={mediaData.data}
            hasMoreInitially={Boolean(mediaData?.next_page_url)}
          />
        )}
      </div>
    </div>
  );
}
