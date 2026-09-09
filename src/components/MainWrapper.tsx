"use client";

import { usePathname } from "next/navigation";

const getSlugClass = (pathname:any, typeOnly:string) => {
  if (!pathname) return "home";

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "home";
  if (segments.length === 1) return segments[0];

  const first = segments[0];
  const last = segments[segments.length - 1];
  const full = segments.join("-");

  return typeOnly === "true"
    ? `${first}-${last} ${first}-page ${full}`
    : `${first}-${last}`;
};

export default function MainWrapper({ children }:{children:React.ReactNode}) {
  const pathname = usePathname();
  const typeClass = getSlugClass(pathname, "true");

  return <div className={`main-container ${typeClass}`}>{children}</div>;
}
