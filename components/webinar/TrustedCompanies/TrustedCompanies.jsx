import React from 'react'
// import './TrustedCompanies.css'

const TrustedCompanies = () => {
  const companies = [
    { name: 'Company 1', logo: '/images/webinar/accenture-img.png' },
    { name:'Company 2', logo: '/images/webinar/aingenious-img.png' },
    { name: 'Company 4', logo: '/images/webinar/Cognizant-img.png' },
    { name: 'Company 3', logo: '/images/webinar/Fortinet-img.png' },
    { name: 'Company 5', logo: '/images/webinar/Infolob-img.png' },
    { name: 'Company 6', logo: '/images/webinar/Lenovo-img.png' },
    { name: 'Company 7', logo: '/images/webinar/Ltimindtree-img.png' },
    { name: 'Company 8', logo: '/images/webinar/Mouritech-img.png' },
    { name: 'Company 9', logo: '/images/webinar/Mphasis-img.png' },
    { name: 'Company 10', logo: '/images/webinar/Nttdata-img.png' },
    { name: 'Company 11', logo: '/images/webinar/Shahgaron-img.png' },
    { name: 'Company 12', logo: '/images/webinar/Techmahindra-img.png' },
    { name: 'Company 13', logo: '/images/webinar/Vithi-img.png' },
    { name: 'Company 14', logo: '/images/webinar/Yash-img.png' }
  ]

  return (
    <section className="trusted-companies">
      <div className="container d-flex align-items-center Our-CP-Container">
        <h2 className="section-title Trusted-heading">Our Client Portfolio </h2>
        <div className="companies-slider">
          <div className="companies-track">
            {companies.map((company, index) => (
              <div key={index} className="company-card">
                <img src={company.logo} alt={company.name} />
              </div>
            ))}
            {companies.map((company, index) => (
              <div key={`duplicate-${index}`} className="company-card">
                <img src={company.logo} alt={company.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedCompanies
