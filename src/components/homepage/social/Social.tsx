import SocialGrid from './SocialGrid';
import SocialIconsGrid from './SocialIconsGrid';
import './social.css'

export interface SocialInterface{
    name:string;
    image:string;
    slug:string;
}

interface SocialPropsInterface{
    data:{
        title:string;
    },
    modular:SocialInterface[]
}

export default async function HomeSocial({data, modular}:SocialPropsInterface) {
    

    return (
        <section className="jnu_social_wall">
            <div className="container">
                {data?.title && (
                    <div className="head_title">
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" dangerouslySetInnerHTML={{__html:data.title}} />
                    </div>
                )}
                
                <SocialIconsGrid />

                {modular && modular?.length > 0 && (
                    <SocialGrid modular={modular} />
                )}
                
            </div>
        </section>
    )
}