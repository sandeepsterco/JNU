// InnerHead.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './innerHead.css'
import { BASE_URL } from '@/config/config';

interface TabsInterface {
    slug: string;
    title: string;
}

interface HeadInterface {
    headData: {
        tab_title?: string;
        page_title?: string;
        page_slug?: string;
        name?: string;
        school_name?: string;
        admission?: string;
        tabs?: TabsInterface[];
    }
}

export default function InnerHead({ headData }: HeadInterface) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const slug = segments[0];
    const childSlug = segments[1] ?? "";

    const isNewsDetailPage =
    slug === "news-events" && childSlug.trim() !== "" && childSlug !== slug;

    if (isNewsDetailPage) return;

    return (
        <section className="inner_head">
            <div className="container">
                {(headData?.tab_title || headData?.page_title || headData?.name) && (
                    <h1 dangerouslySetInnerHTML={{ __html: headData.name || headData.tab_title || headData.page_title || "" }} />
                )}

                {headData?.school_name && (
                    <ul className="breadcrumb">
                        <li>{headData.school_name}</li>
                        {headData?.admission && (
                            <li>{headData.admission}</li>
                        )}
                    </ul>
                )}

                {headData?.tabs && (
                    <ul className="inner_nav">
                        {headData.tabs.map((item, idx) => {
                            const isActive = pathname?.replace(/\/$/, '') === `${item.slug}`.replace(/\/$/, '')
                                || pathname?.replace(/\/$/, '') === `${BASE_URL}${item.slug}`.replace(/\/$/, '');

                            return (
                                <li key={idx}>
                                    <Link
                                        href={`${BASE_URL}${item.slug}`}
                                        className={isActive ? 'active' : ''}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    )
}