import apiFetch from "@/lib/api";
import NewsDetailActions from "./NewsDetailActions";
import NoData from "@/components/ui/NoData";
import SchoolHeader from "@/components/header/SchoolHeader";
import "@/components/header/InnerHead/innerHead.css";
import Header from "@/components/header/Header";
import MainWrapper from "@/components/MainWrapper";
import { notFound } from "next/navigation";

interface SearchParams {
  search?: string;
  duration?: string;
  school?: string;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export default async function NewsDetailLayout({
  children,
  params,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  params: any;
  searchParams: Promise<SearchParams>;
}>) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const { data, error } = await apiFetch(`news-events/${slug}`);

  if (error || !data.status) notFound();

  const headData = data?.newsAndEvent?.detail ?? {};
  const cmsData = data?.newsAndEvent?.cms ?? [];
  const combinedHTML = Object.values(cmsData).join("") || "";
  const schoolSlug = resolvedSearchParams?.school;

  return (
    <>
      {schoolSlug ? (
        <SchoolHeader
          parentSlug="school"
          slug={schoolSlug}
          customClass="school_header school_inner_header"
        />
      ) : (
        <Header />
      )}
      <MainWrapper>
        <main className="site_main">
          <section className="inner_head">
            <div className="container">
              <div className="news_detail_header">
                {headData?.date && <p>{formatDate(headData.date)}</p>}
                {headData?.name && (
                  <h1 dangerouslySetInnerHTML={{ __html: headData.name }} />
                )}
                <NewsDetailActions title={headData?.name} />
              </div>
            </div>
          </section>
          {combinedHTML === "" ? <NoData /> : children}
        </main>
      </MainWrapper>
    </>
  );
}
