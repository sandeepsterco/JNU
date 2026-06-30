import Link from 'next/link';
import { APPLY_NOW, BASE_URL } from '@/config/config';
import Search from './Search';
import { Suspense } from 'react';
import './studyjnu.css'

interface ModularProgramInterface{
    name:string;
    description:string;
    image:string;
    slug:string;
}

interface ProgramPropsInterface{
    data:{
        heading:string;
        subheading:string;
        description:string;
        email:string;
        phone:string;
        brouchure:string;
    },
    modular:ModularProgramInterface[]
}

export default function StudyJNU({data, modular}:ProgramPropsInterface) {
    return (
        <section className="studyjnu_section">
            <div className="max-container-lg">
                <div className="study_at_jnu">
                    <div className="head_title">
                        {data?.heading && (
                            <h1 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">{data.heading}</h1>
                        )}
                        {data?.subheading && (
                            <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">{data.subheading}</blockquote>
                        )}
                    </div>

                    <Search />

                    {modular && modular?.length > 0 && (
                        <div className="container">
                            <div className="prgrms_grid" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                {modular.map((item, idx)=>(
                                    <div key={idx} className="prgrms_Bx">
                                        {item?.name && (
                                            <h4 className="font24">{item.name}</h4>
                                        )}
                                        {item?.description && (
                                            <p>{item.description}</p>
                                        )}
                                        <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                                        {item?.slug && (
                                            <Link href={`${BASE_URL}programs?type=${item.slug}`} className="overlap_btn"></Link>
                                        )}
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    )}

                    
                </div>

                <div className="studyat_bottom" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="studyat_left">
                        {data?.description && (
                            <p dangerouslySetInnerHTML={{__html:data.description}} />
                        )}
                    </div>
                    <div className="studyat_right">
                        <ul>
                            {data?.email && (
                                <li>
                                    <Link href={`mailto:${data.email}`}>
                                        <figure><img src="/images/icons/mail-yellow.svg" className="img-fluid" alt="mail" /></figure>
                                        {data.email}
                                    </Link>
                                </li>
                            )}

                            {data?.phone && (
                                <li>
                                    <a href={`tel:${data.phone}`}>
                                        <figure><img src="/images/icons/phone-yellow.svg" className="img-fluid" alt="phone" /></figure> {data.phone}
                                    </a>
                                </li>
                            )}
                            
                        </ul>
                        <div className="study_btn">
                            {data?.brouchure && (
                                <Link href={data.brouchure} className="download_brochure" target='_blank'>
                                    <figure><img src="/images/icons/pdf-icon.svg" className="img-fluid" alt="brochure" /></figure> Download Brochure
                                </Link>
                            )}
                            
                            <Link className="apply_now" href={APPLY_NOW ?? '/apply-now'}>Apply Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}