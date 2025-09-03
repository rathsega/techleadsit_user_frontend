import React from 'react'
// import './LearningTopics.css'
import Reveal from '../Webinar-Reveal'

const LearningTopics = ({ onCTA, details, paid }) => {
  const topics = [
    'Understanding Core SCM Modules',
    'Real-time Hands-on Demo',
    'Industry-standard Supply Chain Practices',
    'Oracle Fusion SCM Navigation Tips',
    'Optimizing SCM for Better ROI'
  ]

  return (
    <section className='Learning-Topics-Section'>
      <div className="container">
    <div className="learning-topics">
      <div className="topics-left">
        <h3 className="topics-title">What You'll Learn</h3>
        <div className="topics-list">
          {details?.modules?.map((topic, index) => (
            <Reveal variant='Dup' key={index} className="topic-item">
              <span>{topic}</span>
            </Reveal>
          ))}
        </div>
      </div>
      
      <Reveal variant='left' className="topics-right">
        <h3 className="journey-title">{details?.title}</h3>
        <p className="journey-description">
          "{details?.shortDescription}"
        </p>
        <div className="journey-cta">
          <button className="journey-button" onClick={() => onCTA("Join the Webinar")}>Join the {paid ? 'Paid' : 'Free'} Webinar</button>
          <p className="journey-note">Only Limited Spots Available – Secure Yours Now!</p>
        </div>
      </Reveal>
    </div>
    </div>
    </section>
  )
}

export default LearningTopics
