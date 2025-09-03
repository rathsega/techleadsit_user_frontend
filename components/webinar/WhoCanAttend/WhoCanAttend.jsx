import React from 'react'
// import './WhoCanAttend.css'
import Reveal from '../Webinar-Reveal'

const WhoCanAttend = () => {
  const attendees = [
    {
      image: '/images/webinar/who-can-attend-bg-img-1.png',
      icon: '/images/webinar/who-can-attend-Icon-img-1.svg',
      title: 'Students & Beginners',
      description: 'Perfect for students and freshers who want to start their journey in a new domain from scratch',
      benefits: [
        'No prior experience needed',
        'Learn through real-world examples'
      ]
    },
    {
      image: '/images/webinar/who-can-attend-bg-img-2.png',
      icon: '/images/webinar/who-can-attend-Icon-img-2.svg',
      title: 'Working Professionals',
      description: 'Busy professionals seeking to upskill and add new technical expertise to their profile',
      benefits: [
        'Upgrade your skill set efficiently',
        'Learn without disrupting your job'
      ]
    },
    {
      image: '/images/webinar/who-can-attend-bg-img-3.png',
      icon: '/images/webinar/who-can-attend-Icon-img-3.svg',
      title: 'Industry Experts',
      description: 'Experienced professionals aiming to stay current with the latest trends and technologies',
      benefits: [
        'Learn feature upgrades & best practices',
        'Deep-dive into real-time use cases'
      ]
    },
    {
      image: '/images/webinar/who-can-attend-bg-img-4.png',
      icon: '/images/webinar/who-can-attend-Icon-img-4.svg',
      title: 'Career Changers',
      description: 'Professionals from other fields exploring new opportunities in a growing industry',
      benefits: [
        'Clear roadmap for transition',
        'Learn high-demand skills in tech'
      ]
    }
  ]

  return (
    <section className="who-can-attend">
      <div className="container">
        <h2 className="section-title">Who Can Attend This Webinar</h2>
        <div className="attendees-grid reveal-side">
          {attendees.map((attendee, index) => (
            <Reveal key={index} className="attendee-card">
              <div className="attendee-header">
                <img 
                  src={attendee.image} 
                  alt={attendee.title}
                  className="attendee-bg"
                />
                <div className="attendee-icon">
                  <img src={attendee.icon} alt="" />
                </div>
              </div>
              <div className="attendee-content">
                <h3 className="attendee-title">{attendee.title}</h3>
                <p className="attendee-description">{attendee.description}</p>
                <div className="attendee-benefits">
                  {attendee.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="benefit-item">
                      <img 
                        src="/images/webinar/who-can-attend-tick-Icon-img.svg" 
                        alt="Check"
                      />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoCanAttend
