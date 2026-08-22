"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react"

export default function ProgramSearch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const urlSearch = searchParams.get("search") ?? "";
    const [searchQuery, setSearchQuery] = useState(urlSearch);
    const [debouncedQuery, setDebouncedQuery] = useState(urlSearch);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setSearchQuery(urlSearch);
        setDebouncedQuery(urlSearch);
    }, [urlSearch]);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedQuery(searchQuery)
        }, 500)

        return ()=>clearTimeout(timer);
    }, [searchQuery]);

    useEffect(()=>{
        if (debouncedQuery === urlSearch) return;

        const params = new URLSearchParams(searchParams.toString());
        if(debouncedQuery){
            params.set('search', debouncedQuery)
        } else {
            params.delete('search')
        }

        const query = params.toString();
        startTransition(()=>{
            router.push(query ? `${pathname}?${query}` : pathname);
        })
    }, [debouncedQuery, pathname, router, searchParams, urlSearch])

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by Program"
                aria-label="Recipient’s username /"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e)=>{
                    setSearchQuery(e.target.value);
                }} 
            />

            <button className="btn btn_search" type="button" id="button-addon2" disabled={isPending}>
                <img src="/images/icons/search-icon.svg" alt="search" className="img-fluid" />
            </button>
        </div>
    )
}
