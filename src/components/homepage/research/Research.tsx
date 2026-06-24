import './research.css'
import ResearchSlider from './ResearchSlider'

export default function HomeResearch() {
    return (
        <section className="research_section">
            <div className="container">
                <div className="research_header">
                    <div className="head_title">
                        <h3 className="font18" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">RESEARCH</h3>
                        <blockquote data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Advancing Knowledge, <br />Driving Innovation</blockquote>
                    </div>
                    <div className="research_header_right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                        <a href="#"><img src="/images/icons/nav-arrow-next.svg" className="img-fluid" alt="arrow" /></a>
                    </div>
                </div>
            </div>

            <ResearchSlider />
        </section>
    )
}