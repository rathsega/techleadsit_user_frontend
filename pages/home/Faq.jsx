import React, { useState, useEffect } from 'react';


const faqData = [
  {
    id: 'MCFS-info1',
    question: 'Who can enroll in your training programs?',
    answer:
      'Anyone interested in building a career in IT, ERP, or Data-related domains can enroll. Our programs are ideal for fresh graduates, working professionals, and career switchers.',
  },
  {
    id: 'MCFS-info2',
    question: 'Do you provide live or recorded sessions?',
    answer:
      'We offer both. You can attend live instructor-led sessions and also access recordings for revision or in case you miss a class.',
  },
  {
    id: 'MCFS-info3',
    question: 'What kind of support will I receive during the course?',
    answer:
      'We provide technical and career guidance support throughout the course. Our trainers and support teams are available to help you with queries, doubts, and project support.',
  },
  {
    id: 'MCFS-info4',
    question: 'Will I receive a certificate after course completion?',
    answer:
      'Yes. Upon successful completion of the training and assignments, you will receive a course completion certificate from Tech Leads IT.',
  },
  {
    id: 'MCFS-info5',
    question: 'Can I rejoin sessions if I miss or want to revise?',
    answer:
      'Yes. With our 1-Year Membership policy, you can attend multiple batches of the same course to reinforce your learning.',
  },
  {
    id: 'MCFS-info6',
    question: 'Do you offer placement assistance?',
    answer:
      'Yes. We guide students through resume preparation, interview questions, and job referrals based on their performance and availability of openings.',
  },
  {
    id: 'MCFS-info7',
    question: 'Are there any prerequisites for joining?',
    answer:
      'Some courses may require basic knowledge (like SQL for Fusion courses), but we always mention such prerequisites clearly on the course page. Most courses start from the basics.',
  },
  {
    id: 'MCFS-info8',
    question: 'How do I get started?',
    answer:
      'Simply register for a demo or contact our support team. We’ll guide you step-by-step through enrollment and batch selection.',
  },
  {
    id: 'MCFS-info9',
    question: 'Do I need coding knowledge to join your courses?',
    answer:
      'Most of our courses are designed to be beginner-friendly and do not require prior coding experience. However, some advanced or technical modules (like integrations or extensions) may involve basic coding, which will be taught as part of the training. If coding is a prerequisite, it will be clearly mentioned in the course details.',
  },
];


const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleInfo = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const items = document.querySelectorAll(".Main-Course-Home-Page-FAQ-Section-item");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((ent, i) => {
        if (ent.isIntersecting) {
          setTimeout(() => ent.target.classList.add("show"), i * 200);
        }
      });
    }, { threshold: 0.2 });

    items.forEach((item) => obs.observe(item));

    return () => {
      items.forEach((item) => obs.unobserve(item));
    };
  }, []);

  return (
    <section className="Main-Course-Home-Page-FAQ-Section-Container-Section">
      <div className="Main-Course-Home-Page-FAQ-Section-container">
        <div className="Main-Course-Home-Page-FAQ-Section-heading-content">
          <h2 className="Main-Course-Home-Page-FAQ-Section-h">Frequently Asked Questions</h2>
          <p className="Main-Course-Home-Page-FAQ-Section-p">
            Find all the information you need about booking a demo session. Get answers to common questions and make
            your scheduling process seamless
          </p>
        </div>

        <div className="Main-Course-Home-Page-FAQ-Section-list">
          {faqData.map((faq, index) => (
            <div key={faq.id} className="Main-Course-Home-Page-FAQ-Section-item">
              <button
                className="Main-Course-Home-Page-FAQ-Section-btn"
                onClick={() => toggleInfo(faq.id)}
              >
                {faq.question}
                <span
                  className={`chevron-icon fas fa-chevron-down Main-Course-Home-Page-FAQ-Section-chevron ${openId === faq.id ? 'rotated' : ''
                    }`}
                ></span>
              </button>

              <div
                id={faq.id}
                className={`Main-Course-Home-Page-FAQ-Section-content ${openId === faq.id ? 'show' : ''}`}
              >
                <p className="Main-Course-Home-Page-FAQ-Section-content-Answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
