// components/CurriculumAccordion.jsx
import { useState, useRef, useEffect } from 'react';

function CurriculumAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? contentRef.current.scrollHeight + 'px'
        : '0px';
    }
  }, [isOpen]);

  return (
    <div className="Curriculum-Sample-card">
      <div className="Curriculum-Sample-card-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={`Curriculum-Sample-arrow ${isOpen ? 'rotate' : ''}`} />
      </div>
      <div className="Curriculum-Sample-card-body" ref={contentRef}>
        {children}
      </div>
    </div>
    
  );
}

export default CurriculumAccordion;
