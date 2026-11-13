import { getSlug } from "@/lib/getSlug"
import Image from "next/image";

interface NewsDataInterface{
    name:string;
    date:string;
    image:string;
    slug:string;
    id:number;
    short_description?:string;
}

interface ResponseDataInterface{
    data:{
        modular:{
            [`news-events`]:NewsDataInterface[]
        }
    }
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default async function AmbedkarEvents({data}:{data:ResponseDataInterface}) {
    const modularData = data?.data?.modular;

    if(!modularData) return;

    const newsData = modularData?.['news-events'] ?? [];

    return (
        <div className="am_chair_event_ist">
            {newsData?.map((item)=>(
                <div className="am_chair_evtbx"  data-aos="fade-up" data-aos-delay="700">
                        <figure>
                            <Image src={item.image} alt={item.name} loading="lazy" width={500} height={400} />
                        </figure>
                        <div className="amchair_ev_content">
                            {item?.date && (
                                <span className="am_evt_date">{formatDate(item.date)}</span>
                            )}
                            
                            {item?.name && (
                                <h5 className="font21" dangerouslySetInnerHTML={{ __html: item.name }} />
                            )}
                            {item?.short_description && (
                                <p dangerouslySetInnerHTML={{ __html: item.short_description }} />
                            )}
                            
                        </div>
                    </div>
            ))}
            
        </div>
    )
}