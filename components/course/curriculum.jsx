import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import MobileCurriculum from "./mobile_curriculum";
import YoutubeVideoPopupPlayer from "./YoutubeVideoPopupPlayer";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage"; // Custom hook for local storage management

const Curriculum = ({ data, courseTitle, brouchurePath, changedData, openForm }) => {
    const [activeModuleIndex, setActiveModuleIndex] = useState(0)
    const [activeModule, setActiveModule] = useState(data ? data[0] : "")
    const moduleNames = useMemo(() => data ? data.map(module => module.moduleName.trim()) : [], [data]);

    const showContent = useCallback((index) => {
        setActiveModuleIndex(index);
        setActiveModule(data[index]);

    }, []);

    const videoRefs = useRef({});
    const progressRefs = useRef({});
    const contentRefs = useRef([]);


    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (index) => {
        setIsOpen((prevOpen) => (prevOpen === index ? null : index));
    };


    const [openVideoPopup, setOpenVideoPopup] = useState(false);

    useEffect(() => {
        contentRefs.current.forEach((ref, idx) => {
            if (ref) {
                if (isOpen === idx) {
                    ref.style.maxHeight = ref.scrollHeight + 'px';
                } else {
                    ref.style.maxHeight = null;
                }
            }
        });
    }, [isOpen]);

    const handleOpenVideoPopup = useCallback(() => {
        setOpenVideoPopup(prev => !prev);
    }, []);

    //When we click on module name, should scroll to Modules section start position smoothly and should maintain 100 px gap from top of the page
    useEffect(() => {
        if (activeModuleIndex != 0) {
            const moduleSection = document.querySelector('.Main-Course-Curriculum-Details-container');
            if (moduleSection) {
                const moduleSectionTop = moduleSection.getBoundingClientRect().top + window.scrollY;
                const targetPosition = moduleSectionTop - 100; // 100px gap from top
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

    }, [activeModuleIndex]);

    const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );

    const handleBrochureDownload = () => {
        // const userDetails = localStorage.getItem("userDetails");
        

        if (userDetails) {
            downloadBrochure();
        } else {
            openForm("Download Course Brochure");
        }
    };

    const downloadBrochure = () => {
        const link = document.createElement("a");
        link.href = brouchurePath; // Ensure this is a valid string URL
        link.download = "brouchure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderModuleMenuItem = useCallback((mn, mni) => (
        <div
            className={`Main-Course-Curriculum-Details-menu-item ${mni == activeModuleIndex ? " active" : ""}`}
            key={mni}
            onClick={() => showContent(mni)}
        >
            {data[activeModuleIndex]?.chapters?.length > 0 ? "" : (mni + 1 + '. ')} {mn}
        </div>
    ), [activeModuleIndex, data, showContent]);

    return (
        <section>
            <h2 className="Main-Course-Curriculum-Details-Main-Heading text-center">{changedData?.curriculumHeadingChange}</h2>
            <p className="Main-Course-Curriculum-Details-Main-Para text-center">A well-structured curriculum
                provides a roadmap for learners, outlining what they will study throughout the course. The
                curriculum should be divided into modules or weeks for better clarity.</p>
            <div className="Main-Course-Curriculum-Details-container">
                {moduleNames?.length > 0 && <div className={`Main-Course-Curriculum-Details-sidebar ${data[activeModuleIndex]?.chapters?.length > 0 ? "" : "Main-Course-Curriculum-Details-No-sidebar"}`}>

                    {moduleNames && moduleNames.map(renderModuleMenuItem)}

                </div>}

                {moduleNames?.length > 0 && <div className={`Main-Course-Curriculum-Details-content ${data[activeModuleIndex]?.chapters?.length > 0 ? "" : "Main-Course-Curriculum-Details-No-content"}`}>
                    <div className="Main-Course-Curriculum-Details-content-item active">
                        <h3 className="Main-Course-Curriculum-Details-content-item-heading">{activeModule?.moduleName} ({activeModule?.chapters?.length ?? 0} {activeModule?.chapters?.length == 1 ? " Chapter" : " Chapters"})</h3>
                        {
                            activeModule?.chapters?.map((chapter, chaperIndex) => (
                                chapter?.chaptherVideoPath ? (
                                    <div className="Main-Course-Curriculum-Details-C-content-Video-details" key={chaperIndex}>
                                        <p className="Main-Course-Curriculum-Details-C-Content-Para">{chapter?.chapterName}</p>
                                        <div className="Curriculum-Sample-Play-Btn">
                                            <i className="fa fa-play-circle Curriculum-Sample-Play-Btn-icon"
                                                aria-hidden="true" onClick={() => setOpenVideoPopup(prev => !prev)}
                                            ></i>
                                            <p className="Curriculum-Sample-Play-Btn-icon-content">Preview</p>
                                            {/* <VideoPlayerPopup openVideoPopup={openVideoPopup} handleOpenVideoPopup={handleOpenVideoPopup} videoPath={chapter?.chaptherVideoPath} videoType={getVideoType(chapter?.chaptherVideoPath)}></VideoPlayerPopup> */}
                                            <YoutubeVideoPopupPlayer videoPath={chapter?.chaptherVideoPath} youtibeopenVideoPopup={openVideoPopup} handleYoutibeOpenVideoPopup={handleOpenVideoPopup}></YoutubeVideoPopupPlayer>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="Main-Course-Curriculum-Details-C-content-details" key={chaperIndex}>
                                        <div className="Curriculum-Sample-card-header" onClick={() => toggleAccordion(chaperIndex)}>
                                            <p className="Main-Course-Curriculum-Details-C-Content-Para">{chapter?.chapterName}
                                            </p>
                                            <div>
                                                {chapter?.lessons && chapter?.lessons.length > 0 && (
                                                    <span className="Curriculum-Sample-card-No-Of-Lessons">
                                                        {chapter.lessons.length} {chapter.lessons.length === 1 ? "Lesson" : "Lessons"}
                                                    </span>
                                                )}<i
                                                    className={`${chapter?.lessons?.length > 0 ? "fa-solid fa-chevron-down Curriculum-Sample-arrow" : ""} ${isOpen == chaperIndex ? "rotate" : ""}`}
                                                    id="Curriculum-Sample-arrowID"></i>
                                            </div>
                                        </div>
                                        {
                                            chapter?.lessons && chapter?.lessons?.length > 0 && <div className="Curriculum-Sample-card-content" id="Curriculum-Sample-card-contentID" ref={(el) => (contentRefs.current[chaperIndex] = el)}>
                                                <ul>
                                                    {
                                                        chapter?.lessons?.map((lesson, lessonIndex) => (
                                                            <li className="Curriculum-Sample-card-content-bullet-points" key={lessonIndex}>
                                                                <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                                                    className="Main-Course-Curriculum-imp-point-icon"
                                                                    alt="Is-this-course-pointer" width="10" height="23" />
                                                                <span className="Curriculum-Sample-card-content-bullet-imp-p">{lesson?.lessonName}</span>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        }

                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>}
            </div>
            <MobileCurriculum data={data}></MobileCurriculum>
            <div className="Main-Course-Curriculum-Dwnld-Brochure-section">
                <p className="Main-Course-Curriculum-Dwnld-Brochure">Unlock Your Learning Journey – Explore the
                    Course Curriculum!</p>
                <button
                    className="Main-Course-Curriculum-Section-btn"
                    aria-label="Download-brochure-btn"
                    onClick={() => {
                        if (brouchurePath) {
                            handleBrochureDownload();
                        }
                    }}
                >
                    <p className="Main-Course-Curriculum-Section-download-icon">
                        {brouchurePath && <><svg
                            className="Main-Course-Curriculum-Section-svgIcon-hero"
                            viewBox="0 0 384 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                            />
                        </svg>
                            <span className="Main-Course-Curriculum-Section-icon2-hero"></span></>}
                    </p>
                    {brouchurePath ? "Download brochure" : "Coming Soon"}
                </button>

            </div>
        </section>
    )
}

export default Curriculum;