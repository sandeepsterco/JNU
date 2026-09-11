import Link from "next/link";
import './admission_dropdown.css'

export default function AdmissionDropdown() {
    return (
      <aside
        className="admission_drop_menu"
        style={{ backgroundImage: "url('/images/admission-background.webp')" }}
      >
        <div className="admission_left">
          <blockquote>A World of Opportunities Awaits</blockquote>
          <ul className="admission_menu">
            <li><Link href="#">Book Campus Tour</Link></li>
            <li><Link href="#">Admission Process</Link></li>
            <li><Link href="#">Course, Eligibility &amp; Fee Structure</Link></li>
            <li><Link href="#">Student Speaks</Link></li>
            <li><Link href="#">Scholarships &amp; Financial Aid</Link></li>
            <li><Link href="#">International Admissions</Link></li>
            <li><Link href="#">FAQs</Link></li>
          </ul>
        </div>
  
        <div className="admission_right">
          <div className="admission_grid">
            <div className="header_program_bx">
              <blockquote>B.Tech.</blockquote>
              <Link href="#">Computer Science &amp; Engineering</Link>
              <p>(5 years Programme)</p>
              <Link href="#" className="prog_apply_now">Apply Now 2026</Link>
            </div>
            <div className="header_program_bx">
              <blockquote>Ph.D.</blockquote>
              <Link href="#">Biomedical Engineering</Link>
              <p>(5 years Programme)</p>
              <Link href="#" className="prog_apply_now">Apply Now 2026</Link>
            </div>
          </div>
  
          <div className="admission_Bx">
            <p>Take the First Step Towards Excellence</p>
            <ul>
              <li>
                <a href="tel:18001021900">
                  <img src="/images/phone-yellow.svg" className="img-fluid" alt="phone" />
                  1800-102-1900
                </a>
              </li>
              <li>
                <a href="mailto:admissions@jnujaipur.ac.in">
                  <img src="/images/mail-yellow.svg" className="img-fluid" alt="mail" />
                  admissions@jnujaipur.ac.in
                </a>
              </li>
            </ul>
  
            <div className="banner_btn">
              <a href="#" className="download_brochure">
                <img src="/images/pdf-icon.svg" className="img-fluid" alt="Download Brochure" />
                Download Brochure
              </a>
              <a href="#0" className="apply_now">Apply Now</a>
            </div>
          </div>
        </div>
      </aside>
    )
  }