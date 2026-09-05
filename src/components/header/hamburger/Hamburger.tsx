"use client";

import { BASE_URL } from "@/config/config";
import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

const getHamburgerData = async()=>{
  try{
    const {data, error} = await apiFetch(`sidebar`);

    if(error){
      throw new Error(error);
    }
    return data.sidebar;
  }catch(error){
    throw error instanceof Error ? error : new Error('Failed to fetch hamburger data')
  }
}

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey:['hamburger'],
    queryFn:getHamburgerData
  })

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
        <button className="search_btn" type="button">
          <img
            src="/images/icons/search-icon.svg"
            alt="search"
            className="img-fluid"
          />
        </button>

        <button className="phone_icon" type="button">
          <img
            src="/images/icons/phone-icon.svg"
            alt="phone"
            className="img-fluid"
          />
        </button>

        <button
          className="hamb_btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/images/icons/hemburgure-icon.svg"
            alt="hamburger"
            className="img-fluid"
          />
        </button>
      </div>

      <div className={`hamburger_menu ${isOpen ? "is-open" : ""}`}>
        <div className="hamburger_menu_header">
          <div className="ham_menutop">
            <div className="hambur_close" onClick={closeMenu}>
              <img
                src="/images/icons/ham_close.svg"
                alt="hamburger"
                className="img-fluid"
              />
            </div>

            {data?.length > 0 && (
              <div className="hamp_topgrid">
                {data.map((item:any, idx:number)=>(
                  <div key={idx} className="menu_col">
                    <div className="hamburger_item">
                      <h3>{item.title}</h3>
                      {item?.children.length > 0 && (
                        <ul>
                          {item.children.map((childItem:any, childIdx:number)=>(
                            <li key={childIdx}>
                              <Link href={`${BASE_URL}${childItem.slug}`} onClick={closeMenu}>{childItem.title}</Link>
                            </li>    
                          ))}
                        </ul>  
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        <div className="hambur_btmsec">
          <ul className="hamber_btmmenu">
            <li>
              <Link href={`${BASE_URL}careers`}>Careers</Link>
            </li>
            <li>
            <Link href={`${BASE_URL}study-jnu`}>Study @ JNU</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}contact`}>Contact</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}erp-login`}>ERP Login</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}disclosure`}>Public - Self Disclosure</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}policies`}>Policies</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}ugc-portal`}>UGC e-Samadhaan Portal</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}holidays-calendar`}>Holidays Calendar</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}downloads`}>Downloads</Link>
            </li>

            <li>
              <Link href={`${BASE_URL}mandatory-disclosures`}>Mandatory Disclosures</Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </>
  );
}
