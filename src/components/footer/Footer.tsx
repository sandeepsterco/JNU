import './footer.css'

export default function Footer() {
    return (
        <footer data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="container">
                <div className="footer_grid">
                    <div className="footer_left">
                        <ul className="footer_link">
                            <li><a href="#">About JNU</a></li>
                            <li><a href="#">Academics</a></li>
                            <li><a href="#">Research & Innovation</a></li>
                            <li><a href="#">Campus Life</a></li>
                            <li><a href="#">Admissions</a></li>
                            <li><a href="#">Placements</a></li>
                        </ul>
                        <div className="quick_link">
                            <h4 className="font18">Quick Links</h4>
                            <ul>
                                <li><a href="#">Study @ JNU</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">ERP Login</a></li>
                                <li><a href="#">Public - Self Disclosure</a></li>
                                <li><a href="#">Policies</a></li>
                                <li><a href="#">UGC e-Samadhaan Portal</a></li>
                                <li><a href="#">Holidays Calendar</a></li>
                                <li><a href="#">Downloads</a></li>
                                <li><a href="#">Mandatory Discloures</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer_right">
                        <div className="footer_logo">
                            <figure><img src="/images/footer-logo.webp" className="img-fluid" alt="logo" /></figure>
                            <ul className="social_media_link">
                                <li><a href="#"><img src="/images/icons/social/facebook.svg" className="img-fluid" alt="facebook" /></a></li>
                                <li><a href="#"><img src="/images/icons/social/twitter.svg" className="img-fluid" alt="twitter" /></a></li>
                                <li><a href="#"><img src="/images/icons/social/youtube.svg" className="img-fluid" alt="youtube" /></a></li>
                                <li><a href="#"><img src="/images/icons/social/instagram.svg" className="img-fluid" alt="instagram" /></a></li>
                                <li><a href="#"><img src="/images/icons/social/linkedin.svg" className="img-fluid" alt="linkedin" /></a></li>
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