"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react"

export default function ProgramSearch() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isPending, startTransition] = useTransition();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedQuery(searchQuery)
        }, 500)

        return ()=>clearTimeout(timer);
    }, [searchQuery]);

    useEffect(()=>{
        const params = new URLSearchParams();
        if(debouncedQuery){
            params.set('search', debouncedQuery)
        }
        startTransition(()=>{
            router.push(`?${params.toString()}`);
        })
    }, [debouncedQuery])

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

            <button className="btn btn_search" type="button" id="button-addon2">
                <img src="/images/icons/search-icon.svg" alt="search" className="img-fluid" />
            </button>
        </div>
    )
}