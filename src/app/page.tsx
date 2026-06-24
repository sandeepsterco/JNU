import HomeAlumni from "@/components/homepage/alumni/Alumni";
import HomeBanner from "@/components/homepage/banner/Banner";
import Experience from "@/components/homepage/experience/Experience";
import FAQs from "@/components/homepage/faqs/FAQs";
import Happenings from "@/components/homepage/happenings/Happenings";
import HomePlacement from "@/components/homepage/placement/Placement";
import HomeResearch from "@/components/homepage/research/Research";
import HomeSocial from "@/components/homepage/social/Social";
import HomeStats from "@/components/homepage/Stats/Stats";
import StudyJNU from "@/components/homepage/studyJNU/StudyJNU";
import WhyChoose from "@/components/homepage/whyChoose/WhyChoose";
import apiFetch from "@/lib/api";
import { cache } from "react";

const getHomeData = cache(async () => {
  return await apiFetch(`home-page`);
})

export default async function Home() {
  const { data, error } = await getHomeData();

  if (!data) {
    return <div className="min-h-[100vh] flex items-center justify-center">
      <h1 className="md:!text-[5rem] !text-[2rem] md:!font-bold !font-normal">Something wrong...</h1>
    </div>
  }

  const {hero} = data?.data;

  console.log('home data', data);

  return (
    <main className="site_main">
      <HomeBanner data={hero} />
      <HomeStats />
      <StudyJNU />
      <WhyChoose />
      <HomePlacement />
      <HomeResearch />
      <Experience />
      <HomeAlumni />
      <Happenings />
      <HomeSocial />
      <FAQs />
    </main>
  );
}
