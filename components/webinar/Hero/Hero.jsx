import React from 'react'
import CountdownTimer from './CountdownTimer'
import InstructorCard from './InstructorCard'
// import './Hero.css'

const Hero = ({ onCTA, details, mentorDetails }) => {

  const handleClick = () => {
    if(!details?.paid){
      onCTA("Register Now");
    }else{
      onCTA("payment");
    }
    
  };



  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badges">
              <div className="badge-item">
                <img
                  src="/images/webinar/Webinar-Hero-sub-Btn-1.svg"
                  alt="Video icon"
                />
                <span>{details?.paid ? 'PAID' : 'FREE'} Webinar Session</span>
              </div>
              <div className="badge-item badge-item-1">
                <img
                  src="/images/webinar/Webinar-Hero-sub-Btn-2.svg"
                  alt="Group icon"
                />
                <span>11,000+ Students Trained</span>
              </div>
            </div>

            <h1 className="hero-title">
              {details?.titleOne} <span className="highlight">{details?.titleTwo}</span>
            </h1>

            <p className="hero-description">
              {details?.shortDescription}
            </p>

            <CountdownTimer date={details?.date} />

            <button className="hero-cta" onClick={() => handleClick()}>
              Register Now for&nbsp;
              { details?.paid && details?.price ? details?.discountedPrice ? (
                <>
                  <span style={{ textDecoration: "line-through", color: "#9a1717ff" }}>
                    ₹{details?.price}
                  </span>
                  &nbsp;
                  <span style={{ color: "#9df663ff", fontWeight: "bold" }}>
                    ₹{details?.discountedPrice}
                  </span>
                </>
              ) : (
                <>₹{details?.price}</>
              ) : 'Free'}
              &nbsp;!!
            </button>
          </div>

          <div className="hero-right">
            <InstructorCard details={mentorDetails} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
