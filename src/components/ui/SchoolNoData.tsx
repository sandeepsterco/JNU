import { APPLY_NOW, BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import Image from "next/image";
import Link from "next/link";
import SchoolDropdown from "../parser/schoolFilter/SchoolDropdown";

export default async function SchoolNoData() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();
    const {data, error} = await apiFetch(`school/${slug}`)
    const { data:schoolData, error:schoolError } = await apiFetch(parentSlug.includes('school') ? `schools` : '');

    if(error) throw new Error('Failed to load School')

    const schoolName = data?.data?.detail?.name || "School"
    const dropdownData = schoolData?.data ?? [];

  return (
    <div className="school_banner">
      <figure>
        <Image
          src="/images/no-data/school.webp"
          alt="school slider"
          className="img-fluid"
          width={2545}
          height={1080}
          loading="eager"
          priority
        />
      </figure>
      <div className="container-fluid">
        <div className="school_banner_content">
          <div className="school_filter">
            <p>School</p>
            <SchoolDropdown data={dropdownData} currentSlug={slug} />
          </div>
          <div className="school_banner_tx">
            <h1>
              {schoolName}
            </h1>
            
            <Link href={APPLY_NOW ?? '/apply-now'} className="apply_now" style={{
                marginTop:'3rem'
            }}>
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
