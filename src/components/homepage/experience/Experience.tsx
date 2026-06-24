import './experience.css'
import ExperienceTabs from './ExperienceTabs';

export default function Experience() {
    return (
        <>
            <section className="experience_university">
                <div className="container">
                    <div className="experience_header">
                        <div className="head_title">
                            <h3
                                className="font18"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="200"
                            >
                                EXPERIENCE THE UNIVERSITY
                            </h3>

                            <blockquote
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="400"
                            >
                                Beyond Classrooms, Into Community
                            </blockquote>

                            <p
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="600"
                            >
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            </p>

                            <a
                                href="#"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="800"
                            >
                                <img
                                    src="/images/icons/nav-arrow-next.svg"
                                    className="img-fluid"
                                    alt="arrow"
                                />
                            </a>
                        </div>

                        <div className="experience_header_right">
                            <ul>
                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    <h5>
                                        150<sup>+</sup>
                                    </h5>
                                    <p>Acres Green Campus</p>
                                </li>

                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="600"
                                >
                                    <h5>
                                        300<sup>+</sup>
                                    </h5>
                                    <p>State-of-the-Art Labs</p>
                                </li>

                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="1000"
                                >
                                    <h5>
                                        250<sup>+</sup>
                                    </h5>
                                    <p>Smart Classrooms</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <ExperienceTabs />
        </>
    );
}