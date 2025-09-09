import { useRouter } from 'next/router';
import { useLoader } from '../../contexts/LoaderContext';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const RelatedCourses = React.memo(({ courses, courseTax }) => {
  const { setLoading } = useLoader();
  const router = useRouter();

const containerRef = React.useRef(null);
const railRef = React.useRef(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);


const updateEnds = () => {
  const el = railRef.current;
  if (!el) return;
  const atStart = el.scrollLeft <= 0;
  const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

  // toggle container flags for CSS
  const box = containerRef.current;
  if (box) {
    box.classList.toggle('has-left', !atStart);
    box.classList.toggle('has-right', !atEnd);
  }
};

  useEffect(() => {
    updateEnds();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEnds, { passive: true });
    window.addEventListener('resize', updateEnds);
    return () => {
      el.removeEventListener('scroll', updateEnds);
      window.removeEventListener('resize', updateEnds);
    };
  }, []);

  // 2) How far to scroll per click (one card width, or ~viewport)
  const getStep = () => {
    const el = railRef.current;
    if (!el) return 0;
    const card = el.querySelector('.Main-Course-Related-Courses-Card-Section');
    if (card) {
      const cardWidth = card.offsetWidth;
      // try to include gap if present
      const styles = getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return cardWidth + gap;
    }
    return Math.round(el.clientWidth * 0.9);
  };

  const scrollByDir = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const openCourse = useCallback((slug) => {
    setLoading(true);
    router.push(`/${slug}`);
    // ideally stop loading on routeChangeComplete
    // setLoading(false);
  }, [router, setLoading]);

  return (
    <section className="Main-Course-Related-Course-Card-Section-Container">
      <h2 className="Main-Course-Related-Course-Card-heading text-center">
        Explore Our Related Courses
      </h2>
      <p className="Main-Course-Related-Course-Card-Para text-center">
        Enhance your career prospects with specialized courses in high-demand fields. Gain practical knowledge and stay competitive in the industry.
      </p>

      <div className="Main-Course-Related-Courses-Card-Container" ref={containerRef}>
        <button
          className={`MC-Related-Arrow MC-Related-Arrow--prev ${atStart ? 'is-disabled' : ''}`}
          aria-label="Previous"
          onClick={() => scrollByDir(-1)}
          type="button"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className={`MC-Related-Arrow MC-Related-Arrow--next ${atEnd ? 'is-disabled' : ''}`}
          aria-label="Next"
          onClick={() => scrollByDir(1)}
          type="button"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* 4) The horizontally scrollable rail */}
        <div className="Main-Course-Related-Courses-Cards" ref={railRef}>
          {courses?.map((course) => (
            <div
              className="Main-Course-Related-Courses-Card-Section cursor-pointer"
              key={course?.basic?._id}
              onClick={() => openCourse(course?.basic?.slug)}
            >
              <div className="position-relative">
                <div className="Main-Course-Related-Courses-Card-discount">
                  <Image src="/images/courses/MC-Related-Blogs-Offer-Icon.svg" alt="Offer Icon" height={18} width={18} />
                  <span className="Main-Course-Related-Courses-Card-offer">Get 20% Off</span>
                </div>

                <Image
                  src={process.env.NEXT_PUBLIC_FILES_URL + course?.basic?.thumbnailImage?.path}
                  width={345}
                  height={215}
                  alt={course?.basic?.title || 'Course'}
                  style={{ maxWidth: '100%', width: '100%', height: 'auto' }}
                />

                <div className="Main-Course-Related-Courses-Card-offer-card-options" />
              </div>

              <div className="Main-Course-Related-Courses-card-body">
                <div className="Main-Course-Related-Courses-rating-section">
                  <p className="Main-Course-Related-Courses-h">{course?.category?.title}</p>
                  <div className="Main-Course-Related-Courses-rating">
                    <Image src="/images/courses/MC-Related-Blogs-Rating-Icon.svg" height={20} width={20} alt="Rating" />
                    <span className="Main-Course-Related-Courses-review">{course?.basic?.rating}</span>
                  </div>
                </div>

                <h2 className="Main-Course-Related-Courses-main-h">{course?.basic?.title}</h2>

                <div className="Main-Course-Related-Courses-info">
                  <span>
                    <Image src="/images/courses/MC-Related-Blogs-Duration-Icon.svg" alt="Duration" height={16} width={16} />
                    <span className="Main-Course-Related-Courses-info-details">
                      {course?.basic?.durationInMonths} {course?.basic?.durationInMonths == 1 ? 'Month' : 'Months'}
                    </span>
                  </span>
                  <span>
                    <Image src="/images/courses/MC-Related-Blogs-Chapters-Icon.svg" alt="Chapters" height={16} width={16} />
                    <span className="Main-Course-Related-Courses-info-details">
                      {course?.basic?.chapterCount} {course?.basic?.chapterCount == 1 ? ' Lesson' : ' Lessons'}
                    </span>
                  </span>
                  <span>
                    <Image src="/images/courses/MC-Related-Blogs-Mode-Icon.svg" alt="Mode" height={16} width={16} />
                    <span className="Main-Course-Related-Courses-info-details">{course?.basic?.courseType}</span>
                  </span>
                </div>

                <div className="Main-Course-Related-Courses-details">
                  {course?.basic?.discountedPrice > 0 ? (
                    <p className="mb-0">
                      <span className="Main-Course-Related-Courses-old-price">₹{course?.basic?.price}</span>
                      <span className="Main-Course-Related-Courses-price">₹{course?.basic?.discountedPrice}</span>
                      {(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && (
                        <span className="Main-Course-Related-Courses-text">+Taxes</span>
                      )}
                    </p>
                  ) : (
                    <p className="mb-0">
                      <span className="Main-Course-Related-Courses-price">₹{course?.basic?.price}</span>
                      {(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && (
                        <span className="Main-Course-Related-Courses-text">+Taxes</span>
                      )}
                    </p>
                  )}

                  <a onClick={() => openCourse(course?.basic?.slug)} className="Main-Course-Related-Courses-enroll-link">
                    <button className="Main-Course-Related-Courses-enroll">
                      Enroll Now
                      <i className="fa-solid fa-chevron-right MC-Related-Blogs-Card-Enroll-Btn-Chevron"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RelatedCourses;