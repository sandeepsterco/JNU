import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug";
import Link from "next/link";

interface PageDataInterface {
  data: {
    modular: {
      programs: ProgramInterface[];
    };
  };
}

interface ProgramInterface {
  name: string;
  slug: string;
  qualification?: string;
}
export default async function DepartmentProgramsOffered() {
  const departmentSlug = await getSlug();
  const { data, error } = await apiFetch(`department/${departmentSlug}`);

  if (error || !data.status)
    throw new Error(`Failed to fetch Department Programs`);
  const departmentProgramsData =
    (data as PageDataInterface)?.data?.modular?.programs ?? [];

  if (departmentProgramsData.length === 0) return;

  return (
    <ul className="dep_program_list">
        {departmentProgramsData.map((item, idx)=>(
            <li key={idx}>
                <span style={{opacity:!!item.qualification ? 1 : 0}}>{item.qualification ?? '-'}</span>
                <p className="pro_name">{item.name}</p>
                
                {item?.slug && (
                    <>
                        <figure>
                            <img src="/images/icons/nav-arrow-next.svg" alt="next arrow" loading="lazy" width={8} height={14} />
                        </figure>
                        <Link href={`${BASE_URL}programs/${item.slug}`} className="overlap_btn"></Link>
                    </>
                )}
            </li>
        ))}
      
      
    </ul>
  );
}
