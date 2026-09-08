"use client";

import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

const getHamburgerData = async () => {
  try {
    const { data, error } = await apiFetch(`sidebar`);

    if (error) {
      throw new Error(error);
    }

    return data.sidebar;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch hamburger data");
  }
};

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["hamburger"],
    queryFn: getHamburgerData,
  });

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.classList.toggle("hamburger-overlay", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.classList.remove("hamburger-overlay");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="nav_right">

        {/* Search Button */}
        <button
          className="search_btn"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
        >
          <img
            src="/images/icons/search-icon.svg"
            alt="search"
            className="img-fluid"
          />
        </button>

        {/* Phone */}
        <button
          className="phone_icon"
          type="button"
          aria-label="Phone"
        >
          <a href="tel:0141 3127028"><img
            src="/images/icons/phone-icon.svg"
            alt="phone"
            className="img-fluid"
          /></a>
          
        </button>

        {/* Hamburger */}
        <button
          className="hamb_btn"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <img
            src="/images/icons/hemburgure-icon.svg"
            alt="hamburger"
            className="img-fluid"
          />
        </button>

      </div>

      {/* Search Popup */}
      <div className={`search_popup ${searchOpen ? "is-open" : ""}`}>
        <div className="search_popup_inner">

          <button
            type="button"
            className="search_close"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <span></span>
            <span></span>
          </button>

          <form className="search_form">
            <input
              type="text"
              placeholder="Search here..."
              autoFocus={searchOpen}
            />

            <button
              type="submit"
              className="search_submit"
              aria-label="Search"
            >
              <img
                src="/images/icons/search-icon.svg"
                alt="Search"
                className="img-fluid"
              />
            </button>
          </form>

        </div>
      </div>

      {/* Hamburger Menu */}
      <div className={`hamburger_menu ${isOpen ? "is-open" : ""}`}>
        <div className="hamburger_menu_header">

          <div className="ham_menutop">

            {/* Close */}
            <div className="hambur_close" onClick={closeMenu}>
              <img
                src="/images/icons/ham_close.svg"
                alt="Close hamburger"
                className="img-fluid"
              />
            </div>

            {/* Dynamic Menu */}
            {data?.length > 0 && (
              <div className="hamp_topgrid">
                {data.map((item: any, idx: number) => (
                  <div key={idx} className="menu_col">
                    <div className="hamburger_item">

                      <h3>{item.title}</h3>

                      {item?.children?.length > 0 && (
                        <ul>
                          {item.children.map(
                            (childItem: any, childIdx: number) => (
                              <li key={childIdx}>
                                <Link
                                  href={`${BASE_URL}${childItem.slug}`}
                                  onClick={closeMenu}
                                >
                                  {childItem.title}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Bottom Menu */}
          <div className="hambur_btmsec">
            <ul className="hamber_btmmenu">

              <li>
                <Link href={`${BASE_URL}careers`} onClick={closeMenu}>
                  Careers
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}study-jnu`} onClick={closeMenu}>
                  Study @ JNU
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}contact`} onClick={closeMenu}>
                  Contact
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}erp-login`} onClick={closeMenu}>
                  ERP Login
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}disclosure`} onClick={closeMenu}>
                  Public - Self Disclosure
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}policies`} onClick={closeMenu}>
                  Policies
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}ugc-portal`} onClick={closeMenu}>
                  UGC e-Samadhaan Portal
                </Link>
              </li>

              <li>
                <Link
                  href={`${BASE_URL}holidays-calendar`}
                  onClick={closeMenu}
                >
                  Holidays Calendar
                </Link>
              </li>

              <li>
                <Link href={`${BASE_URL}downloads`} onClick={closeMenu}>
                  Downloads
                </Link>
              </li>

              <li>
                <Link
                  href={`${BASE_URL}mandatory-disclosures`}
                  onClick={closeMenu}
                >
                  Mandatory Disclosures
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </>
  );
}