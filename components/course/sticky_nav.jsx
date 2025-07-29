import React, { useEffect, useState, useCallback, useMemo } from 'react';

const StickyNav = React.memo(({ showJobTrends }) => {
  const [activeSection, setActiveSection] = useState('');

  // Use useMemo at the top level
  const sectionIds = useMemo(() => {
    const ids = [
      'course-overview',
      'curriculum',
      'instructor-details',
      'learning-options',
      'placements-path',
    ];
    if (showJobTrends == -1) ids.push('job-trends');
    return ids;
  }, [showJobTrends]);

  const sectionLinks = useMemo(() => {
    const links = [
      { href: '#course-overview', label: 'Course Overview' },
      { href: '#curriculum', label: 'Curriculum' },
      { href: '#instructor-details', label: 'Instructor Details' },
      { href: '#learning-options', label: 'Learning Options' },
      { href: '#placements-path', label: 'Placements Path' }
    ];
    if (showJobTrends == -1) {
      links.push({ href: '#job-trends', label: 'Job Trends' });
    }
    return links;
  }, [showJobTrends]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset from top

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const section = document.getElementById(targetId);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const offset = 70;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <nav className="Main-Course-T-sticky-nav desktop-nav">
      <ul>
        {sectionLinks?.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href.substring(1))}
              className={activeSection === item.href.substring(1) ? 'active' : ''}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default StickyNav;