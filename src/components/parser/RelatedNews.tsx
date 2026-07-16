import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { getSlug } from "@/lib/getSlug"
import Image from "next/image";
import Link from "next/link";

interface NewsDataInterface{
    name:string;
    date:string;
    image:string;
    slug:string;
    id:number;
}

interface ResponseDataInterface{
    relatedNews:NewsDataInterface[]
}

const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

export default async function RelatedNews() {
    const parentSlug = await getSlug(0);
    const slug = await getSlug();

    const {data, error} = await apiFetch(`${parentSlug}/${slug}`)

    if(error){
        throw new Error('Failed to fetch Related News Data')
    }

    const relatedNews = (data as ResponseDataInterface)?.relatedNews ?? [];

    return (
        <div className="related_news">
            {relatedNews?.map((item)=>(
                <div key={item.id} className="related_news_box">
                    <div className="related_image">
                        <figure>
                            <Image src={item.image} alt={item.name} width={522} height={306} loading="lazy" />
                        </figure>
                        {item?.date && (
                            <div className="related_date">
                                <p>{formatDate(item.date)}</p>
                            </div>
                        )}  
                        
                    </div>
                    <p dangerouslySetInnerHTML={{__html:item.name}} />
                    <Link
                        className="overlap_btn" 
                        href={`${BASE_URL}${parentSlug}/${item.slug}`}>test</Link>
                </div>
            ))}
            
        </div>
    )
}