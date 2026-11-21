import Link from "next/link";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import apiFetch from "@/lib/api";
import "./header.css";
import HeaderScroll from "./HeaderScroll";
import HeaderNav from "./HeaderNav";
import type { HamburgerMenuItem } from "./Header";
import SchoolFilter from "../parser/schoolFilter/SchoolFilter";

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

interface MainHeaderResponse {
  header: HeaderMenuItem[];
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
        className="img-fluid main_logo"
        alt="JNU"
        loading="eager"
        fetchPriority="high"
      />
      <Image
        src="/images/naacgrade-a-logo.webp"
        width={188}
        height={61}
        className="img-fluid main_logo"
        alt="JNU"
        loading="eager"
        fetchPriority="high"
      />

      <Image
        src="/images/logo_white.webp"
        width={596}
        height={68}
        className="img-fluid logo_white"
        alt="JNU"
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
};

export default async function SchoolHeader({parentSlug, slug, customClass}:SchoolHeaderInterface) {
  const [headerResponse, sidebarResponse, mainHeaderResponse] = await Promise.all([
    apiFetch(`${parentSlug}/${slug}/navigation?q=header`),
    apiFetch(`${parentSlug}/${slug}/navigation?q=sidebar`),
    apiFetch("header"),
  ]);

  const schoolHeaderData = (headerResponse.data as HeaderResponse)?.data ?? [];
  const mainHeaderData = (mainHeaderResponse.data as MainHeaderResponse)?.header ?? [];
  const admissionMenu = mainHeaderData.find((item) =>
    item.slug?.toLowerCase().includes("admission")
  );
  const headerData = admissionMenu
    ? [
        {
          title: "Home",
          slug: `${slug}`,
          overwrite_url: "",
          target_blank: "",
          display_order: 0,
          children:[]
        },
        ...schoolHeaderData.filter(
          (item) => !item.slug?.toLowerCase().includes("admission")
        ),
        admissionMenu,
      ]
    : schoolHeaderData;
  const sidebarData = (sidebarResponse.data as SidebarResponse)?.data ?? [];
  const schoolId = (headerResponse.data as HeaderResponse)?.schoolId;

  return (
    <HeaderScroll customClass={customClass}>
      <div className="container-fluid">
        <div className="school_header_logo">
          <HeaderLogo />
          <div className="school_filter_wrap">
            <div className="school_filter">
              <p>School</p>
              <SchoolFilter currentSlug={slug} />
            </div>
          </div>
        </div>

        
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
