import Link from "next/link";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import apiFetch from "@/lib/api";
import "./header.css";
import HeaderScroll from "./HeaderScroll";
import HeaderNav from "./HeaderNav";

export interface ChildItemInterface {
  title: string;
  slug: string;
  overwrite_url: string;
  target_blank: string;
  display_order?:number;
  children?: ChildItemInterface[];
}

export interface HeaderMenuItem {
  title: string;
  slug: string;
  overwrite_url: string;
  target_blank: string;
  display_order?:number;
  children?: ChildItemInterface[];
}

export interface HamburgerMenuItem {
  title: string;
  slug: string;
  children?: HamburgerMenuItem[];
}

interface HeaderResponse {
  header: HeaderMenuItem[];
}

interface SidebarResponse {
  sidebar: HamburgerMenuItem[];
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

export default async function Header() {
  const [{ data: headerResponse }, { data: sidebarResponse }] =
    await Promise.all([apiFetch(`header`), apiFetch(`sidebar`)]);

  const headerData = (headerResponse as HeaderResponse)?.header ?? [];
  const sidebarData = (sidebarResponse as SidebarResponse)?.sidebar ?? [];

  return (
    <HeaderScroll>
      <div className="container-fluid">
        <HeaderLogo />

        <HeaderNav headerData={headerData} sidebarData={sidebarData} />
        
      </div>
    </HeaderScroll>
  );
}
