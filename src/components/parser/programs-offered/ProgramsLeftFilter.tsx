"use client";

import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

type AccordionOption = {
  id: string | number; // widened: string for fallback items, number for API items
  name: string;
  slug?: string;
};

type AccordionItem = {
  title: string;
  options: AccordionOption[];
  key: string;
};

const getSchoolList = async () => {
  try {
    const { data, error } = await apiFetch(`schools`);
    if (error || !data.status)
      throw new Error(`Error while fetching school data`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching school data`);
  }
};

const getDepartmentList = async () => {
  try {
    const { data, error } = await apiFetch(`departments`);
    if (error || !data.status)
      throw new Error(`Error while fetching department data`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching department data`);
  }
};

const getSpecialisation = async () => {
  try {
    const { data, error } = await apiFetch(`specialization`);
    if (error || !data.status)
      throw new Error(`Error while fetching specialization data`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching specialization data`);
  }
};

const getProgramType = async () => {
  try {
    const { data, error } = await apiFetch(`degree`);
    if (error || !data.status)
      throw new Error(`Error while fetching Program Type`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching Program Type`);
  }
};

// Normalize API items into a consistent { id, name, slug } shape.
const normalizeOptions = (
  list: unknown,
  fallbackPrefix = "opt",
): AccordionOption[] => {
  if (!Array.isArray(list)) return [];

  return list
    .map((item, i): AccordionOption | null => {
      if (typeof item === "string") {
        return { id: `${fallbackPrefix}-${i}`, name: item };
      }
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        const name = (obj.name ?? obj.title ?? obj.label) as string | undefined;
        if (!name) return null;
        return {
          id: (obj.id as number | undefined) ?? `${fallbackPrefix}-${i}`, // guarantees uniqueness
          name,
          slug: obj.slug as string | undefined,
        };
      }
      return null;
    })
    .filter((v): v is AccordionOption => v !== null); // <-- proper type guard, narrows for TS
};

const durationListData = [
  { id: 1, name: "1 Years", slug: "1-years" },
  { id: 2, name: "2 Years", slug: "2-years" },
  { id: 3, name: "3 Years", slug: "3-years" },
  { id: 4, name: "4 Years", slug: "4-years" },
];

export default function ProgramsLeftFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  console.log("searchParams", searchParams);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["program-filters"],
    queryFn: async () => {
      const [
        schoolsListData,
        departmentsListData,
        specialisationData,
        programTypeData,
      ] = await Promise.all([
        getSchoolList(),
        getDepartmentList(),
        getSpecialisation(),
        getProgramType(),
      ]);

      return {
        schoolsListData,
        departmentsListData,
        specialisationData,
        programTypeData,
      };
    },
  });

  const accordionData = useMemo<AccordionItem[]>(() => {
    const schoolOptions = normalizeOptions(data?.schoolsListData, "school");
    const durationOptions = normalizeOptions(durationListData, "duration");
    const specializationOptions = normalizeOptions(
      data?.specialisationData,
      "specialization",
    );
    const programTypeOptions = normalizeOptions(
      data?.programTypeData,
      "degree",
    );

    const dynamicAccordionData: AccordionItem[] = [
      { title: "School", key: "school", options: schoolOptions },
      { title: "Duration", key: "duration", options: durationOptions },
      {
        title: "Specialisation",
        key: "specialisation",
        options: specializationOptions,
      },
      { title: "Program Type", key: "degree", options: programTypeOptions },
    ];

    return dynamicAccordionData.filter((item) => item.options.length > 0);
  }, [data]);

  const [selected, setSelected] = useState(() => {
    const initial: any = {};
    searchParams.forEach((value, key) => {
      initial[key] = value;
    });
    return initial;
  });

  const handleSelect = (filterKey: string, optionId: string | number) => {
    setSelected((prev: any) => ({ ...prev, [filterKey]: String(optionId) }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(selected).forEach(([key, value]: any) => {
      if (value) params.set(key, value);
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelected({});
    router.push(pathname);
  };

  contentRefs.current = contentRefs.current.slice(0, accordionData.length);

  useLayoutEffect(() => {
    const syncHeight = () => {
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.maxHeight = i === activeIndex ? `${el.scrollHeight}px` : "0px";
      });
    };

    syncHeight();

    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, [activeIndex, accordionData]);

  if (isLoading) return null;
  if (isError) return null;
  if (accordionData.length === 0) return null;

  return (
    <>
      <div className="accordion">
        {accordionData.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div className={`tab ${isOpen ? "active" : ""}`} key={item.title}>
              <div
                className="accordion_heading"
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
              >
                <h5>{item.title}</h5>
              </div>

              <div
                className="accordion_content"
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                style={{
                  maxHeight: "0px",
                  overflow: "hidden",
                  transition: "max-height .35s ease",
                }}
              >
                <ul>
                  {item.options.map((option) => {
                    const inputId = `${item.key}-${option.id}`;
                    return (
                      <li key={option.id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={item.key}
                            id={inputId}
                            value={option.slug ?? String(option.id)}
                            checked={selected[item.key] == String(option.id)}
                            onChange={() => handleSelect(item.key, option.id)}
                          />

                          <label className="form-check-label" htmlFor={inputId}>
                            {option.name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <button className="apply_filter" onClick={applyFilters}>
        Apply Filter
      </button>

      <button className="reset_filter" onClick={resetFilters}>
        Reset
      </button>
    </>
  );
}
