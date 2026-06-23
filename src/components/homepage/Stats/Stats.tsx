import './stats.css'
import StatsCounter from './StatsCounter'

export default function HomeStats() {
    return (
        <section className="stats_section">
            <div className="container">
                <div className="stats_wrapper" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <ul>
                        <li>Pioneer as 1<sup>st</sup> Health University Category in the State</li>
                        <li>Ranked amongst the best
                            <figcaption>
                                <span className="stats_no">
                                    22
                                </span>
                                <span>
                                    nd
                                    <p>Private Universities</p>
                                </span>
                            </figcaption>
                        </li>
                        <li><img src="/images/homepage/stats/qs-logo.webp" className="img-fluid" alt="qs logo" /> </li>
                    </ul>
                </div>

                <StatsCounter />
            </div>
        </section>
    )
}