'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BASE_URL } from '@/config/config'
import Hamburger from './hamburger/Hamburger'
import type { HeaderMenuItem } from './Header'

export default function HeaderNav({ headerData }: { headerData: HeaderMenuItem[] }) {
    const pathname = usePathname();

    const isDepartment = pathname.includes('department');

    if(isDepartment) return;

    return (
        <>
            <ul className="site_nav">
                {headerData.map((item, idx) => {
                    const isActive = pathname === `${BASE_URL}${item.slug}` || pathname === item.slug
                    return (
                        <li
                            key={idx}
                            className={`${item?.children?.length > 0 ? 'site_dropdown' : ''} ${isActive ? 'active' : ''}`}
                        >
                            <Link href={`${BASE_URL}${item.slug}`}>{item.title}</Link>
                            {item?.children?.length > 0 && (
                                <ul className="site_dropdown_menu">
                                    {item.children.map((innerItem, innerIdx) => (
                                        <li key={innerIdx}>
                                            <Link href={`${BASE_URL}${innerItem.slug}`}>{innerItem.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
            <Hamburger />
        </>
    )
}