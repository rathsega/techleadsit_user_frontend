import React, { useState, useRef, useEffect, Suspense, useCallback } from 'react';
const MobileCurriculumChapters = React.lazy(() => import('./mobile_curriculum_chapters'));

const MobileCurriculum = React.memo(({ data }) => {

  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleDropdown = useCallback((index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.maxHeight = activeIndex === idx ? ref.scrollHeight + "px" : "0px";
      }
    });
  }, [activeIndex]);

  return (
    <div className="Main-Course-Curriculum-Details-container-Mobile-View">

      {
        data?.map((module, mindex) => (
          <div className={`Main-Course-Curriculum-Details-content-MVDropdown ${activeIndex === mindex ? 'active' : ''}`} key={mindex}>
            <div className="Main-Course-Curriculum-Details-content-Dropdown-Main-Header" onClick={() => toggleDropdown(mindex)}>
              <span>{module?.moduleName}</span>
              <div className="Main-Course-Curriculum-Details-content-MVDropdown-No-Lessons">
                <span>{module?.chapters?.length} {module?.chapters?.length == 1 ? " Chapter" : " Chapters"}</span>
                {module?.chapters?.length > 0 && <i
                  className={`fa-solid fa-chevron-down Main-Course-Curriculum-Details-MVdropdown-arrow ${activeIndex === mindex ? 'Main-Course-Curriculum-Details-MVrotate' : ''
                    }`}></i>}
              </div>
            </div>
            {module?.chapters?.length > 0 && <Suspense fallback={<div>Loading...</div>}>
              <MobileCurriculumChapters chapters={module?.chapters} isActive={activeIndex === mindex}></MobileCurriculumChapters>
            </Suspense>}

          </div>
        ))
      }




    </div>
  )
});

export default MobileCurriculum;