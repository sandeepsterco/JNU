"use client";

import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

type AccordionOption = {
  id: string | number; // widened: string for fallback items, number for API items
  name: string;
  slug?: string;
};

type AccordionItem = {
  title: string;
  options: AccordionOption[];
};

const getSchoolList = async () => {
  try {
    const { data, error } = await apiFetch(`schools`);
    if (error || !data.status) throw new Error(`Error while fetching school data`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching school data`);
  }
};

const getDepartmentList = async () => {
  try {
    const { data, error } = await apiFetch(`departments`);
    if (error || !data.status) throw new Error(`Error while fetching department data`);
    return data.data;
  } catch (error) {
    throw new Error(`Error while fetching department data`);
  }
};

// Normalize API items into a consistent { id, name, slug } shape.
const normalizeOptions = (list: unknown, fallbackPrefix = "opt"): AccordionOption[] => {
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
  { id: 1, name: "3 Years", slug: "3-years" },
  { id: 2, name: "4 Years", slug: "4-years" },
];

export default function ProgramsLeftFilter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["program-filters"],
    queryFn: async () => {
      const [schoolsListData, departmentsListData] = await Promise.all([
        getSchoolList(),
        getDepartmentList(),
      ]);

      return { schoolsListData, departmentsListData };
    },
  });

  const accordionData = useMemo<AccordionItem[]>(() => {
    const schoolOptions = normalizeOptions(data?.schoolsListData, "school");
    const durationOptions = normalizeOptions(durationListData, "duration");

    const dynamicAccordionData: AccordionItem[] = [
      { title: "School", options: schoolOptions },
      { title: "Duration", options: durationOptions },
    ];

    return dynamicAccordionData.filter((item) => item.options.length > 0);
  }, [data]);

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
                    const inputId = `${item.title}-${option.id}`;
                    return (
                      <li key={option.id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={item.title}
                            id={inputId}
                            value={option.slug ?? String(option.id)}
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

      <a href="#" className="apply_filter">
        Apply Filter
      </a>

      <a href="#" className="reset_filter">
        Reset
      </a>
    </>
  );
}