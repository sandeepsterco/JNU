import Image from 'next/image';
import './social.css'

interface SocialInterface{
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

export default function HomeSocial({data, modular}:SocialPropsInterface) {
    console.log('homepage',modular);
    return (
        <section className="jnu_social_wall">
            <div className="container">
                {data?.title && (
                    <div className="head_title">
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" dangerouslySetInnerHTML={{__html:data.title}} />
                    </div>
                )}
                
                <ul className="social_media_link" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <li><a href="#"><img src="/images/icons/social/facebook.svg" className="img-fluid" alt="facebook" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/twitter.svg" className="img-fluid" alt="twitter" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/youtube.svg" className="img-fluid" alt="youtube" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/instagram.svg" className="img-fluid" alt="instagram" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/linkedin.svg" className="img-fluid" alt="linkedin" /></a></li>
                </ul>

                {modular && modular?.length > 0 && (
                    <ul className="social_wall_grid">
                        {modular.map((item, idx)=>(
                            <li key={idx}>
                                <Image width={368} height={460} src={item?.image} className="img-fluid image" alt={item?.name ?? 'News Image'} />
                            </li>
                        ))}
                    </ul>
                )}

                
            </div>
        </section>
    )
}