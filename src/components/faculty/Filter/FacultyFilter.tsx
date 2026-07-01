"use client"

import { useEffect, useState } from "react"

interface FacultyFilterProps {
    onSearchChange: (value: string) => void;
}

export default function FacultyFilter({onSearchChange }:FacultyFilterProps) {
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
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select School</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div className="filter_Bx">
                <div className="custom_select">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select Department</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
        </div>
    )
}