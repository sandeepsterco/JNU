import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsList from "./NewsList";
import HappeningsWrapper from "../(common)/(inner)/(happenings)/HappeningsWrapper";
import NewsFilter from "./NewsFilter";
import InnerHead from "@/components/header/InnerHead/InnerHead";
import { notFound } from "next/navigation";
import Header from "@/components/header/Header";

interface DataInterface {
  name: string;
  date: string;
  id: number;
  image: string;
  slug: string;
}

interface FeaturedNewsInterface {
  name: string;
  date: string;
  image: string;
  video?: string;
  featured: string;
  display_order?: string;
  schools?: string[] | null;
  departments?: string[] | null;
  slug: string;
  id: number;
}

interface NewsResponseInterface {
  newsAndEvents: {
    data: DataInterface[];
    next_page_url: string | null;
  };
  featuredNewsAndEvents: FeaturedNewsInterface[];
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsEventsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const { data: cmsData, error: cmsError } = await apiFetch(`cms/news-events`);

  if (cmsError) notFound();

  const headData = cmsData?.data;

  const school = typeof params.school === "string" ? params.school : undefined;
  const department =
    typeof params.department === "string" ? params.department : undefined;
  const date = typeof params.date === "string" ? params.date : undefined;

  const query = new URLSearchParams();
  if (school) query.set("school", school);
  if (department) query.set("department", department);
  if (date) query.set("date", date);

  const { data, error } = await apiFetch(
    `news-events${query.toString() ? `?${query.toString()}` : ""}`,
  );

  if (error) {
    throw new Error("Failed to load news and events");
  }

  const [
    { data: schoolData, error: schoolError },
    { data: departmentData, error: departmentError },
  ] = await Promise.all([apiFetch(`schools`), apiFetch(`departments`)]);

  const slug = await getSlug();
  const newsAndEvents = (data as NewsResponseInterface)?.newsAndEvents;
  const featuredNews =
    (data as NewsResponseInterface)?.featuredNewsAndEvents ?? [];

  return (
    <>
    <Header />
      <main className="site_main">
        <InnerHead headData={headData} />

        <HappeningsWrapper
          filters={
            <NewsFilter
              schools={schoolData?.data ?? []}
              departments={departmentData?.data ?? []}
            />
          }
        >
          {featuredNews.length > 0 && (
            <FeaturedNews data={featuredNews} slug={slug} />
          )}

          {newsAndEvents?.data?.length === 0 ? (
            <div className="news_empty_state">
              <p>
                No news or events found
                {school || department || date
                  ? " for the selected filters."
                  : "."}
              </p>
            </div>
          ) : (
            <NewsList
              key={`${school ?? ""}-${department ?? ""}-${date ?? ""}`}
              initialData={newsAndEvents?.data ?? []}
              slug={slug}
              filters={{ school, department, date }}
              hasMoreInitially={Boolean(newsAndEvents?.next_page_url)}
            />
          )}
        </HappeningsWrapper>
      </main>
    </>
  );
}
