import Link from 'next/link';
import ResearchSlider from './ResearchSlider'
import { BASE_URL } from '@/config/config';
import './research.css'

interface ModularResearchInterface{
    name:string;
    image:string;
    slug:string;
}

interface ResearchPropsInterface{
    data:{
        title:string;
        subtitle:string;
        description:string;
        link?:string;
    },
    modular:ModularResearchInterface[]
}

export default function HomeResearch({data, modular}:ResearchPropsInterface) {
    return (
        <section className="research_section">
            <div className="container">
                <div className="research_header">
                    <div className="head_title">
                        {data?.title && (
                            <h3 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" dangerouslySetInnerHTML={{__html:data.title}} />
                        )}
                        {data?.subtitle && (
                            <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" dangerouslySetInnerHTML={{__html:data.subtitle}} />
                        )}
                        
                    </div>
                    <div className="research_header_right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        {data?.description && (
                            <p dangerouslySetInnerHTML={{__html:data.description}} />
                        )}
                        {data?.link && (
                            <Link href={`${BASE_URL}${data.link}`}><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></Link>
                        )}
                    </div>
                </div>
            </div>

            {modular && (
                <ResearchSlider data={modular} />
            )}

        </section>
    )
}