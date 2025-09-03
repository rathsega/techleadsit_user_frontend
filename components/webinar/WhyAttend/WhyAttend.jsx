import React from 'react'
// import './WhyAttend.css'
import Reveal from '../Webinar-Reveal'

const WhyAttend = () => {
  const reasons = [
    {
      icon: '/images/webinar/why-attend-icon-1.svg',
      title: 'Live Learning Demo',
      description: 'Watch how tools work and systems flow in real-time.',
    },
    {
      icon: '/images/webinar/why-attend-icon-2.svg',
      title: 'Career-Focused Guidance',
      description: 'Build a successful, future-ready career in this domain.',
    },
    {
      icon: '/images/webinar/why-attend-icon-3.svg',
      title: 'Placement Support Roadmap',
      description: 'Discover what roles companies hire for and salary expectations',
    },
    {
      icon: '/images/webinar/why-attend-icon-4.svg',
      title: 'Resume & Profile Tips',
      description: 'Personal branding strategies and recruiter attraction techniques',
    },
    {
      icon: '/images/webinar/why-attend-icon-5.svg',
      title: 'Industry Use Cases',
      description: 'See how global companies apply these tools in real scenarios.',
    },
    {
      icon: '/images/webinar/why-attend-icon-6.svg',
      title: 'Live Q&A Session',
      description: 'Ask your questions directly to the expert and get personalized advice',
    }
  ]

  return (
    <section className="why-attend">
      <div className="container">
        <h2 className="section-title">Why Attend This Webinar?</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <Reveal key={index} variant='Dup' className="reason-card">
              <div 
                className="reason-icon"
                style={{ background: reason.gradient }}
              >
                <img src={reason.icon} alt="" />
              </div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyAttend
