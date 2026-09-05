"use client"
import { BASE_URL } from "@/config/config";
import Link from "next/link";

export default function FooterData({headerRes, quickLinksData, infoData}:{headerRes:any, quickLinksData:any, infoData:any}){
    return(
        <footer data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="container">
                <div className="footer_grid">
                    <div className="footer_left">
                        {headerRes?.data?.footer && (
                            <ul className="footer_link">
                                {headerRes?.data?.footer.map((item:any, idx:number)=>(
                                    <li key={idx}>
                                        <Link href={`${BASE_URL}${item.slug}`}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        <div className="quick_link">
                            <h4 className="font18">Quick Links</h4>
                            <ul>
                                {quickLinksData.map((item:any, idx:number)=>(
                                    <li key={idx}>
                                        <Link href={`${BASE_URL}${item.slug}`}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className="footer_right">
                        <div className="footer_logo">
                            <figure><img src="/images/footer-logo.webp" className="img-fluid" alt="logo" /></figure>
                            <ul className="social_media_link">
                                {infoData
                                    .filter((item:any)=>(item.key == 'facebook' || item.key == 'twitter' || item.key == 'youtube' || item.key == 'instagram' || item.key == 'linkedin'))
                                    .map((item:any)=>(
                                        <li key={item.key}>
                                            <Link href={item.value ?? ''}>
                                                <img src={item.image} className="img-fluid" alt={item.key} />
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom">
                    <div className="footer_bottom_left">
                        <p>© Copyright 2026 - JNU. All Rights Reserved.</p>
                    </div>
                    <div className="footer_bottom_right">
                        <p>Website Design and Development by <a href="https://www.stercodigitex.com/" target="_blank">Sterco</a> </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}