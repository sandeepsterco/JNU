import Link from 'next/link'
import { BASE_URL } from '@/config/config'
import './header.css'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="main_header">
            <div className="container-fluid">
                <Link href={BASE_URL ?? '/'} className="site_navbar">
                    <Image src="/images/logo.webp" width={344} height={63} className="img-fluid" alt="JNU" loading='eager' fetchPriority='high' />
                    <Image src="/images/naacgrade-a-logo.webp" width={188} height={61} className="img-fluid" alt="JNU" loading='eager' fetchPriority='high' />
                </Link>
                <ul className="site_nav">
                    <li><a href="#">Academics</a></li>
                    <li><a href="#">Programs</a></li>
                    <li><a href="#">Research</a></li>
                    <li><a href="#">Campus Life</a></li>
                    <li><a href="#">Placements</a></li>
                    <li className="site_dropdown"><a href="#">Admission</a>
                        <ul className="site_dropdown_menu">
                            <li><a href="#">Dropdown 1</a></li>
                            <li><a href="#">Dropdown 2</a></li>
                            <li><a href="#">Dropdown 3</a></li>
                            <li><a href="#">Dropdown 4</a></li>
                            <li><a href="#">Dropdown 5</a></li>
                            <li><a href="#">Dropdown 6</a></li>
                        </ul>
                    </li>
                </ul>
                <div className="nav_right">
                    <button className="search_btn" type="button">
                        <img src="/images/icons/search-icon.svg" alt="search" className="img-fluid" />
                    </button>
                    <button className="phone_icon" type="button">
                        <img src="/images/icons/phone-icon.svg" alt="phone" className="img-fluid" />
                    </button>
                    <button className="hamb_btn" type="button">
                        <img src="/images/icons/hemburgure-icon.svg" alt="hemburgure" className="img-fluid" />
                    </button>
                </div>
            </div>
        </header>
    )
}