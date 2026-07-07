"use client"
import Image from 'next/image';
import './facultyGrid.css'
import Link from 'next/link';
import { BASE_URL } from '@/config/config';
import { useEffect, useState, useTransition } from 'react';
import { Skeleton } from '../ui/Skeleton';
import FacultyFilter from './Filter/FacultyFilter';
import NoData from '../ui/NoData';

interface Faculty {
    id: number;
    name: string;
    image: string;
    designation: string;
    schools: string;
    departments: string;
    slug: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface FacultyPropsInterface {
    data: {
        current_page: number;
        data: Faculty[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    },
    loadFacultyAction: any;
}

export default function FacultyGrid({ data, loadFacultyAction }: FacultyPropsInterface) {
    const [facultyList, setFacultyList] = useState<Faculty[]>(data?.data ?? []);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(data?.last_page ?? 1);
    const [searchValue, setSearchValue] = useState('');
    const [schoolValue, setSchoolValue] = useState('');
    const [departmentValue, setDepartmentValue] = useState('');
    const [isPending, startTransition] = useTransition();

    const hasMore = currentPage < lastPage;

    useEffect(()=>{
        startTransition(async()=>{
            const newData = await loadFacultyAction({page:1, search:searchValue, school:schoolValue, department:departmentValue});
            setFacultyList(newData?.data ?? []);
            setCurrentPage(newData?.current_page ?? 1);
            setLastPage(newData?.last_page ?? 1);
        });
    }, [searchValue, schoolValue, departmentValue])

    const handleLoadMore = async () => {
        startTransition(async () => {
            const nextPage = currentPage + 1;
            const newData = await loadFacultyAction({page: nextPage, search:searchValue, school:schoolValue, department:departmentValue});
            setFacultyList((prev) => [...prev, ...(newData?.data ?? [])]);
            setCurrentPage(newData?.current_page ?? nextPage);
            setLastPage(newData?.last_page ?? lastPage);
        });
    }

    return (
        <section className="faculty_section">
            <div className="container">
                <FacultyFilter onSearchChange={setSearchValue} onSchoolChange={setSchoolValue} onDepartmentChange={setDepartmentValue} schoolValue={schoolValue} departmentValue={departmentValue} />

                {facultyList.length == 0 && (
                    <NoData />
                )}

                {facultyList && facultyList.length > 0 && (
                    <div className="faculty_grid">
                        {facultyList?.map((item, idx) => (
                            <div key={idx} className="faculty_Bx">
                                <figure>
                                    <Image src={item?.image ?? `/images/placeholders/faculty.webp`} width={1067} height={1220} loading='lazy' className="img-fluid" alt={item?.name ?? 'faculty image'} />
                                </figure>
                                <div className="faculty_cnt">
                                    {item?.name && (
                                        <h4>{item.name}</h4>
                                    )}
                                    {item?.designation && (
                                        <p>{item.designation}</p>
                                    )}
                                </div>
                                {item?.slug && (
                                    <Link href={`${BASE_URL}faculty/${item.slug}`} className="overlap_btn"></Link>
                                )}
                            </div>
                        ))}

                        {isPending && Array.from({length:5}).map((_, i)=>(
                            <div key={i} className="faculty_Bx">
                                <Skeleton className='h-[50rem] w-full' />
                            </div>
                        ))}

                    </div>
                )}

                {hasMore && (
                    <div className="load_more_btn">
                        <button role='more button' className='btn' onClick={handleLoadMore}>
                            Load More <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                        </button>
                    </div>
                )}

            </div>
        </section>
    )
}