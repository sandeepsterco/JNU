import Header from "@/components/header/Header";
import MainWrapper from "@/components/MainWrapper";

export default function ModularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}
