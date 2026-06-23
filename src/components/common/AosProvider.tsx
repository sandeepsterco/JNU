"use client";

import { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AosProvider({children}:{children:React.ReactNode}){
    useEffect(()=>{
        AOS.init({
            easing: "ease-out-back",
            disable: "mobile",
            duration: 2000,
            once: true
        })

        window.addEventListener('load', ()=>AOS.refresh());

        return()=>{
            window.removeEventListener('load', ()=>AOS.refresh());
        }
    }, [])

    return(
        <>
            {children}
        </>
    )
}