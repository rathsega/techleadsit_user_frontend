import React, { useState, lazy } from 'react';
const LiveChatButton = lazy(() => import('../LiveChatButton'));
const Faqs = React.memo(({ data, openForm }) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleInfo = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="Main-Course-FAQ-Section-Container-Section">
            <div className="Main-Course-FAQ-Section-container">
                <div className="Main-Course-FAQ-Section-heading-content">
                    <p className="Main-Course-FAQ-Section-p">Faq</p>
                    <h2 className="Main-Course-FAQ-Section-h">Frequently Asked Questions</h2>
                </div>

                <div className="Main-Course-FAQ-Section-list">
                    {data && data.map((faq, index) => (
                        <div
                            key={index}
                            onClick={() => toggleInfo(index)}
                            className="Main-Course-FAQ-Section-item show"
                        >
                            <button className="Main-Course-FAQ-Section-btn">
                                {faq.question}
                                <span
                                    id={`MCFS-icon${index}`}
                                    className={`chevron-icon fas fa-chevron-down Main-Course-FAQ-Section-chevron ${activeIndex === index ? 'rotated' : ''
                                        }`}
                                ></span>
                            </button>
                            <div
                                id={`MCFS-info${index}`}
                                className={`Main-Course-FAQ-Section-content ${activeIndex === index ? 'show' : ''
                                    }`}
                            >
                                <p className="Main-Course-FAQ-Section-content-Answer">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="MC-FAQ-CTA-end-button-container">
                <p className="MC-FAQ-CTA-Button-Para">If your query isn't covered in the FAQ, feel free to reach out!
                </p>
                <div className="MC-FAQ-CTA-Button-Container">
                    <button className="MC-FAQ-CTA-Button" onClick={(e) => openForm("Enquire Now")}>Enquire Now!!</button>
                    <LiveChatButton className="MC-FAQ-CTA-Button"
                        iconSrc="/images/courses/Main-Course-FAQ-Whatsapp-Icon.svg"
                        iconAlt="Whatsapp-Icon"
                        iconWidth={24}
                        iconHeight={24}></LiveChatButton>
                </div>
            </div>
        </section>
    )
})

export default Faqs;