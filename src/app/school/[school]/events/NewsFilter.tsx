"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
 
interface Option {
    id: string | number
    name: string;
}

interface NewsFilterProps {
    fixedSchoolId: string | number
    departments?: Option[]
}

const getLastNYears = (n:number)=>{
    const currentYear = new Date().getFullYear();
    return Array.from({length:n}, (_, i)=>currentYear - i)
}

export default function NewsFilter({fixedSchoolId, departments=[]}:NewsFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const years = getLastNYears(10)

    const updateParams = (key:string, value:string)=>{
        const params = new URLSearchParams(searchParams.toString());
        params.set('school', String(fixedSchoolId));
        if(value){
            params.set(key, value)
        }else{
            params.delete(key)
        }
        params.delete('page')
        const query = params.toString()
        router.push(query ? `${pathname}?${query}` : pathname)
    }

    return (
        <div className="faculty_filter school_events_filter">
            {departments?.length > 0 && (
                <div className="filter_Bx">
                    <div className="custom_select">
                        <select className="form-select" aria-label="Filter by Department" value={searchParams.get('department') ?? ''} onChange={(e)=>updateParams('department', e.target.value)}>
                            <option value="">Filter by Department</option>
                            {departments?.map((item)=>(
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            
            
            <div className="filter_Bx">
                <div className="custom_select">
                    <select className="form-select" aria-label="Filter by Year" value={searchParams.get('date') ?? ''} onChange={(e)=>updateParams('date', e.target.value)}>
                        <option value="">Filter by Year</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}