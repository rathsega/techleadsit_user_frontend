import React from 'react'
import EmailCapture from './EmailCapture'
// import './CTA.css'

const CTA = ({ onCTA }) => {
  return (
    <section className="cta" onClick={() => onCTA("Register Now")}>
      <div className="container">
        <div className="cta-main">
          <div className="cta-content">
            <h2 className="cta-title">Don't Miss This Opportunity!</h2>
            <p className="cta-subtitle">
              Join thousands of successful professionals who have transformed their careers through our webinar
            </p>
            
            <div className="cta-features">
              <div className="feature-item">
                <img 
                  src="/images/webinar/dont-miss-oppurtunity-tick.svg" 
                  alt="Check"
                />
                <span>100% Free Webinar Session</span>
              </div>
              <div className="feature-item">
                <img 
                  src="/images/webinar/dont-miss-oppurtunity-tick.svg" 
                  alt="Check"
                />
                <span>Free Recorded Session Access</span>
              </div>
              <div className="feature-item">
                <img 
                  src="/images/webinar/dont-miss-oppurtunity-tick.svg" 
                  alt="Check"
                />
                <span>Certificate of participation</span>
              </div>
              <div className="feature-item">
                <img 
                  src="/images/webinar/dont-miss-oppurtunity-tick.svg" 
                  alt="Check"
                />
                <span>Live Interaction with an Industry Expert</span>
              </div>
            </div>
            
            <button className="cta-button">
              Register Now - Limited Seats Available
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
