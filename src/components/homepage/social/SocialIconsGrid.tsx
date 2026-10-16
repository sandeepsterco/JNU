import apiFetch from "@/lib/api";
import Link from "next/link";

export default async function SocialIconsGrid() {
    const {data:apiData, error} = await apiFetch(`info`);

    if(error || !apiData.status) throw new Error(`Failed to fetch Social Data`)

    return (
        <ul className="social_media_link" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            {apiData.data
                .filter((item: any) => (item.key == 'facebook' || item.key == 'twitter' || item.key == 'youtube' || item.key == 'instagram' || item.key == 'linkedin'))
                .map((item: any) => (
                    <li key={item.key}>
                        <Link href={item.value ?? ''}>
                            <img src={item.image} className="img-fluid" alt={item.key} />
                        </Link>
                    </li>
                ))}
        </ul>
    )
}