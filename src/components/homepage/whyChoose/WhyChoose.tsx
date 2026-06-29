import Image from 'next/image'
import Collaborations from './Collaborations'
import './whyChoose.css'
import Link from 'next/link';
import { APPLY_NOW } from '@/config/config';

interface ListInterface{
    heading:string;
    subheading:string;
}

interface LinkInterface{
    title:string;
    links:string;
}

interface ImageInterface{
    image:string;
}

interface WhyChooseUsInterface{
    data:{
        title:string;
        subtitle:string;
        lists:ListInterface[];
        links:LinkInterface[];
        slug:string;
        desktopimage:string;
        mobileimage:string;
        virtualtoururl?:string;
    },
    collaboration:{
        title:string;
        images:ImageInterface[];
    }
}

export default function WhyChoose({data, collaboration}:WhyChooseUsInterface) {
    return (
        <section className="why_choose">
            <div className="container">
                <div className="head_title">
                    {data?.title && (
                        <h2 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">{data.title}</h2>
                    )}
                    {data?.subtitle && (
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" dangerouslySetInnerHTML={{__html:data.subtitle}} />
                    )}
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="why_jnu">
                            {data?.lists && data?.lists.length > 0 && (
                                <ul>
                                    {data.lists.map((item, idx)=>(
                                        <li key={idx} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                            {item?.heading && (
                                                <h4>{item.heading}</h4>
                                            )}
                                            {item?.subheading && (
                                                <p>{item.subheading}</p>
                                            )}
                                        </li>
                                    ))}
                                    
                                </ul>
                            )}  

                            {data.slug && (
                                <Link href={data.slug} className="load_more" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">Load More 
                                    <figure><img src="/images/icons/nav-arrow-down.svg" className="img-fluid" alt="arrow" /></figure>
                                </Link>
                            )}
                            
                            
                        </div>
                    </div>
                </div>

            </div>


            <div className="why_background">
                <picture>
                    <source media="(max-width: 767px)" srcSet={data.mobileimage} />
                    <figure><Image width={2545} height={650} loading='lazy' src={data.desktopimage} className="img-fluid image2" alt="why jnu" /></figure>
                </picture>
                <div className="why_background_footer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="container">
                        <div className="why_grid">
                            <ul>
                                {data?.links && data.links.length > 0 && data.links.map((item, idx)=>(
                                    <li key={idx}>
                                        <Link href={item.links}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="why_btn">
                                {data?.virtualtoururl && (
                                    <Link href={data.virtualtoururl} className="virtual_tour">
                                        <figure><img src="/images/icons/360-degrees.svg" className="img-fluid" alt="360" /></figure> Virtual Tour
                                    </Link>
                                )}
                                
                                <Link href={APPLY_NOW ?? '/apply-now'} className="apply_now">Apply Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {collaboration?.images && collaboration?.images?.length > 0 && (
                <Collaborations data={collaboration} />
            )}

        </section>
    )
}