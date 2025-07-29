import React, { useState } from 'react';

const FAQItem = ({ question, answer, iconId, infoId, isOpen, onClick }) => {
  return (
    <div className="C-Webinar-Page-faq-options">
      <button className="C-Webinar-Page-btn-offer" onClick={onClick}>
        {question} <span id={iconId} className="C-Webinar-Page-icon">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div id={infoId} className="C-Webinar-Page-info-content show">
          <p className="text-justify C-Webinar-Page-faq-para C-Webinar-Page-custom-scrollbar">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = ({ details }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };
  return (
      <section className="C-Webinar-Page-faqs" id="Faqs">
        <div className="row C-Webinar-Page-bg-faqs">
          <div className="col-md-6" style={{ zIndex: 1 }}>
            <h1 className="C-Webinar-Page-faq-main">
              Frequently &nbsp;<br className="wC-Webinar-Page-faq-heading" />
              Asked&nbsp;<br className="wC-Webinar-Page-faq-heading" />
              Questions
            </h1>
            <img src="/images/webinar_page_asstes/star_icon_pattern_on_FAQ_section.svg" className="C-Webinar-Page-stars" />
          </div>
          <div className="col-md-6" style={{ zIndex: 10 }}>
            {details?.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                iconId={faq.iconId}
                infoId={faq.infoId}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>
  );
};

export default Faq;
