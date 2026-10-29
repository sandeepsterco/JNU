import Image from "next/image"
import type { SocialInterface } from "./Social"
import Link from "next/link"

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
                   {/* <div className="social_linkicon">
                    <Image width={29} height={29}  src="https://project-demo.in/jnu-jaipur/assets/img/support-info/1782820570_X2s1pPNExvde9k2z3vMl.svg" className="img-fluid" alt="linkedin"/>
                   </div> */}
                        <Link href={item?.url} className="streched_link" target="_blank"></Link>
                    </li>
                ))}
            </ul>
        </>
    )
}