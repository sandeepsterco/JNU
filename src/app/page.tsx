import HomeBanner from "@/components/homepage/banner/Banner";
import HomeStats from "@/components/homepage/Stats/Stats";
import StudyJNU from "@/components/homepage/studyJNU/StudyJNU";
import WhyChoose from "@/components/homepage/whyChoose/WhyChoose";

export default function Home() {
  return (
    <main className="site_main">
      <HomeBanner />
      <HomeStats />
      <StudyJNU />
      <WhyChoose />
    </main>
  );
}
