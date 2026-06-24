import './social.css'

export default function HomeSocial() {
    return (
        <section className="jnu_social_wall">
            <div className="container">
                <div className="head_title">
                    <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">JNU Social Wall</blockquote>
                </div>
                <ul className="social_media_link" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <li><a href="#"><img src="/images/icons/social/facebook.svg" className="img-fluid" alt="facebook" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/twitter.svg" className="img-fluid" alt="twitter" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/youtube.svg" className="img-fluid" alt="youtube" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/instagram.svg" className="img-fluid" alt="instagram" /></a></li>
                    <li><a href="#"><img src="/images/icons/social/linkedin.svg" className="img-fluid" alt="linkedin" /></a></li>
                </ul>
                <ul className="social_wall_grid">
                    <li><img src="/images/homepage/social/social-wall01.webp" className="img-fluid image" alt="social-wall" /></li>
                    <li><img src="/images/homepage/social/social-wall02.webp" className="img-fluid image" alt="social-wall" /></li>
                    <li><img src="/images/homepage/social/social-wall03.webp" className="img-fluid image" alt="social-wall" /></li>
                    <li><img src="/images/homepage/social/social-wall04.webp" className="img-fluid image" alt="social-wall" /></li>
                </ul>
            </div>
        </section>
    )
}