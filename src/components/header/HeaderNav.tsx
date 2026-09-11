'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BASE_URL } from '@/config/config'
import Hamburger from './hamburger/Hamburger'
import AdmissionDropdown from './admissionDropdown/AdmissionDropdown'
import type { HeaderMenuItem } from './Header'

export default function HeaderNav({
  headerData,
  parentSlug,
}: {
  headerData: HeaderMenuItem[]
  parentSlug?: string
}) {
  const pathname = usePathname()
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const isDepartment = pathname.includes('department')
  if (isDepartment) return null

  const isAdmissionItem = (item: HeaderMenuItem) =>
    item.slug?.toLowerCase().includes('admission')

  return (
    <>
      <ul className="site_nav">
        {headerData.map((item, idx) => {
          const isActive =
            pathname === `${BASE_URL}${item.slug}` || pathname === item.slug
          const hasChildren = item?.children && item.children.length > 0
          const isAdmission = isAdmissionItem(item)
          const isOpen = openSlug === item.slug

          return (
            <li
              key={idx}
              className={[
                isAdmission ? 'admission_dropdown' : hasChildren ? 'site_dropdown' : '',
                isActive ? 'nav_current' : '',
                isOpen ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() =>
                (isAdmission || hasChildren) && setOpenSlug(item.slug)
              }
              onMouseLeave={() =>
                (isAdmission || hasChildren) && setOpenSlug(null)
              }
            >
              <Link
                href={
                  parentSlug
                    ? `${BASE_URL}${parentSlug}/${item.slug}`
                    : `${BASE_URL}${item.slug}`
                }
              >
                {item.title}
              </Link>

              {isAdmission ? (
                <AdmissionDropdown />
              ) : hasChildren ? (
                <ul className="site_dropdown_menu">
                  {item.children!.map((innerItem, innerIdx) => (
                    <li key={innerIdx}>
                      <Link href={`${BASE_URL}${innerItem.slug}`}>
                        {innerItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>

      <Hamburger />
    </>
  )
}