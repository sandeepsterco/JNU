import './studyjnu.css'

export default function StudyJNU() {
    return (
        <section className="studyjnu_section">
            <div className="max-container-lg">
                <div className="study_at_jnu">
                    <div className="head_title">
                        <h1 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">STUDY AT JNU</h1>
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Igniting Minds, Inspiring Futures</blockquote>
                    </div>

                    <div className="jnu_search" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Programs." aria-label="Search Programs."
                                aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><img
                                src="/images/icons/search-icon.svg" alt="search" className="img-fluid" /></button>
                        </div>
                    </div>
                    <div className="container">
                        <div className="prgrms_grid" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                            <div className="prgrms_Bx">
                                <h4 className="font24">Under Graduate</h4>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula</p>
                                <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                                <a href="#" className="overlap_btn"></a>
                            </div>
                            <div className="prgrms_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <h4 className="font24">Post Graduate</h4>
                                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu</p>
                                <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                                <a href="#" className="overlap_btn"></a>
                            </div>
                            <div className="prgrms_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <h4 className="font24">Doctoral</h4>
                                <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                                <a href="#" className="overlap_btn"></a>
                            </div>
                            <div className="prgrms_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                                <h4 className="font24">Diploma</h4>
                                <p>Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>
                                <span><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></span>
                                <a href="#" className="overlap_btn"></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="studyat_bottom" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="studyat_left">
                        <p>Explore <strong>100+ Programs.</strong> Start Your Future-ready Career</p>
                    </div>
                    <div className="studyat_right">
                        <ul>
                            <li><a href="mailto:admissions@jnujaipur.ac.in">
                                <figure><img src="/images/icons/mail-yellow.svg" className="img-fluid" alt="mail" /></figure>
                                admissions@jnujaipur.ac.in
                            </a></li>
                            <li><a href="tel:1800-102-1900">
                                <figure><img src="/images/icons/phone-yellow.svg" className="img-fluid" alt="phone" /></figure> 1800-102-1900
                            </a></li>

                        </ul>
                        <div className="study_btn">
                            <a className="download_brochure">
                                <figure><img src="/images/icons/pdf-icon.svg" className="img-fluid" alt="mail" /></figure> Download Brochure
                            </a>
                            <a className="apply_now">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}