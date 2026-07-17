import FaqTabs from './FaqTabs';
import './faq.css'

export interface ModularFAQInterface {
    question: string;
    answer: string;
    type: string;
    slug: string;
}

interface FAQInterface {
    data?: {
        title: string;
    } | null,
    modular: ModularFAQInterface[];
}


export default function FAQs({ data, modular }: FAQInterface) {

    return (
        <section className="faq_section custom-tabs" id='faqs'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        {data?.title && (
                            <h4
                                className="font42"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="200"
                                dangerouslySetInnerHTML={{ __html: data.title }}
                            />
                        )}

                        <FaqTabs modular={modular} />
                    </div>
                </div>
            </div>
        </section>
    )
}