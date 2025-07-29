import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling
const MobileCurriculumLessons = React.memo(({ lessons, isLessonActive, handleScrollHeight }) => {

    return (
        <div className="Curriculum-Sample-card-content-mb" id="Curriculum-Sample-card-contentID" onClick={(e) => { e.preventDefault(); handleScrollHeight(); }}>
            <ul>
                {
                    lessons?.map((lesson, lindex) => (
                        <li className="Curriculum-Sample-card-content-bullet-points">
                            <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                className="Main-Course-Curriculum-imp-point-icon"
                                alt="Is-this-course-pointer" width="10" height="23" />
                            <span className="Curriculum-Sample-card-content-bullet-imp-p">{lesson?.lessonName}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
});

export default MobileCurriculumLessons;