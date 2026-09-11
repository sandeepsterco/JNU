"use client";
import { usePathname } from "next/navigation";

export default function HappeningsWrapper({
  children,
  filters,
}: {
  children: React.ReactNode;
  filters: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // adjust index logic to match your slug/childSlug equivalent
  const slug = segments[0];
  const childSlug = segments[1] ?? "";

  const isNewsDetailPage =
    slug === "news-events" && childSlug.trim() !== "" && childSlug !== slug;

    if (isNewsDetailPage) {
      return <>{children}</>;
    }

  return (
    <div className="gallery_sec leadership_detail_section">
      <div className="container">
        {filters}
        {children}
      </div>
    </div>
  );
}