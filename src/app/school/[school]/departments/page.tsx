import NoData from "@/components/ui/NoData";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";
import "../school.css";

interface Department {
  id: number;
  name: string;
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
    <div className="school_department">
      <div className="container">
        <ul className="our_department_list">
          {departments.map((department) => (
            <li key={department.id}>
              <span>{department.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
