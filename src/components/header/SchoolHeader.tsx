import Link from "next/link";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import apiFetch from "@/lib/api";
import "./header.css";
import HeaderScroll from "./HeaderScroll";
import HeaderNav from "./HeaderNav";
import type { HamburgerMenuItem } from "./Header";

export interface ChildItemInterface {
  title: string;
  slug: string;
  overwrite_url: string;
  target_blank: string;
}

export interface HeaderMenuItem {
  title: string;
  slug: string;
  display_order?:number;
  overwrite_url: string;
  target_blank: string;
  children?: ChildItemInterface[];
}

interface HeaderResponse {
  data: HeaderMenuItem[];
  schoolId?: number;
}

interface SidebarResponse {
  data: HamburgerMenuItem[];
}

interface SchoolHeaderInterface{
  parentSlug?:string;
  slug?:string;
  customClass?:string;
}

const HeaderLogo = () => {
  return (
    <Link href={BASE_URL ?? "/"} className="site_navbar">
      <Image
        src="/images/logo.webp"
        width={344}
        height={63}
        className="img-fluid"
        alt="JNU"
        loading="eager"
        fetchPriority="high"
      />
      <Image
        src="/images/naacgrade-a-logo.webp"
        width={188}
        height={61}
        className="img-fluid"
        alt="JNU"
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
};

export default async function SchoolHeader({parentSlug, slug, customClass}:SchoolHeaderInterface) {
  const [headerResponse, sidebarResponse] = await Promise.all([
    apiFetch(`${parentSlug}/${slug}/navigation?q=header`),
    apiFetch(`${parentSlug}/${slug}/navigation?q=sidebar`),
  ]);

  const headerData = (headerResponse.data as HeaderResponse)?.data ?? [];
  const sidebarData = (sidebarResponse.data as SidebarResponse)?.data ?? [];
  const schoolId = (headerResponse.data as HeaderResponse)?.schoolId;

  return (
    <HeaderScroll customClass={customClass}>
      <div className="container-fluid">
        <HeaderLogo />

        <HeaderNav
          parentSlug={parentSlug}
          headerData={headerData}
          sidebarData={sidebarData}
          schoolId={schoolId}
        />
        
      </div>
    </HeaderScroll>
  );
}
