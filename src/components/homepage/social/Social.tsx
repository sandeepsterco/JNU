import Image from 'next/image';
import './social.css'
import apiFetch from '@/lib/api';
import Link from 'next/link';

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

export default async function HomeSocial({data, modular}:SocialPropsInterface) {
    const {data:apiData, error} = await apiFetch(`info`);

    return (
        <section className="jnu_social_wall">
            <div className="container">
                {data?.title && (
                    <div className="head_title">
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" dangerouslySetInnerHTML={{__html:data.title}} />
                    </div>
                )}
                
                <ul className="social_media_link" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    {apiData.data
                        .filter((item:any)=>(item.key == 'facebook' || item.key == 'twitter' || item.key == 'youtube' || item.key == 'instagram' || item.key == 'linkedin'))
                        .map((item:any)=>(
                            <li key={item.key}>
                                <Link href={item.value ?? ''}>
                                    <img src={item.image} className="img-fluid" alt={item.key} />
                                </Link>
                            </li>
                        ))}
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