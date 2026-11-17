import SchoolTestimonialsGrid, {
  type SchoolTestimonial,
} from "@/components/parser/schoolTestimonial/SchoolTestimonialsGrid";
import apiFetch from "@/lib/api";
import { notFound } from "next/navigation";

interface SchoolTestimonialsResponse {
  status: boolean;
  school: {
    name: string;
    slug: string;
  };
  testimonials: SchoolTestimonial[];
}

export default async function SchoolTestimonialsPage({
  params,
}: {
  params: Promise<{ school: string }>;
}) {
  const { school } = await params;
  const { data, error } = await apiFetch(
    `schools/${encodeURIComponent(school)}/testimonials`
  );

  if (error) {
    throw new Error("Failed to load school testimonials");
  }

  if (!data?.status) {
    notFound();
  }

  const response = data as SchoolTestimonialsResponse;

  return (
    <SchoolTestimonialsGrid
      schoolSlug={response.school.slug}
      testimonials={response.testimonials ?? []}
    />
  );
}
