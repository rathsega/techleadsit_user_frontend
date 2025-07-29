import React, { useEffect, useRef, useState, Suspense, useCallback } from 'react';
const MobileCurriculumLessons = React.lazy(() => import('./mobile_curriculum_lessons'));
const YoutubeVideoPopupPlayer = React.lazy(() => import('./YoutubeVideoPopupPlayer'));

const MobileCurriculumChapters = React.memo(({ isActive, chapters }) => {
    const [lessonActiveIndex, setLessonActiveIndex] = useState(null)
    const toggleDropdown = useCallback((index) => {
        setLessonActiveIndex(prev => (prev === index ? null : index));
    }, []);

    const handleOpenVideoPopup = useCallback(() => {
        setOpenVideoPopup(prev => !prev);
    }, []);

    const contentRefs = useRef([]);

    const handleScrollHeight = () => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.style.maxHeight = isActive ? ref.scrollHeight + 'px' : '0px';
            }
        });
    }

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.style.maxHeight = isActive ? ref.scrollHeight + 'px' : '0px';
            }
        });
    }, [isActive, lessonActiveIndex]);

    const [openVideoPopup, setOpenVideoPopup] = useState(false);

    return (
        <>
            {chapters?.map((chapter, cindex) => (
                <div
                    className="Main-Course-Curriculum-Details-MVdropdown-content"
                    ref={el => contentRefs.current[cindex] = el}
                    key={cindex}
                >
                    {chapter?.chaptherVideoPath ? (
                        <div className="Main-Course-Curriculum-Details-C-content-Video-details CDV-MI">
                            <p className="Main-Course-Curriculum-Details-C-Content-Para">{chapter?.chapterName}</p>
                            <div className="Curriculum-Sample-Play-Btn" onClick={() => setOpenVideoPopup(prev => !prev)}>
                                <i className="fa fa-play-circle Curriculum-Sample-Play-Btn-icon" aria-hidden="true"></i>
                                <p className="Curriculum-Sample-Play-Btn-icon-content">Preview</p>
                                {/* <VideoPlayerPopup openVideoPopup={openVideoPopup} handleOpenVideoPopup={handleOpenVideoPopup} videoPath={chapter?.chaptherVideoPath} videoType={getVideoType(chapter?.chaptherVideoPath)}></VideoPlayerPopup> */}
                                {openVideoPopup && (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <YoutubeVideoPopupPlayer videoPath={chapter?.chaptherVideoPath} youtibeopenVideoPopup={openVideoPopup} handleYoutibeOpenVideoPopup={handleOpenVideoPopup}></YoutubeVideoPopupPlayer>
                                    </Suspense>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="Main-Course-Curriculum-Details-C-content-details CDV-MI">
                            <div className="Curriculum-Sample-card-header" onClick={() => toggleDropdown(cindex)}>
                                <p className="Main-Course-Curriculum-Details-C-Content-Para">{chapter?.chapterName}</p>
                                <div>
                                    {chapter?.lessons?.length > 0 && <span className="Curriculum-Sample-card-No-Of-Lessons">
                                        {chapter?.lessons?.length} {chapter?.lessons?.length === 1 ? "Lesson" : "Lessons"}
                                    </span>}
                                    {chapter?.lessons?.length > 0 && (
                                        <i className={`fa-solid fa-chevron-down Curriculum-Sample-arrow ${lessonActiveIndex === cindex ? 'Main-Course-Curriculum-Details-MVrotate' : ''
                                            }`}></i>
                                    )}
                                </div>
                            </div>
                            {chapter?.lessons?.length > 0 && cindex == lessonActiveIndex && (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <MobileCurriculumLessons lessons={chapter.lessons} handleScrollHeight={handleScrollHeight} isLessonActive={lessonActiveIndex === cindex} />
                                </Suspense>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
});

export default MobileCurriculumChapters;
