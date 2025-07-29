// components/MainCourseHeader.jsx
import { useEffect } from 'react';

function MainCourseHeader() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('mainCourseStrip');
      const texts = document.querySelectorAll('#mainCourseStrip .mainCoursetext');
      const paths = document.querySelectorAll('#mainCourseStrip svg path');
        //console.log(header);
        // alert("Hello");
      if (window.scrollY > 50) {
        if (header) header.style.backgroundColor = '#ffffff';
        texts.forEach((el) => el.style.color = '#006FAA');
        paths.forEach((el) => el.setAttribute('fill', '#006FAA'));
      } else {
        if (header) header.style.backgroundColor = 'transparent';
        texts.forEach((el) => el.style.color = '#ffffff');
        paths.forEach((el) => el.setAttribute('fill', '#ffffff'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}

export default MainCourseHeader;
