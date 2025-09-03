import React from 'react'
import RegistrationForm from './RegistrationForm'
// import './AboutWebinar.css'
import Reveal from '../Webinar-Reveal'

const AboutWebinar = ({ webinarTitle, webinarId, details }) => {
  const features = [
    {
      icon: '/images/webinar/About-Webinar-1.svg',
      title: '90 min Expert Webinar Session',
      color: '#0076BE'
    },
    {
      icon: '/images/webinar/About-Webinar-2.svg',
      title: 'Certificate of participation',
      color: '#16A048'
    },
    {
      icon: '/images/webinar/About-Webinar-3.svg',
      title: 'Free Webinar Recorded Session Access',
      color: '#E76B0D'
    },
    {
      icon: '/images/webinar/About-Webinar-4.svg',
      title: 'Live Interaction with an Industry Expert',
      color: '#AD51E2'
    },
    {
      icon: '/images/webinar/About-Webinar-5.svg',
      title: 'Live Oracle SCM Demonstration',
      color: '#CE13E4'
    }
  ]

  return (
    <section className="about-webinar">
      <div className="container">
        <div className="about-content">
          <div className="about-left">
            <h2 className="about-title">About This Webinar</h2>
            <p className="about-description">
              {details?.description}
            </p>
            
            <div className="features-list">
              {features.map((feature, index) => (
                <Reveal key={index} variant='Dup' className="feature-item">
                  <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                    <img src={feature.icon} alt="" />
                  </div>
                  <span className="feature-title">{details?.highlights[index]}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant='left'>
          <div className="about-right">
            <RegistrationForm webinarTitle={webinarTitle} webinarId={webinarId} />
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default AboutWebinar
