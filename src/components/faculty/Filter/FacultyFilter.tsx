"use client"

import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

interface FacultyFilterProps {
    onSearchChange: (value: string) => void;
    onSchoolChange:(value:string)=>void;
    onDepartmentChange:(value:string)=>void;
    schoolValue?:string;
    departmentValue?:string;
}

const getSchoolData = async()=>{
    try{
        const {data, error} = await apiFetch(`schools`);

        if(error){
            throw new Error(error);
        }

        return data.data;
    }catch(error){
        throw error instanceof Error ? error : new Error('Failed to fetch school data')
    }
}

const getDepartmentData = async()=>{
    try{
        const {data, error} = await apiFetch(`departments`);

        if(error){
            throw new Error(error);
        }

        return data.data;
    }catch(error){
        throw error instanceof Error ? error : new Error('Failed to fetch department data')
    }
}

export default function FacultyFilter({onSearchChange, onSchoolChange, onDepartmentChange, schoolValue, departmentValue }:FacultyFilterProps) {
    const {data:schoolData, isLoading:schoolLoading, isError, error} = useQuery({
        queryKey:['schools'],
        queryFn:getSchoolData
    })

    const {data:departmentData, isLoading:departmenetLoading, isError:departmentError} = useQuery({
        queryKey:['departments'],
        queryFn:getDepartmentData
    })

    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onSearchChange(searchValue);
        }, 500);

        return()=>clearTimeout(timer);
    }, [searchValue])

    return (
        <div className="faculty_filter">
            <div className="filter_Bx">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={searchValue} placeholder="Search Faculty" aria-label="Recipient’s username" aria-describedby="button-addon2" onChange={(e)=>setSearchValue(e.target.value)} />

                    <button className="btn btn_search" type="button" id="button-addon2">
                        <img src="images/icons/search-icon.svg" alt="search" className="img-fluid" />
                    </button>
                </div>
            </div>

            <div className="filter_Bx">
                <div className="custom_select">
                    <select className="form-select" aria-label="Default select example" disabled={schoolLoading} value={schoolValue} onChange={(e)=>onSchoolChange(e.target.value)}>
                        {schoolLoading ? (
                            <option>Loading Schools...</option>
                        ) : (
                            <>  
                                <option value="">Select School</option>
                                {schoolData?.map((item:any)=>(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            <div className="filter_Bx">
                <div className="custom_select">
                    <select className="form-select" aria-label="Default select example" disabled={departmenetLoading} value={departmentValue} onChange={(e)=>onDepartmentChange(e.target.value)}>
                        {departmenetLoading ? (
                            <option>Loading Department...</option>
                        ) : (
                            <>  
                                <option value="">Select Department</option>
                                {departmentData?.map((item:any)=>(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>
        </div>
    )
}