"use client"
import { API_URL, BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import './search.css'

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['program-search', debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return [];

            const response = await fetch(`${API_URL}programs/search?query=${debouncedQuery}`);
            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            return data.programs;
        },
        enabled: !!debouncedQuery,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e: any) => {
        const { key, value } = e.target;
        setSearchQuery(value);
        setIsOpen(true);
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="jnu_search" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" ref={containerRef}>
            <div className="input-group">
                <input type="text" className="form-control" value={searchQuery} placeholder="Search Programs." aria-label="Search Programs."
                    aria-describedby="button-addon2" onChange={(e) => handleSearch(e)} />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2"><img
                    src="/images/icons/search-icon.svg" alt="search" className="img-fluid" /></button>

                {isOpen && debouncedQuery && (
                    <div className="course_dropdown">
                        {isLoading && <p className="course_list">Loading...</p>}

                        {isError && (
                            <p className="course_list">Something went wrong</p>
                        )}

                        {!isLoading && data?.length === 0 && (
                            <p className="course_list">No courses found</p>
                        )}

                        {data?.map((course: any, idx:number) => (
                            <div
                                key={idx}
                                className="courses_lists hover:bg-gray-100 cursor-pointer last:border-none"
                            >
                                <Link href={`${BASE_URL}program/${course.slug}`} className="course_list">
                                    {course.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}