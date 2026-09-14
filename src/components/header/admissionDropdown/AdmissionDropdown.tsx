"use client"
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AdmissionDropdownRight from "./AdmissionRight";
import './admission_dropdown.css'

const getDropdownData = async()=>{
  try{
    const {data, error} = await apiFetch(`info`);

    if(error){
      throw new Error(error);
    }
    return data.data;
  }catch(error){
    throw error instanceof Error ? error : new Error('Failed to fetch info data')
  }
  
}

export default function AdmissionDropdown({childrens}:{childrens:any}) {
    const {data, isLoading, isError} = useQuery({
      queryKey:['admission-dropdown'],
      queryFn:getDropdownData
    })

    const getValue = (key: string) => {
      const found = data?.find((item: any) => item.key == key) ?? null;
      if (found?.value || found?.image || found?.url) {
        return {
          value: found?.value ?? null,
          image: found?.image ?? null,
          url: found?.url ?? null,
        }
      } else {
        return null;
      }
    }

    return (
      <aside
        className="admission_drop_menu"
        style={{ backgroundImage: "url('/images/admission-background.webp')" }}
      >
        <div className="admission_left">
          <blockquote>{getValue('admission_title')?.value}</blockquote>
          {childrens?.length > 0 && (
            <ul className="admission_menu">
              {childrens.map((child:any, idx:number)=>(
                <li key={idx}>
                  <Link href={`${BASE_URL}${child.slug}`}>{child.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <AdmissionDropdownRight getValue={getValue} />
  
        
      </aside>
    )
  }