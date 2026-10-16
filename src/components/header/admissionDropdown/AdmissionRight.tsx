import parse from "html-react-parser";
import Link from "next/link";

export default function AdmissionDropdownRight({getValue}:{getValue:any}){
    return(
        <div className="admission_right">
          <div className="admission_grid">
            {getValue('btech')?.value && (
              <div className="header_program_bx">
                {parse(getValue('btech')?.value)}
              </div>
            )}
            
            {getValue('phd')?.value && (
              <div className="header_program_bx">
                {parse(getValue('phd')?.value)}
              </div>
            )}
            
          </div>
  
          <div className="admission_Bx">
            <p>Take the First Step Towards Excellence</p>
            <ul>
              {getValue('toll')?.value && (
                <li>
                  <a href={`tel:${getValue('toll')?.value}`}>
                    <figure> <img src="/images/icons/phone-yellow.svg" className="img-fluid" alt="phone" /></figure>
                    {getValue('toll')?.value}
                  </a>
                </li>
              )}
              
              <li>
                <a href={`mailto:${getValue('admission_mail')?.value}`}>
                <figure> <img src="/images/icons/mail-yellow.svg" className="img-fluid" alt="mail" /></figure>
                {getValue('admission_mail')?.value}
                </a>
              </li>
            </ul>
  
            <div className="banner_btn">
              <a href={getValue('brochure')?.value} target="_blank" className="download_brochure">
              <figure><img src="/images/icons/pdf-icon.svg" className="img-fluid" alt="Download Brochure" /></figure>
                Download Brochure
              </a>
              <Link href={getValue('apply_now')?.value || '/apply-now'} className="apply_now">Apply Now</Link>
            </div>
          </div>
        </div>
    )
}