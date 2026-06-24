"use client"
import { useState } from 'react'
import './faq.css'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQItem {
    question: string
    answer: string
}

interface FAQTab {
    id: string
    label: string
    faqs: FAQItem[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const faqData: FAQTab[] = [
    {
        id: 'tab1',
        label: 'General',
        faqs: [
            {
                question: 'Are all programmes offered at JNU approved or recognized by any authority?',
                answer: 'All the technical and professional programmes offered at JNU are approved by various regulatory bodies like UGC, AICTE, NCTE, BCI, INC, PCI, and MCI (now NMC). JNU is the best private university in Rajasthan to be accredited by the National Assessment and Accreditation Council (NAAC) after just 7 years of its establishment.',
            },
            {
                question: 'What courses and programmes are offered by Jaipur National University or JNU?',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ullamcorper lectus. Donec aliquet tristique imperdiet. Cras vestibulum, ex id scelerisque blandit, elit massa hendrerit augue, rutrum lobortis urna metus id urna.',
            },
            {
                question: 'What is the duration of the course or programme?',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ullamcorper lectus. Donec aliquet tristique imperdiet. Cras vestibulum, ex id scelerisque blandit, elit massa hendrerit augue, rutrum lobortis urna metus id urna.',
            },
            {
                question: 'What is the minimum eligibility requirement for admission?',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ullamcorper lectus. Donec aliquet tristique imperdiet. Cras vestibulum, ex id scelerisque blandit, elit massa hendrerit augue, rutrum lobortis urna metus id urna.',
            },
            {
                question: 'How are the courses taught or what is the pedagogy?',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ullamcorper lectus. Donec aliquet tristique imperdiet. Cras vestibulum, ex id scelerisque blandit, elit massa hendrerit augue, rutrum lobortis urna metus id urna.',
            },
        ],
    },
    {
        id: 'tab2',
        label: 'Admissions',
        faqs: [],
    },
    {
        id: 'tab3',
        label: 'Examinations',
        faqs: [],
    },
    {
        id: 'tab4',
        label: 'Accomodation',
        faqs: [],
    },
]

// ─── Accordion ───────────────────────────────────────────────────────────────

function Accordion({ faqs }: { faqs: FAQItem[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
        // Toggle: close if already open, open otherwise
        setActiveIndex(prev => (prev === index ? null : index))
    }

    return (
        <div className="accordion">
            {faqs.map((faq, index) => {
                const isActive = activeIndex === index
                return (
                    <div
                        key={index}
                        className={`tab${isActive ? ' active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <div className="tab-heading">
                            <h5>{faq.question}</h5>
                        </div>
                        <div
                            className="tab-content"
                            style={{
                                height: isActive ? 'auto' : 0,
                                overflow: 'hidden',
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FAQs() {
    // Mirrors: $(".home_tab_content:first").show() — first tab active by default
    const [activeTab, setActiveTab] = useState<string>(faqData[0].id)

    const lastTabId = faqData[faqData.length - 1].id

    return (
        <section className="faq_section custom-tabs">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h4
                            className="font42"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            Frequently Asked Questions
                        </h4>

                        {/* Tab nav — mirrors: ul.tabs li click handler */}
                        <div className="faq_tab">
                            <ul
                                className="tabs"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="400"
                            >
                                {faqData.map(tab => (
                                    <li
                                        key={tab.id}
                                        // Mirrors: ul.tabs li:last → addClass('tab_last')
                                        className={[
                                            activeTab === tab.id ? 'active' : '',
                                            tab.id === lastTabId ? 'tab_last' : '',
                                        ].filter(Boolean).join(' ')}
                                        // Mirrors: ul.tabs li click →
                                        //   hide all .home_tab_content
                                        //   fadeIn matched tab content
                                        //   remove active from all li, add to clicked
                                        //   remove d_active from all drawers, add to matching drawer
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Drawer headings + tab content — mirrors: .tab_drawer_heading click handler */}
                        <div
                            className="faq_question"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="500"
                        >
                            {faqData.map(tab => {
                                const isActive = activeTab === tab.id
                                return (
                                    <div key={tab.id}>
                                        {/* Mirrors: .tab_drawer_heading click →
                                              hide all .home_tab_content
                                              fadeIn matched content
                                              remove d_active from all drawers, add to clicked
                                              remove active from all li, add to matching li    */}
                                        <h3
                                            className={[
                                                'tab_drawer_heading',
                                                isActive ? 'd_active' : '',
                                            ].filter(Boolean).join(' ')}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            {tab.label}
                                        </h3>

                                        {/* Mirrors: .home_tab_content hide/fadeIn */}
                                        <div
                                            className={`home_tab_content ${tab.id}`}
                                            style={{ display: isActive ? 'block' : 'none' }}
                                        >
                                            <div className="faq_accordion">
                                                <Accordion faqs={tab.faqs} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}