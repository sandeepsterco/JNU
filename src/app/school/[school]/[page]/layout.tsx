import MainWrapper from "@/components/MainWrapper";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import InnerHead from "@/components/header/InnerHead/InnerHead";
import SchoolHeader from "@/components/header/SchoolHeader";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";
import "@/styles/protected/globals.css";
import '@/styles/inner.css'

export default async function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string; page: string }>;
}) {
  const { school, page } = await params; 

  const {data, error} = await apiFetch(`school/${school}/${page}`);

  if(error || !data.status){
      return notFound();
  }

  const headData = data?.data

  return (
    <>
      <SchoolHeader parentSlug="school" slug={school} customClass="school_inner_header" />
      <MainWrapper>
        <main className="site_main">
          <InnerHead headData={headData} />
          {data.data?.sections?.length == 0 ? <ComingSoon /> : children}
        </main>
      </MainWrapper>
    </>
  );
}

