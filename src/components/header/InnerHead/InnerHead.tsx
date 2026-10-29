'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './innerHead.css'
import { BASE_URL } from '@/config/config'

interface TabsInterface {
  slug: string
  title: string
  overwrite_url?: string | null
  target_blank?: number | string
}

interface HeadInterface {
  headData: {
    tab_title?: string
    page_title?: string
    page_slug?: string
    name?: string
    school_name?: string
    admission?: string
    tabs?: TabsInterface[]
  }
}

export default function InnerHead({ headData }: HeadInterface) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const slug = segments[0]
  const childSlug = segments[1] ?? ''

  const isNewsDetailPage =
    slug === 'news-events' &&
    childSlug.trim() !== '' &&
    childSlug !== slug

  if (isNewsDetailPage) return null

  return (
    <section className="inner_head">
      <div className="container">
        {(headData?.tab_title ||
          headData?.page_title ||
          headData?.name) && (
          <h1
            dangerouslySetInnerHTML={{
              __html:
                headData.name ||
                headData.tab_title ||
                headData.page_title ||
                '',
            }}
          />
        )}

        {headData?.school_name && (
          <ul className="breadcrumb">
            <li>{headData.school_name}</li>

            {headData?.admission && (
              <li>{headData.admission}</li>
            )}
          </ul>
        )}

        {headData?.tabs && headData.tabs.length > 0 && (
          <ul className="inner_nav">
            {headData.tabs.map((item, idx) => {
              const href = item.overwrite_url
                ? item.overwrite_url
                : `${BASE_URL}${item.slug}`

              const opensNewTab =
                Number(item.target_blank) === 1

              const isExternal =
                /^https?:\/\//i.test(href)

              const isActive =
                !isExternal &&
                (
                  pathname.replace(/\/$/, '') ===
                    `/${item.slug}`.replace(/\/$/, '') ||
                  pathname.replace(/\/$/, '') ===
                    `${BASE_URL}${item.slug}`.replace(/\/$/, '')
                )

              return (
                <li key={item.slug || idx}>
                  <Link
                    href={href}
                    className={isActive ? 'active' : ''}
                    target={
                      opensNewTab ? '_blank' : undefined
                    }
                    rel={
                      opensNewTab
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}