
import apiFetch from '@/lib/api'
import './programsOffered.css'
import Link from 'next/link';
import { BASE_URL } from '@/config/config';

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

export default async function ProgramsOffered() {
    const {data, error} = await apiFetch(`programs`);

    const programsData:ProgramsDataInterface[] = data.data;

    return (
        <>
            <div className="prg_search">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search by Program" aria-label="Recipient’s username /" aria-describedby="button-addon2" />

                    <button className="btn btn_search" type="button" id="button-addon2">
                        <img src="/images/icons/search-icon.svg" alt="search" className="img-fluid" />
                    </button>
                </div>
            </div>
            <div className="program_listing_grid">
                <div className="progrem_left">
                    <div className="accordion">
                        <div className="tab">
                            <div className="accordion_heading">
                                <h5>Level</h5>
                            </div>
                            <div className="accordion_content">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                                            <label className="form-check-label" htmlFor="radioDefault1">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                                            <label className="form-check-label" htmlFor="radioDefault2">
                                                Under Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault3" />
                                            <label className="form-check-label" htmlFor="radioDefault3">
                                                Post Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault4" />
                                            <label className="form-check-label" htmlFor="radioDefault4">
                                                Doctoral
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault5" />
                                            <label className="form-check-label" htmlFor="radioDefault5">
                                                Diploma
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="tab">
                            <div className="accordion_heading">
                                <h5>School</h5>
                            </div>
                            <div className="accordion_content">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault6" />
                                            <label className="form-check-label" htmlFor="radioDefault6">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault7" />
                                            <label className="form-check-label" htmlFor="radioDefault7">
                                                Under Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault8" />
                                            <label className="form-check-label" htmlFor="radioDefault8">
                                                Post Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault9" />
                                            <label className="form-check-label" htmlFor="radioDefault9">
                                                Doctoral
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault10" />
                                            <label className="form-check-label" htmlFor="radioDefault10">
                                                Diploma
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="tab">
                            <div className="accordion_heading" id="2">
                                <h5>Duration</h5>
                            </div>
                            <div className="accordion_content">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault11" />
                                            <label className="form-check-label" htmlFor="radioDefault11">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault12" />
                                            <label className="form-check-label" htmlFor="radioDefault12">
                                                Under Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault13" />
                                            <label className="form-check-label" htmlFor="radioDefault13">
                                                Post Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault14" />
                                            <label className="form-check-label" htmlFor="radioDefault14">
                                                Doctoral
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault15" />
                                            <label className="form-check-label" htmlFor="radioDefault15">
                                                Diploma
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="tab">
                            <div className="accordion_heading" id="3">
                                <h5>Specialisation</h5>
                            </div>
                            <div className="accordion_content">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault16" />
                                            <label className="form-check-label" htmlFor="radioDefault16">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault17" />
                                            <label className="form-check-label" htmlFor="radioDefault17">
                                                Under Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault18" />
                                            <label className="form-check-label" htmlFor="radioDefault18">
                                                Post Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault19" />
                                            <label className="form-check-label" htmlFor="radioDefault19">
                                                Doctoral
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault20" />
                                            <label className="form-check-label" htmlFor="radioDefault20">
                                                Diploma
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="tab">
                            <div className="accordion_heading" id="4">
                                <h5>Program Type</h5>
                            </div>
                            <div className="accordion_content">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault21" />
                                            <label className="form-check-label" htmlFor="radioDefault21">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault22" />
                                            <label className="form-check-label" htmlFor="radioDefault22">
                                                Under Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault23" />
                                            <label className="form-check-label" htmlFor="radioDefault23">
                                                Post Graduate
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault24" />
                                            <label className="form-check-label" htmlFor="radioDefault24">
                                                Doctoral
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault25" />
                                            <label className="form-check-label" htmlFor="radioDefault25">
                                                Diploma
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="apply_filter">Apply Filter</a>
                    <a href="#" className="reset_filter">Reset</a>
                </div>
                <div className="progrem_right">
                    <div className="program_list_grid">

                        {programsData?.length > 0 && programsData.map((item)=>(
                            <div key={item.id} className="program_grid_bx">
                                <div className="program_bx_left">
                                    <h4>
                                        <Link href={`${BASE_URL}programs-offered/${item.slug}`}>
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