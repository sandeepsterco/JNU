import Link from 'next/link'
import { API_URL, BASE_URL } from '@/config/config'
import Image from 'next/image'
import apiFetch from '@/lib/api'
import './header.css'
import { headers } from 'next/headers'
import { getSlug } from '@/lib/getSlug'
import HeaderScroll from './HeaderScroll'

interface ChildItemInterface {
    title: string
    slug: string
}

interface HeaderMenuItem {
    title: string
    slug: string
    children: ChildItemInterface[]
}

interface HeaderResponse {
    header: HeaderMenuItem[]
}

export default async function Header() {
    const headerList = await headers()
    const pathname = headerList.get('x-pathname') ?? ''
    const { data, error } = await apiFetch(`header`)

    const headerData = (data as HeaderResponse)?.header ?? []

    const isHomePage = pathname === '/'
    const isSchoolPage = pathname.includes('program')

    const baseClass = `main_header ${
        isHomePage ? 'home_header' : !isSchoolPage ? 'inner_header' : ''
    }`

    return (
        <HeaderScroll baseClass={baseClass}>
            <div className="container-fluid">
                <Link href={BASE_URL ?? '/'} className="site_navbar">
                    <Image src="/images/logo.webp" width={344} height={63} className="img-fluid" alt="JNU" loading="eager" fetchPriority="high" />
                    <Image src="/images/naacgrade-a-logo.webp" width={188} height={61} className="img-fluid" alt="JNU" loading="eager" fetchPriority="high" />
                </Link>
                <ul className="site_nav">
                    {headerData && headerData?.length > 0 &&
                        headerData.map((item, idx) => (
                            <li key={idx} className={item?.children?.length > 0 ? 'site_dropdown' : ''}>
                                <Link href={`${BASE_URL}${item.slug}`}>{item.title}</Link>
                                {item?.children?.length > 0 && (
                                    <ul className="site_dropdown_menu">
                                        {item?.children.map((innerItem, innerIdx) => (
                                            <li key={innerIdx}>
                                                <Link href={`${BASE_URL}${innerItem.slug}`}>{innerItem.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
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
        </HeaderScroll>
    )
}