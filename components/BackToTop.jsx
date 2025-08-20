import React, { useEffect, useState } from "react";
 
const BackToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
      setVisible(scrollTop > 200); // Show after scrolling 200px
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const circleDashArray = 307.919; // Original path length
  const circleDashOffset =
    circleDashArray - (circleDashArray * scrollPercent) / 100;
 
  return (
    visible && (
      <div
        className="rbt-progress-parent BTT-Btn"
        aria-label="Back to top"
        role="button"
        tabIndex="0"
        onClick={scrollToTop}
        onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
      >
        <svg
          className="rbt-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              strokeDasharray: circleDashArray,
              strokeDashoffset: circleDashOffset,
            }}
          />
        </svg>
        <span className="rbt-icon"><i className="fas fa-arrow-up BTT-Arrow"></i></span>
      </div>
    )
  );
};
 
export default BackToTop;