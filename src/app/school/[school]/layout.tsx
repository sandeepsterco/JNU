import MainWrapper from "@/components/MainWrapper";
import SchoolHeader from "@/components/header/SchoolHeader";
import "@/styles/protected/globals.css";

export default async function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}) {
  const { school } = await params;

  return (
    <>
      <SchoolHeader parentSlug="school" slug={school} />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}
