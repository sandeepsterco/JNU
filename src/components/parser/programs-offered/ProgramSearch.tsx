"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function ProgramSearch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, 500)

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get("search") ?? "";
        if (debouncedQuery === current) return;

        if (debouncedQuery) {
            params.set("search", debouncedQuery)
        } else {
            params.delete("search")
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, [debouncedQuery]);

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by Program"
                aria-label="Recipient’s username /"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />

            <button className="btn btn_search" type="button" id="button-addon2">
                <img src="/images/icons/search-icon.svg" alt="search" className="img-fluid" />
            </button>
        </div>
    )
}
