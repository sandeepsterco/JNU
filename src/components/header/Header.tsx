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
}

export interface HeaderMenuItem {
  title: string;
  slug: string;
  children: ChildItemInterface[];
}

interface HeaderResponse {
  header: HeaderMenuItem[];
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
  const { data } = await apiFetch(`header`);

  const headerData = (data as HeaderResponse)?.header ?? [];

  return (
    <HeaderScroll>
      <div className="container-fluid">
        <HeaderLogo />

        <HeaderNav headerData={headerData} />
        
      </div>
    </HeaderScroll>
  );
}
