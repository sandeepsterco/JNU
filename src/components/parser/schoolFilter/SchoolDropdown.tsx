"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import type { DataInterface } from "./SchoolFilter";

interface SchoolDropdownProps {
    data: DataInterface[];
    currentSlug?: string;
}

export default function SchoolDropdown({ data, currentSlug }: SchoolDropdownProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const activeItem = data.find((item) => item.slug === currentSlug);
    const label = activeItem ? activeItem.name : "Select School";

    useEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="sch_dropdown" ref={rootRef}>
            <button
                type="button"
                className={`dropdown_toggle${open ? " show" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                {label}
            </button>

            <div className={`dropdown ${open ? "show" : ""}`}>
                <ul>
                    {data.map((item) => (
                        <li key={item.id} className={item.slug === currentSlug ? "active" : ""}>
                            <Link
                                href={`${BASE_URL}school/${item.slug}`}
                                className="sch-link"
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}