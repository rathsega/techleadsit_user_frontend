import React from 'react'
// import './InstructorCard.css'

const InstructorCard = ({ details }) => {
  return (
    <div className="instructor-card">
      <div className="instructor-header">
        <div className="instructor-bg">
          <div className="grid-pattern"></div>
          <div className="gradient-overlay"></div>
          <img
            src={process.env.NEXT_PUBLIC_FILES_URL + details?.image?.path}
            alt={`${details?.name} - ${details?.designation}`}
            className="instructor-image"
          />
        </div>
        <div className="instructor-badge">
          <span>Instructor</span>
        </div>
      </div>

      <div className="instructor-info">
        <h3 className="instructor-name">{details?.name}</h3>
        <div className="instructor-title">
          <span>{details?.designation},</span>
          <div>
            <span>Ex-</span>
            <img
              src={process.env.NEXT_PUBLIC_FILES_URL + details?.companyImage?.path}
              alt="Ex Company Logo"
              className="oracle-logo"
            />
          </div>
        </div>

        <div className="instructor-credentials">
          <div className="credential-item">
            <img
              src="/images/webinar/Webinar-Hero-Banner-Sub-M-1.svg"
              alt="Certification icon"
            />
            <span>{details?.highlights[0]}</span>
          </div>
          <div className="credential-item">
            <img
              src="/images/webinar/Webinar-Hero-Banner-Sub-M-2.svg"
              alt="Experience icon"
            />
            <span>{details?.highlights[1]}</span>
          </div>
          <div className="credential-item">
            <img
              src="/images/webinar/Webinar-Hero-Banner-Sub-M-3.svg"
              alt="Students icon"
            />
            <span>{details?.highlights[2]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorCard
