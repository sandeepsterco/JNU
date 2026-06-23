import Image from 'next/image'
import Collaborations from './Collaborations'
import './whyChoose.css'

export default function WhyChoose() {
    return (
        <section className="why_choose">
            <div className="container">
                <div className="head_title">
                    <h2 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">WHY CHOOSE JNU JAIPUR</h2>
                    <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Accreditation, Global Recognition, and <br />Commitment to Excellence</blockquote>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="why_jnu">
                            <ul>
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                    <h4>Ranked among Top 25</h4>
                                    <p>Best Private Universities in India by India Today (2019)</p>
                                </li>
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                    <h4>#1 in Rajasthan</h4>
                                    <p>Best Private University One Planet Research, 2013</p>
                                </li>
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                    <h4>Education Excellence</h4>
                                    <p>Rajasthan Education Excellence Award, 2022</p>
                                </li>
                            </ul>
                            <a href="#0" className="load_more" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">Load More <figure><img src="/images/icons/nav-arrow-down.svg" className="img-fluid"
                                alt="arrow" /></figure></a>
                        </div>
                    </div>
                </div>

            </div>


            <div className="why_background">
                <figure><Image width={2545} height={650} loading='lazy' src="/images/why/why-jnu.webp" className="img-fluid image2" alt="why jnu" /></figure>
                <div className="why_background_footer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="container">
                        <div className="why_grid">
                            <ul>
                                <li><a href="#">Global Educational Experience</a></li>
                                <li><a href="#">Centers of Excellence</a></li>
                                <li><a href="#">Industry Collaboration</a></li>
                            </ul>
                            <div className="why_btn">
                                <a className="virtual_tour">
                                    <figure><img src="/images/icons/360-degrees.svg" className="img-fluid" alt="360" /></figure> Virtual Tour
                                </a>
                                <a className="apply_now">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Collaborations />
        </section>
    )
}