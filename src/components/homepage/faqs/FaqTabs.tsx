"use client"
import { useState } from "react"
import type { ModularFAQInterface } from "./FAQs";

interface FaqTabsInterface {
    modular: ModularFAQInterface[];
}

function Accordion({ faqs }: { faqs: ModularFAQInterface[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index))
    }

    return (
        <div className="accordion">
            {faqs.map((faq, index) => {
                const isActive = activeIndex === index
                return (
                    <div
                        key={faq.slug}
                        className={`tab${isActive ? ' active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <div className="tab-heading">
                            <h5>{faq.question}</h5>
                        </div>
                        <div
                            className="tab-content"
                            style={{ height: isActive ? 'auto' : 0, overflow: 'hidden' }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default function FaqTabs({ modular }: FaqTabsInterface) {
    const groupedTabs = modular.reduce<Record<string, ModularFAQInterface[]>>((acc, faq) => {
        if (!acc[faq.type]) acc[faq.type] = []
        acc[faq.type].push(faq)
        return acc
    }, {})

    const tabLabels = Object.keys(groupedTabs)

    const [activeTab, setActiveTab] = useState<string>(tabLabels[0] ?? '')

    return (
        <>
            <div className="faq_tab">
                <ul
                    className="tabs"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                >
                    {tabLabels.map((label, i) => (
                        <li
                            key={label}
                            className={[
                                activeTab === label ? 'active' : '',
                                i === tabLabels.length - 1 ? 'tab_last' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => setActiveTab(label)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="faq_question"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
            >
                {tabLabels.map(label => {
                    const isActive = activeTab === label
                    return (
                        <div key={label}>
                            <h3
                                className={[
                                    'tab_drawer_heading',
                                    isActive ? 'd_active' : '',
                                ].filter(Boolean).join(' ')}
                                onClick={() => setActiveTab(label)}
                            >
                                {label}
                            </h3>

                            <div
                                className={`home_tab_content`}
                                style={{ display: isActive ? 'block' : 'none' }}
                            >
                                <div className="faq_accordion">
                                    <Accordion faqs={groupedTabs[label]} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}