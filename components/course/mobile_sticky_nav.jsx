import React, { useState, useEffect, useCallback, useMemo } from 'react';

const MobileStickyNav = React.memo(({ showJobTrends, handleBelowFoldLoad }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState('Course Overview');

  const sectionLinks = useMemo(() => {
    const links = [
      { id: 'course-overview', label: 'Course Overview' },
      { id: 'curriculum', label: 'Curriculum' },
      { id: 'instructor-details', label: 'Instructor Details' },
      { id: 'learning-options', label: 'Learning Options' },
      { id: 'placements-path', label: 'Placements Path' }
    ];
    if (showJobTrends == -1) {
      links.push({ id: 'job-trends', label: 'Job Trends' });
    }
    return links;
  }, [showJobTrends]);

  const toggleDropdown = useCallback(() => {
    if (handleBelowFoldLoad) {
      handleBelowFoldLoad(true);
    }
    setIsOpen(prev => !prev);
  }, []);

  const selectItem = useCallback((label) => {
    setActiveLabel(label);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px', // Changed root margin
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedSection = sectionLinks.find(link => link.id === entry.target.id);
          if (matchedSection) {
            setActiveLabel(matchedSection.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionLinks.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    // 🛠️ Fallback for top of screen (course-overview)
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop < 100) {
        setActiveLabel('Course Overview');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionLinks]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <nav className="mobile-nav">
      <div className="Main-Course-T-sticky-nav-dropdown">
        <div
          className={`Main-Course-T-sticky-nav-dropdown-toggle${isOpen ? ' open' : ''}`}
          onClick={toggleDropdown}
        >
          <a
            href={`#${sectionLinks.find((item) => item.label === activeLabel)?.id}`}
            className="Main-Course-T-sticky-nav-dropdown-label"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {activeLabel}
          </a>
          <i className="fa fa-chevron-down"></i>
        </div>

        <div className={`Main-Course-T-sticky-nav-dropdown-menu${isOpen ? ' show' : ''}`}>
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => selectItem(link.label)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
});

export default MobileStickyNav;
