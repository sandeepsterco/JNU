
import apiFetch from '@/lib/api'
import Link from 'next/link';
import { BASE_URL } from '@/config/config';
import { getSlug } from '@/lib/getSlug';
import ProgramSearch from './ProgramSearch';
import NoData from '@/components/ui/NoData';
import ProgramsLeftFilter from './ProgramsLeftFilter';
import './programsOffered.css'

interface SpecialInterface{
    name:string;
    slug:string;
    id:number;
}

interface ProgramsDataInterface{
    name:string;
    id:number;
    slug:string;
    course_name:string;
    school_name:string;
    specializations:SpecialInterface[];
    duration:string;
}

interface ProgramsOfferedProps {
    searchParams: { 
        search?: string;
        school?:string;
        duration?:string;
        degree?:string;
    };
}

export default async function ProgramsOffered({searchParams}:ProgramsOfferedProps) {
    const {search, school, duration, degree} = searchParams;
    const currentSlug = await getSlug(0);
    const params = new URLSearchParams();

    if(search) params.set('search', search);
    if(school) params.set('school', school);
    if(duration) params.set('duration', duration);
    if(degree) params.set('degree', degree);
    const {data, error} = await apiFetch(`programs?${params.toString()}`);

    const programsData:ProgramsDataInterface[] = data.data ?? [];

    return (
        <>
            <div className="prg_search">
                <ProgramSearch />
            </div>
            <div className="program_listing_grid">
                <div className="progrem_left">
                    <ProgramsLeftFilter />
                </div>

                <div className="progrem_right">
                    

                {programsData?.length == 0 && (
                            <NoData />
                        )}
                    <div className="program_list_grid">

                        {programsData?.length > 0 && programsData.map((item)=>(
                            <div key={item.id} className="program_grid_bx">
                                <div className="program_bx_left">
                                    <h4>
                                        <Link href={`${BASE_URL}${currentSlug}/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </h4>
                                    <ul className="graduate_bx">
                                        {item?.course_name && (
                                            <li>{item.course_name}</li>
                                        )}
                                        {item?.school_name && (
                                            <li>{item.school_name}</li>
                                        )}
                                    </ul>
                                    {item?.specializations && item?.specializations?.length > 0 && (
                                        <ul className="specialization_flex">
                                            <li>Specialization Offered:</li>
                                            {item.specializations.map((item)=>(
                                                <li key={item.id}>{item.name}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {item?.duration && (
                                        <h5><strong>Duration</strong> {item.duration}</h5>
                                    )}
                                </div>
                                <div className="program_bx_right">
                                    <h4>Eligibility</h4>
                                    <h5>Fee Structure</h5>
                                    <a href="#" className="apply_now">Apply Now</a>
                                </div>
                            </div>
                        ))}
                       
                    </div>
                </div>
            </div>
        </>
    )
}