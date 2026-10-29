import Link from 'next/link';
import './experience.css'
import ExperienceTabs from './ExperienceTabs';
import { BASE_URL } from '@/config/config';

interface FactsInterface{
    figure:string;
    facts:string;
}

interface CounterInterface{
    count:string;
    title:string;
}

interface TabsInterface{
    tab:string;
    video?:string;
    id?:string;
}

interface ExperiencePropsInterface{
    data:{
        title:string;
        subtitle:string;
        description:string;
        link?:string;
        factsfigure:FactsInterface[];
        overlayheading:string;
        overlaydescription:string;
        overlaycounter:CounterInterface[];
        overlayslug?:string;
        videotabs:TabsInterface[];
    }
}

export default function Experience({data}:ExperiencePropsInterface) {

    return (
        <>
            <section className="experience_university">
                <div className="container">
                    <div className="experience_header">
                        <div className="head_title">
                            {data?.title && (
                                <h3
                                    className="font18"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                    dangerouslySetInnerHTML={{__html:data.title}}
                                />
                            )}
                            
                            {data?.subtitle && (
                                <blockquote
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="400"
                                    dangerouslySetInnerHTML={{__html:data.subtitle}}
                                />
                            )}
                            
                            {data?.description && (
                                <p
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="600"
                                    dangerouslySetInnerHTML={{__html:data.description}}
                                />
                            )}

                            {data?.link && (
                                <Link
                                    href={`${BASE_URL}${data.link}`}
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="800"
                                >
                                    <img
                                        src="/images/icons/nav-arrow-next.svg"
                                        className="img-fluid"
                                        alt="arrow"
                                    />
                                </Link>
                            )}

                            
                        </div>

                        <div className="experience_header_right">
                            {data?.factsfigure && data.factsfigure?.length > 0 && (
                                <ul>
                                    {data.factsfigure?.map((item, idx)=>(
                                        <li
                                            key={idx}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="200"
                                        >
                                            <h5 dangerouslySetInnerHTML={{__html:item.figure}} />
                                            {item?.facts && (
                                                <p>{item.facts}</p>
                                            )}
                                        </li>
                                    ))}
                                    

                                </ul>
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>
            <ExperienceTabs data={data} />
        </>
    );
}