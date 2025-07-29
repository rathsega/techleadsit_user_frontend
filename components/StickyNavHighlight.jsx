// components/StickyNavHighlight.jsx
import { useEffect } from 'react';

function StickyNavHighlight() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.Main-Course-T-sticky-nav a');
    const mobileLabel = document.querySelector('.Main-Course-T-sticky-nav-dropdown-label');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const id = entry.target.id;
            const activeLink = document.querySelector(`.Main-Course-T-sticky-nav a[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
              if (mobileLabel) mobileLabel.textContent = activeLink.textContent;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}

export default StickyNavHighlight;
