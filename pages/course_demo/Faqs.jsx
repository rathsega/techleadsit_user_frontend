import React, { useState } from "react";

const Faqs = ({ details }) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleInfo = (id) => {
        setOpenSection((prev) => (prev === id ? null : id));
    };
    return (
        <section className="Faq-section">
            <h1 className="Faq-section-h">Frequently Asked Questions</h1>
            <p className="Faq-section-p">Find all the information you need about booking a demo session. Get answers to common
                questions and make your scheduling process seamless</p>
            {details && details?.faqItems && details?.faqItems.map((faq, index) => (
                <div className="d-flex justify-content-center" key={index}>
                    <div onClick={() => toggleInfo(index)} className="cd_faq-options">
                        <button className="cd-btn-offer">
                            {faq.question}
                            <span
                                className={`chevron-icon fas fa-chevron-down ${openSection === index ? "rotated" : ""}`}
                            ></span>
                        </button>
                        <div className={`cd-info-content ${openSection === index ? "show" : ""}`}>
                            <p className="text-justify cd-faq-para">{faq.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Faqs;