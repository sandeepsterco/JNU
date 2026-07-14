"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Option {
    id: string | number
    name: string;
    slug:string;
}

interface NewsFilterProps {
    schools?: Option[]
    departments?: Option[]
}

const getLastNYears = (n:number)=>{
    const currentYear = new Date().getFullYear();
    return Array.from({length:n}, (_, i)=>currentYear - i)
}

export default function NewsFilter({schools = [], departments=[]}:NewsFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const years = getLastNYears(10)

    const updateParams = (key:string, value:string)=>{
        const params = new URLSearchParams(searchParams.toString());
        if(value){
            params.set(key, value)
        }else{
            params.delete(key)
        }
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="faculty_filter">
            {schools?.length > 0 && (
                <div className="filter_Bx">
                    <div className="custom_select">
                        <select className="form-select" aria-label="Default select example" value={searchParams.get('school') ?? ''} onChange={(e)=>updateParams('school', e.target.value)}>
                            <option selected value="">Filter by School</option>
                            {schools?.map((item)=>(
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {departments?.length > 0 && (
                <div className="filter_Bx">
                    <div className="custom_select">
                        <select className="form-select" aria-label="Default select example" value={searchParams.get('department') ?? ''} onChange={(e)=>updateParams('department', e.target.value)}>
                            <option selected value="">Filter by Department</option>
                            {departments?.map((item)=>(
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            
            
            <div className="filter_Bx">
                <div className="custom_select">
                    <select className="form-select" aria-label="Default select example" value={searchParams.get('date') ?? ''} onChange={(e)=>updateParams('date', e.target.value)}>
                        <option selected value="">Filter by Year</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}