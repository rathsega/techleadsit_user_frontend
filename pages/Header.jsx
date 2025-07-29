import React, { useState } from 'react';
const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive((prevState) => !prevState);
  };
    return (<header className="header">
        <div className="logo">
          <img src="/images/Main-Course-Page-Techleads-Logo.svg" alt="Logo" /> Tech Leads IT
        </div>
        <button className={`hamburger md-device ${isActive ? 'active' : ''}`} onClick={toggleMenu}>☰</button>
        <nav className="nav md-device">
          <a href="#Home">Home</a>
          <a href="#Curriculum">Curriculum</a>
          <a href="#Testimonials">Testimonials</a>
          <a href="#Faqs">FAQ</a>
          <a href="#Contactus">Contact Us</a>
        </nav>
      </header>)
}

export default Header;