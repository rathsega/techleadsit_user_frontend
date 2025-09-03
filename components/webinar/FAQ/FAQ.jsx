import React, { useState } from 'react'
// import './FAQ.css'
import Reveal from '../Webinar-Reveal'

const FAQ = ({details}) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [seen, setSeen] = useState({});

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">

{details?.map((faq, index) => {
  const open = openIndex === index;
  return (
    <Reveal variant="Dup" once
  onReveal={() => setSeen(s => ({ ...s, [index]: true }))}
  className={`faq-item ${openIndex === index ? 'open' : ''} ${seen[index] ? 'seen' : ''}`}>
      <button
        className="faq-question"
        onClick={() => toggleFAQ(index)}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-btn-${index}`}
      >
        <span>{faq.question}</span>
        <svg width="16" height="8" viewBox="0 0 21 11" fill="none"
             className={`faq-icon ${open ? 'rotated' : ''}`}>
          <path d="M1 1L10.5 9.5L20 1" stroke="white" strokeWidth="2" />
        </svg>
      </button>

      {open && <div className="faq-divider" />}

      {open && (
        <div className="faq-answer" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`}>
          <p>{faq.answer}</p>
        </div>
      )}
    </Reveal>
  );
})}

        </div>
      </div>
    </section>
  )
}

export default FAQ
