"use client";

import { useRouter } from "next/navigation";

export default function BackBtn({className}:{className?:string}){
    const router = useRouter();

    return(
        <div className="even_back">
            <button className="backtoinno_btn " onClick={() => router.back()}>Go To Back </button>
        </div>
    )
}