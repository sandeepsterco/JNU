'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BASE_URL } from '@/config/config'
import Hamburger from './hamburger/Hamburger'
import AdmissionDropdown from './admissionDropdown/AdmissionDropdown'
import type { HamburgerMenuItem, HeaderMenuItem } from './Header'

export default function HeaderNav({
  headerData,
  sidebarData,
  parentSlug,
  schoolId,
}: {
  headerData: HeaderMenuItem[]
  sidebarData: HamburgerMenuItem[]
  parentSlug?: string
  schoolId?:number
}) {
  const pathname = usePathname()
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const isDepartment = pathname.includes('department')

  if (isDepartment) return null

  const isAdmissionItem = (item: HeaderMenuItem) =>
    item.slug?.toLowerCase().includes('admission')

  const isProgramItem = (item: HeaderMenuItem) =>
    item.slug?.toLowerCase().includes('programs')

  // Get the URL for a menu item
  const getHref = (item: HeaderMenuItem) => {
    if (item.overwrite_url) {
      return item.overwrite_url
    }

    return parentSlug
      ? `${BASE_URL}${parentSlug}/${item.slug}`
      : `${BASE_URL}${item.slug}`
  }

  // Respect the target_blank value returned by the API
  const getTarget = (item: HeaderMenuItem) =>
    Number(item.target_blank) === 1 ? '_blank' : undefined

  const getRel = (item: HeaderMenuItem) =>
    Number(item.target_blank) === 1
      ? 'noopener noreferrer'
      : undefined

  return (
    <>
      <ul className="site_nav">
        {headerData.map((item, idx) => {
          const href = getHref(item)

          const isActive =
            !item.overwrite_url &&
            (pathname === href ||
              pathname === `${BASE_URL}${item.slug}` ||
              pathname === `/${item.slug}`)

          const hasChildren =
            !!item.children && item.children.length > 0

          const isAdmission = isAdmissionItem(item)
          const isOpen = openSlug === item.slug
          const isProgram = isProgramItem(item)

          return (
            <li
              key={item.slug || idx}
              className={[
                isAdmission
                  ? 'admission_dropdown'
                  : hasChildren
                    ? 'site_dropdown'
                    : '',
                isActive ? 'nav_current' : '',
                isOpen ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => {
                if (isAdmission || hasChildren) {
                  setOpenSlug(item.slug)
                }
              }}
              onMouseLeave={() => {
                if (isAdmission || hasChildren) {
                  setOpenSlug(null)
                }
              }}
            >
              <Link
                href={`${isProgram ? href + `?school=${schoolId}` : href}`}
                target={getTarget(item)}
                rel={getRel(item)}
              >
                {item.title}
              </Link>

              {isAdmission ? (
                <AdmissionDropdown
                  childrens={item.children}
                />
              ) : hasChildren ? (
                <ul className="site_dropdown_menu">
                  {item.children!.map(
                    (innerItem, innerIdx) => {
                      const childHref = innerItem.overwrite_url
                        ? innerItem.overwrite_url
                        : `${BASE_URL}${innerItem.slug}`

                      return (
                        <li key={innerItem.slug || innerIdx}>
                          <Link
                            href={childHref}
                            target={getTarget(innerItem)}
                            rel={getRel(innerItem)}
                          >
                            {innerItem.title}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>

      <Hamburger data={sidebarData} />
    </>
  )
}