import React from 'react';

const Footer= React.memo(() => {
    return (<footer className="bg-footer" id="Contactus">
        <div className="container">
          <div className="row text-center text-lg-start align-items-md-center footer-text">
    
            <div className="col-lg-4 col-md-12 mb-m5">
              <h5 className="text-white d-flex align-items-center">
                <img src="/images/Main-Course-Page-Techleads-Logo.svg" alt="Tech Leads IT Logo" style={{height: '30px'}} />
                <p className="logo-txt">Tech Leads IT</p>
              </h5>
            </div>
            <div className="col-lg-4 col-md-6 col-6 text-center d-flex align-items-center d-gr-jus">
              <a href="#WhyJoin" className="footer-links mb-m3">Why Join</a>
              <span className="line-seperated">|</span>
              <a href="#Curriculum" className="footer-links mb-m3">Curriculum</a>
              <span className="line-seperated">|</span>
              <a href="#Contactus" className="footer-links mb-m3">Contact Us</a>
              <span className="line-seperated">|</span>
              <a href="#Faqs" className="footer-links">FAQ</a>
            </div>
            <div className="col-lg-4 col-md-6 col-6 social-icons text-lg-end">
              <div className="d-fl-just-end md-d-g ">
                <span className="footer-links">Social Media:</span>
                <div>
                  <a href="#"><i className="fa-brands fa-square-facebook"></i></a>
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-instagram"></i></a>
                </div>
              </div>
    
            </div>
          </div>
          <div className="footer-line"></div>
          <div className="copyright footer-links">
            Copyright &copy; 2024 Tech Leads IT. All Rights Reserved.
          </div>
        </div>
      </footer>)
})

export default Footer;
