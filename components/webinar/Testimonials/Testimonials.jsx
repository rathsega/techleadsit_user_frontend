import React from "react";
// import "./Testimonials.css";
import Reveal from "../Webinar-Reveal";

const testimonials = [
  {
    quote:
      "Krishna from Tech Leads IT is a very good trainer for the Oracle SCM Fusion course. He is strict but also very responsible. He always starts the sessions on time and explains everything clearly.",
    name: "Nafee Nasser",
    role: "OEM Account Coordinator",
    avatar: "/images/webinar/what-our-student-say-img-1.png",
  },
  {
    quote:
      "Tech Leads IT provides excellent Oracle Fusion HCM training, with real-time scenarios and expert guidance that significantly enhanced my learning experience.",
    name: "Aparna Jakkula",
    role: "HR Practitioner",
    avatar: "/images/webinar/what-our-student-say-img-2.png",
  },
  {
    quote:
      "This course offered comprehensive coverage, providing me with the skills to handle real-world scenarios. This training is not just theoretical and Instructor guidance made it truly enriching",
    name: "Monica Benny",
    role: "Oracle ERP Technical Consultant",
    avatar: "/images/webinar/what-our-student-say-img-3.png",
  },
  {
    quote:
      "Study materials provided by Tech leads IT team is quite good to practice and gain knowledge & confidence. Instructor Explained the concept clearly and in the understantable manner.",
    name: "B Subramanian",
    role: "Oracle Technical Consultant",
    avatar: "/images/webinar/what-our-student-say-img-4.png",
  },
  {
    quote:
      "It has been a wonderful experience to take the Oracle Fusion Technical+OIC course. nstructor Vijay has trasmited all concepts clearly and with real time scenarios. I feel very thankful.",
    name: "Juan Bastida",
    role: "JD Edwards Developer Consultant",
    avatar: "/images/webinar/what-our-student-say-img-5.png",
  },
  {
    quote:
      "Techleads is One of the Best training institute for Oracle Fusion SCM. I would strongly recommend this institute for beginners and experienced people.",
    name: "Ratheesh Poshala",
    role: "Senior Oracle Solution Engineer",
    avatar: "/images/webinar/what-our-student-say-img-6.png",
  },
];

const stats = [
  { number: "11,000+", label: "Students Trained" },
  { number: "96%", label: "Placement Success Rate" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "50+", label: "Partner Companies" },
];

function parseStatNumber(text) {
  const t = String(text).trim();
  const m = t.match(/^\s*([^\d+-]*?)\s*([0-9][0-9,\.]*)\s*([^\d]*)$/);
  if (!m) return { prefix: "", value: 0, decimals: 0, suffix: t };
  const prefix = m[1] || "";
  const numStr = (m[2] || "0").replace(/,/g, "");
  const suffix = m[3] || "";
  const decimals = numStr.includes(".") ? (numStr.split(".")[1] || "").length : 0;
  const value = Number(numStr);
  return { prefix, value, decimals, suffix };
}

export default function Testimonials({ details }) {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Students Say</h2>

        <div className="testimonials-grid">
          {details?.map((t, i) => (
            <Reveal key={t?._id} variant="FlipX" className="testimonial-card">
              <div className="quote-icon" aria-hidden="true">
                <img src="/images/webinar/Testimonial-Webinar.svg" alt="" />
              </div>
              <p className="testimonial-quote">{t.review}</p>
              <div className="testimonial-author">
                <img src={process.env.NEXT_PUBLIC_FILES_URL + t?.image?.path} alt={t.name} />
                <div className="author-info">
                  <h4 className="author-name">{t.name}</h4>
                  <p className="author-role">{t.designation}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="stats-section">
          {stats.map((stat, i) => {
            const isFraction = /\/\d+/.test(stat.number); 
            if (isFraction) {
              return (
                <Reveal key={i} variant="up" delay={i * 120}>
                  <div className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </Reveal>
              );
            }

            const { prefix, value, decimals, suffix } = parseStatNumber(stat.number);
            const initial = `${prefix}${(0).toFixed(decimals)}${suffix}`;

            return (
              <Reveal key={i} variant="up" delay={i * 120}>
                <div className="stat-item">
                  <span
                    className="stat-number"
                    data-count-to={String(value)}
                    data-count-from="0"
                    data-decimals={String(decimals)}
                    data-prefix={prefix}
                    data-suffix={suffix}
                    data-duration="1000"
                  >
                    {initial}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
