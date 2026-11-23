import MainWrapper from "@/components/MainWrapper";
import InnerHead from "@/components/header/InnerHead/InnerHead";
import SchoolHeader from "@/components/header/SchoolHeader";
import "@/styles/protected/globals.css";
import "@/styles/inner.css";
import "../school.css";
import "./testimonials.css";

export default async function TestimonialsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}) {
  const { school } = await params;

  return (
    <>
      <SchoolHeader
        parentSlug="school"
        slug={school}
        customClass="school_header school_inner_header"
      />
      <MainWrapper>
        <main className="site_main">
          <InnerHead headData={{ name: "Testimonials" }} />
          {children}
        </main>
      </MainWrapper>
    </>
  );
}
