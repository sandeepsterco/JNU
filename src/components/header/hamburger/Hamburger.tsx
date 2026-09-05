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

  // const { data, error } = await apiFetch(`sidebar`)

  // const hamburgerData = data?.sidebar ?? []

  // useEffect(() => {
  //   document.body.classList.toggle("hamburger-overlay", isOpen);
  // }, [isOpen]);

  console.log('hamburger data',data);

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
            <div className="hambur_close" onClick={() => setIsOpen(false)}>
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
                              <a href={`${BASE_URL}${childItem.slug}`}>{childItem.title}</a>
                            </li>    
                          ))}
                        </ul>  
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* <div className="hamp_topgrid">
              <div className="menu_col">
                <div className="hamburger_item">
                  <h3>About Us</h3>
                  <ul>
                    <li>
                      <a href="#">University at Glance</a>
                    </li>
                    <li>
                      <a href="#">JNU at UAE</a>
                    </li>
                    <li>
                      <a href="#">JNU Hospital</a>
                    </li>
                    <li>
                      <a href="#">Leadership</a>
                    </li>
                    <li>
                      <a href="#">Social Responsibility</a>
                    </li>
                    <li>
                      <a href="#">Accreditations &amp; Recognitions</a>
                    </li>
                    <li>
                      <a href="#">Committees</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu_col">
                <div className="hamburger_item">
                  <h3>Academics</h3>
                  <ul>
                    <li>
                      <a href="#">Schools and List</a>
                    </li>
                    <li>
                      <a href="#">Programs</a>
                    </li>
                    <li>
                      <a href="#">Faculties</a>
                    </li>
                    <li>
                      <a href="#">Collaborations &amp; Partnerships</a>
                    </li>
                    <li>
                      <a href="#">Library</a>
                    </li>
                    <li>
                      <a href="#">Examinations &amp; Results</a>
                    </li>
                    <li>
                      <a href="#">Learning Facilities</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu_col">
                <div className="hamburger_item">
                  <h3>Research &amp; Innovation</h3>
                  <ul>
                    <li>
                      <a href="#">Research Highlights</a>
                    </li>
                    <li>
                      <a href="#">Dr. Ambedkar Chair</a>
                    </li>
                    <li>
                      <a href="#">Publications &amp; Patents</a>
                    </li>
                    <li>
                      <a href="#">Innovation and Incubation Cell</a>
                    </li>
                    <li>
                      <a href="#">Centers of Excellence</a>
                    </li>
                    <li>
                      <a href="#">Funded projects</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="hamp_topgrid">
              <div className="menu_col">
                <div className="hamburger_item">
                  <h3>Placements</h3>
                  <ul>
                    <li>
                      <a href="#">Student's Corner</a>
                    </li>
                    <li>
                      <a href="#">Recruiter's Corner</a>
                    </li>
                    <li>
                      <a href="#">Alumni Network</a>
                    </li>
                    <li>
                      <a href="#">Placement Highlights</a>
                    </li>
                    <li>
                      <a href="#">Career Guidance</a>
                    </li>
                    <li>
                      <a href="#">Collaborations</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu_col">
                <div className="hamburger_item">
                  <h3>Campus Life</h3>
                  <ul>
                    <li>
                      <a href="#">Gallery</a>
                    </li>
                    <li>
                      <a href="#">Academic Facilities</a>
                    </li>
                    <li>
                      <a href="#">Sports Facilities</a>
                    </li>
                    <li>
                      <a href="#">Hostel Facilities</a>
                    </li>
                    <li>
                      <a href="#">Transportation</a>
                    </li>
                    <li>
                      <a href="#">Events</a>
                    </li>
                    <li>
                      <a href="#">Student Clubs &amp; Societies</a>
                    </li>
                    <li>
                      <a href="#">Social Services</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hamburger_item">
                <h3>Admissions</h3>
                <ul>
                  <li>
                    <a href="#">Download Prospectus</a>
                  </li>
                  <li>
                    <a href="#">Book Campus Tour</a>
                  </li>
                  <li>
                    <a href="#">Admission Process</a>
                  </li>
                  <li>
                    <a href="#">Course, Eligibility &amp; Fee Structure</a>
                  </li>
                  <li>
                    <a href="#">Student Speaks</a>
                  </li>
                  <li>
                    <a href="#">Scholarships &amp; Financial Aid</a>
                  </li>
                  <li>
                    <a href="#">International Admissions</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                </ul>
              </div>
            </div> */}
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
