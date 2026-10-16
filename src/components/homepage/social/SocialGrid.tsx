import Image from "next/image"
import type { SocialInterface } from "./Social"

interface PropsInterface {
    modular: SocialInterface[]
}

export default function SocialGrid({ modular }: PropsInterface) {
    return (
        <>

            <ul className="social_wall_grid">
                {modular.map((item, idx) => (
                    <li key={idx}>
                        <Image width={368} height={460} src={item?.image} className="img-fluid image" alt={item?.name ?? 'News Image'} />
                    </li>
                ))}
            </ul>
        </>
    )
}