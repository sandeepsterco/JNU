import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/config/config";

export interface SchoolItem {
  id?: number;
  name?: string;
  image?: string;
  designation?: string;
  slug?: string;
}

interface SchoolGridProps {
  items: SchoolItem[];
}

export default function SchoolGrid({
  items,
}: SchoolGridProps) {
  return (
    <div className="leadership_grid">
      {items.map((item, index) => (
        <div
          key={item.slug ?? `${item.name ?? "leadership"}-${index}`}
          className="leadership_Bx"
        >
          <figure>
            <Image
              src={item.image ?? "/images/placeholders/faculty.webp"}
              alt={item.name ?? "Leadership member"}
              width={475}
              height={484}
              className="img-fluid"
              loading="lazy"
            />
          </figure>

          <div className="leadership_cnt">
            {item.name && <h4>{item.name}</h4>}
            {item.designation && <p>{item.designation}</p>}
          </div>

          {item.slug && (
            <Link
              href={`${BASE_URL}school/${item.slug}`}
              className="overlap_btn"
              aria-label={`View ${item.name ?? "leadership member"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}