import React from 'react'
import Image from 'next/image'
const Footer = () => {
    return (
        <footer className="footer-section" id="Contactus">
            <div className="container footer-section-m">
                <div className="footer-text ">

                    <div className="mb-m5 grid-item">
                        <h5 className="text-white d-flex align-items-center">
                            <Image src="/images/demo/Logo-icon-i.png" alt="Tech Leads IT Logo" height="35" />
                            <p className="logo-txt">Tech Leads IT</p>
                        </h5>
                    </div>
                    <div className="text-center d-flex align-items-center d-gr-jus grid-item">
                        <a href="#WhyJoin" className="footer-links mb-m3">Why Join</a>
                        <span className="line-seperated">|</span>
                        <a href="#Curriculum" className="footer-links mb-m3">Curriculum</a>
                        <span className="line-seperated">|</span>
                        <a href="#Contactus" className="footer-links mb-m3">Contact Us</a>
                        <span className="line-seperated">|</span>
                        <a href="#Faqs" className="footer-links">FAQ</a>
                    </div>
                    <div className="social-icons grid-item">
                        <div className="icon-align md-d-g ">
                            <span className="footer-links">Social Media:</span>
                            <div>
                                <a href="#"><Image src="/images/demo/facebook icon.svg" alt='Facebook icon' height="25" className="sm-h" /></a>
                                <a href="#"><Image src="/images/demo/instagram icon.svg" alt='INstagram icon' height="25" className="sm-h" /></a>
                                <a href="#"><Image src="/images/demo/linkedin  icon.svg" alt='Linkedin icon' height="25" className="sm-h" /></a>
                                <a href="#"><Image src="/images/demo/Youtube-icon.png" alt='Youtube icon' height="25" className="sm-h" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-line"></div>
                <div className="copyright footer-links">
                    Copyright &copy; 2025 Tech Leads IT. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer);