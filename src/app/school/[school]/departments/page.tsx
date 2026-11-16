import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";
import "../school.css";
import Image from "next/image";

interface Department {
  id: number;
  name: string;
  slug:string;
  image:string;
}

interface DepartmentsResponse {
  status: boolean;
  data: Department[];
}

export default async function SchoolDepartmentsPage({
  params,
}: {
  params: Promise<{ school: string }>;
}) {
  const { school } = await params;
  const { data, error } = await apiFetch(`departments-by-school/${school}`);

  if (error || !data?.status) {
    return notFound();
  }

  const departments = (data as DepartmentsResponse).data ?? [];

  if (departments.length === 0) {
    return <NoData type="section" />;
  }

  return (
    <div className="school_department leadership_section hero_bg_pattern">
      <div className="container">
        <ul className="leadership_grid">
          {departments.map((department) => (
            <div className="leadership_Bx" key={department.id}>
              <figure>
                <Image
                  className="img-fluid"
                src={department.image || "/images/depament_placeholder.webp"}
                alt={department.name || "Department"}
                width={435}
                height={357}
                />
              </figure>
              <div className="leadership_cnt"><h4>{department.name}</h4></div>
              <a className="overlap_btn" href={department.slug}></a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
