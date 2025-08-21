import React, { useEffect, useState, useRef, lazy, useCallback } from "react";
import httpService from "../services/httpService";
import { useRouter } from 'next/router';
import { useLoader } from "../contexts/LoaderContext";
const CourseRegistrationForm = lazy(() => import('./course/RegistrationForm'));
const AlreadySubmitted = lazy(() => import('../pages/blog/details/already_submitted'));
import Image from "next/image";
import { useExpiringLocalStorage } from "../services/useExpiringLocalStorage";
const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTab, setTab] = useState(false);
    const [hamburgerChecked, setHamburgerChecked] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [mobilePanelOpen, setMobilePanelOpen] = useState(null);
    const [allCoursesOpen, setAllCoursesOpen] = useState(false);
    const [activePanel, setActivePanel] = useState("all");
    const allCoursesRef = useRef();
    const [categories, setCategories] = useState([]);
    const [categoriesAndCourses, setCategoriesAndCourses] = useState([]);
    const [mouseAt, setMouseAt] = useState(null);

    const formRef = useRef(null);
    const overlayRef = useRef(null);

    const handleButtonClick = useCallback(() => {
        if (formRef.current && overlayRef.current) {
            formRef.current.style.display = "block";
            overlayRef.current.style.display = "block";
        }
    }, []);

    const hidePopupForm = useCallback(() => {
        if (formRef.current && overlayRef.current) {
            formRef.current.style.display = "none";
            overlayRef.current.style.display = "none";
        }
    }, []);

    const [formVisibility, setFormVisibility] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);

    const formConfigs = {
        "Enquiry Now": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Enquiry Now",
            buttonLabel: "Enquiry Now",
        }
    }

    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const handleDetailsSubmitted = () => {
        setDetailsSubmitted(false);
    }
    const openForm = useCallback((formType, onSuccessCallback) => {
        const config = formConfigs[formType];

        // let userDetails = localStorage.getItem("userDetails");
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );
        
        if (userDetails) {
            setDetailsSubmitted(true);
        } else {
            if (config) {
                setFormFields(config.fields);
                setHeading(config.heading);
                setButtonLabel(config.buttonLabel);
                setFormVisibility(true);
                handleButtonClick();
            }
            if (onSuccessCallback) {
                setFormSuccessCallback(() => onSuccessCallback);
            } else {
                setFormSuccessCallback(null); // or undefined
            }
        }

    }, [handleButtonClick]);

    const handleUserDetailsSubmissionStatus = (status) => {
        if (status) {
            setTimeout(() => { hidePopupForm() }, 3000)
        }
    }

    const { setLoading } = useLoader();
    const router = useRouter();
    const openCourse = (slug) => {
        setAllCoursesOpen(false);
        setLoading(true)
        router.push(`/${slug}`); // Example route: /slug-value
        setLoading(false)
    }

    const redirectToCategory = useCallback((cat) => {
        setAllCoursesOpen(false);
        const link = `/courses?subCategoryId=${cat?._id}&subCategoryName=${cat?.title}`;
        setLoading(true)
        router.push(`/${link}`); // Example route: /slug-value
        setLoading(false)
    }, [setLoading, router]);


    useEffect(() => {
        const getCategoriesDetails = async () => {
            try {
                setLoading(true);
                const response = await httpService.get('courses/getSubCategoriesWithCourses');
                setLoading(false);
                if (response && response.data) {
                    setCategoriesAndCourses(response?.data?.categories);

                    const categoryList = [];
                    const courseList = [];

                    response?.data?.categories.forEach((category) => {
                        categoryList.push({ _id: category._id, title: category.title });

                        category.courses.forEach((course) => {
                            courseList.push({
                                ...course,
                                category: {
                                    _id: category._id,
                                    title: category.title
                                }
                            });
                        });
                    });
                    setCategories(categoryList);
                }
            } catch (e) {
                console.log("unepected error", e);
            }
        }
        getCategoriesDetails();
    }, [])


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 993);
            setTab(window.innerWidth >= 993 && window.innerWidth < 1201);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /*useEffect(() => {
        Object.entries(panelsContent).forEach(([key, html]) => {
            const panel = document.getElementById(key);
            const mobilePanel = document.getElementById(`mobile-panel-${key}`);
            if (panel) panel.innerHTML = html;
            if (mobilePanel) mobilePanel.innerHTML = html;
        });
    }, []);*/

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (allCoursesRef.current && !allCoursesRef.current.contains(e.target)) {
                setAllCoursesOpen(false);
                setActivePanel("all");
            }
            if (!e.target.closest(".TLI-H-M-Main-Course-TLI-Common-Header-dropdown")) {
                setOpenDropdown(null);
            }
            setMobileDropdownOpen(false);
            setMobilePanelOpen(null);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setOpenDropdown(openDropdown === "services" ? null : "services");
    };

    const openHome = () => {
        setLoading(true)
        router.push(`/`); // Example route: /slug-value
        setLoading(false)
    }

    useEffect(() => {
        let timer;

        if (mouseAt == null) {
            timer = setTimeout(() => {
                setAllCoursesOpen(false);
            }, 200);
        }

        return () => {
            // If mouseAt changes (even within 3s), cancel the previous timeout
            clearTimeout(timer);
        };
    }, [mouseAt]);

    useEffect(() => {
        if (mouseAt == null) {

        }
    }, [mouseAt])
    return (
        <><header className="TLI-H-M-site-header">
            <div className="TLI-H-M-Main-Course-TLI-Common-Header-logo cursor-pointer" onClick={openHome}>
                <img
                    src="/images/Main-Course-HP-Page-Techleads-Logo.svg"
                    alt="Header-Techleads-Logo"
                    className="TLI-H-M-Main-Page-Techleads-Logo"
                    width={236}
                    height={40}
                />
            </div>

            {!isMobile && (
                <div
                    className="TLI-H-M-All-Courses-Common-Header-container"
                    id="header-container"
                    ref={allCoursesRef}
                >
                    <div className="TLI-H-M-All-Courses-Common-Header-wrapper">
                        <div
                            className="TLI-H-M-All-Courses-Common-Header-button"
                            tabIndex="0"
                            id="all-courses-btn"
                            onClick={() => {
                                setAllCoursesOpen((prev) => !prev);
                                setActivePanel("all");
                            }}
                            onMouseOver={() => {
                                setAllCoursesOpen(true);
                                setActivePanel("all");
                                setMouseAt("all");
                            }}
                            onMouseLeave={() => setMouseAt(null)}
                        >
                            All Courses
                            <span className="TLI-H-M-All-Courses-Common-Header-chevron">
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </div>

                        {allCoursesOpen && (
                            <div className="TLI-H-M-All-Courses-Common-Header-dropdown" id="dropdown-menu" onMouseOver={() => setMouseAt("left")} onMouseLeave={() => setMouseAt(null)}>
                                {/* <h2 className="TLI-H-M-Common-Header-Heading-Content">Trainings</h2> */}
                                <div
                                    key={"all"}
                                    className={`TLI-H-M-All-Courses-Common-Header-item${activePanel === "all" ? " active" : ""}`}
                                    data-panel={"all"}
                                    onClick={() => setActivePanel("all")}
                                    onMouseOver={() => setActivePanel("all")}
                                >
                                    All Categories
                                    <span className="TLI-H-M-All-Courses-Common-Header-chevron">
                                        <i className={`fa-solid fa-chevron-right`}></i>
                                    </span>
                                </div>
                                {categories.map((cat) => (
                                    <div
                                        key={cat?._id}
                                        className={`TLI-H-M-All-Courses-Common-Header-item${activePanel === cat?._id ? " active" : ""}`}
                                        data-panel={cat?._id}
                                        onClick={() => setActivePanel(cat?._id)}
                                        onMouseOver={() => setActivePanel(cat?._id)}
                                    >
                                        {cat?.title}
                                        <span className="TLI-H-M-All-Courses-Common-Header-chevron">
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {activePanel == 'all' ?
                        <div
                            key={'all'}
                            id={'all'}
                            className={`TLI-H-M-All-Courses-Common-Header-right-panel${allCoursesOpen && activePanel === 'all' ? " active" : ""}`}
                            onMouseOver={() => setMouseAt("right")}
                            onMouseLeave={() => setMouseAt(null)}
                        >

                            <div className="TLI-H-M-Header-All-Category-Icon-card-Container">
                                {categories.map((cat) => (

                                    <div className="TLI-H-M-Header-All-Category-Icon-card" onClick={() => redirectToCategory(cat)}>
                                        <img src={`/images/header/${cat?.title}.svg`} alt={cat?.title} className="TLI-H-M-Header-All-Category-Icon" loading="lazy" />
                                        <p className="TLI-H-M-Header-All-Category-Icon-card-Para">{cat?.title}</p>
                                    </div>
                                ))
                                }
                            </div>

                        </div>
                        :
                        <div
                            key={activePanel}
                            id={activePanel}
                            className={`TLI-H-M-All-Courses-Common-Header-right-panel${allCoursesOpen ? " active" : ""}`}
                            onMouseOver={() => setMouseAt("right")}
                            onMouseLeave={() => setMouseAt(null)}
                        >
                            <div className="TLI-H-M-Header-Oracle-Fusion-Content-Section" data-cat={activePanel}>
                                {
                                    categoriesAndCourses?.flatMap(cat => cat._id === activePanel ? cat.courses : []) // Extract courses of the matching category
                                        .map((course, index) => (
                                            <div className="TLI-H-M-Header-Oracle-Fusion-Content cursor-pointer" key={course?._id} onClick={() => openCourse(course?.slug)}>
                                                <Image src="/images/header/Header-Arrow-Mark-Icon.svg" height={20} width={20} alt="Arrow-Mark-Pointer" loading="lazy" />
                                                <p className="TLI-H-M-Header-Oracle-Fusion-Content-P">{course?.title}</p>
                                            </div>
                                        ))
                                }

                            </div>
                        </div>}
                </div>
            )}

            {isMobile && (
                <div className="TLI-H-M-mobile-header" id="mobile-header" onMouseOver={() => setMouseAt("all")} onMouseLeave={() => setMouseAt(null)}>
                    <div className="TLI-H-M-mobile-header-topbar">
                        <button
                            className="TLI-H-M-mobile-courses-btn"
                            id="mobile-courses-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMobileDropdownOpen(prev => !prev);
                                setMobilePanelOpen(null);
                            }}
                        >
                            All Courses
                            <span className="TLI-H-M-TLI-H-M-All-Courses-Common-Header-chevron">
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </button>
                    </div>
                    <div
                        className={`TLI-H-M-mobile-dropdown${mobileDropdownOpen ? " open" : ""}`}
                        id="mobile-dropdown"
                    >
                        <div key={'all'} className="TLI-H-M-mobile-menu-group">
                            <button
                                className="TLI-H-M-mobile-menu-item"
                                data-panel={'all'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMobilePanelOpen((prev) => (prev === 'all' ? null : 'all'));
                                }}
                            >
                                All Categories
                                <span>
                                    <i className={`fa-solid fa-chevron-right ${mobilePanelOpen == 'all' ? 'rotate' : ''}`}></i>
                                </span>
                            </button>
                            <div
                                className={`TLI-H-M-mobile-panel-content TLI-H-M-All-Category-Panel-Centered${mobilePanelOpen === 'all' ? " open" : ""}`}
                                id={`mobile-panel-all`}
                            >
                                {mobilePanelOpen == 'all' ?


                                    <div className="TLI-H-M-Header-All-Category-Icon-card-Container">
                                        {categories.map((cat) => (

                                            <div className="TLI-H-M-Header-All-Category-Icon-card" onClick={() => redirectToCategory(cat)}>
                                                <img src={`/images/header/${cat?.title}.svg`} alt={cat?.title} className="TLI-H-M-Header-All-Category-Icon" loading="lazy" />
                                                <p className="TLI-H-M-Header-All-Category-Icon-card-Para">{cat?.title}</p>
                                            </div>
                                        ))
                                        }
                                    </div>

                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        {categories.map((cat) => (
                            <div key={cat?._id} className="TLI-H-M-mobile-menu-group">
                                <button
                                    className="TLI-H-M-mobile-menu-item"
                                    data-panel={cat?._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMobilePanelOpen((prev) => (prev === cat?._id ? null : cat?._id));
                                    }}
                                >
                                    {cat?.title}
                                    <span>
                                        <i className={`fa-solid fa-chevron-right ${mobilePanelOpen == cat?._id ? 'rotate' : ''}`}></i>
                                    </span>
                                </button>
                                <div
                                    className={`TLI-H-M-mobile-panel-content${mobilePanelOpen === cat?._id ? " open" : ""}`}
                                    id={`mobile-panel-${cat?._id}`}
                                >
                                    {mobilePanelOpen != 'all' ?

                                        <div className="TLI-H-M-Header-Oracle-Fusion-Content-Section" data-cat={mobilePanelOpen}>
                                            {
                                                categoriesAndCourses?.flatMap(cat => cat._id === mobilePanelOpen ? cat.courses : []) // Extract courses of the matching category
                                                    .map((course, index) => (
                                                        <div className="TLI-H-M-Header-Oracle-Fusion-Content cursor-pointer" key={course?._id} onClick={() => openCourse(course?.slug)}>
                                                            <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" loading="lazy" />
                                                            <p className="TLI-H-M-Header-Oracle-Fusion-Content-P">{course?.title}</p>
                                                        </div>
                                                    ))
                                            }

                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <nav className={`TLI-H-M-Main-Course-TLI-Common-Header-nav-links ${(isMobile || isTab) && hamburgerChecked ? 'active' : ''}`}>
                <a href="/" className="TLI-H-M-Main-Course-TLI-Header-a-hover">Home</a>
                <a href="/comingsoon" className="TLI-H-M-Main-Course-TLI-Header-a-hover">About Us</a>
                <a href="/blogs" className="TLI-H-M-Main-Course-TLI-Header-a-hover">Blogs</a>
                <a href="/careers" className="TLI-H-M-Main-Course-TLI-Header-a-hover">Careers</a>
                <a href="/contactus" className="TLI-H-M-Main-Course-TLI-Header-a-hover">Contact Us</a>
                <div className="TLI-H-M-Main-Course-TLI-Mobile-Header">
                    <button className="TLI-H-M-Header-Enquiry-MB-Btn" onClick={() => openForm("Enquiry Now")}> Enquiry Now</button>
                    <a href="/signin" className="TLI-H-M-Main-Course-TLI-MB-Common-Header-login-btn">Login now!</a>
                </div>
            </nav>

            <div className="TLI-H-M-Main-Course-TLI-Common-Header-icons">
                <button className="TLI-H-M-Header-Enquiry-Btn" onClick={() => openForm("Enquiry Now")}> Enquiry Now</button>
                <a href="/signin" className="TLI-H-M-Main-Course-TLI-Common-Header-login-btn">Login now!</a>
                <label className="TLI-H-M-Main-Course-TLI-Common-Header-hamburger">
                    <input
                        type="checkbox"
                        checked={hamburgerChecked}
                        onChange={() => setHamburgerChecked(!hamburgerChecked)}
                    />
                    <svg viewBox="0 0 32 32">
                        <path
                            className="TLI-H-M-Main-Course-TLI-Common-Header-hamburger-line TLI-H-M-Main-Course-TLI-Common-Header-hamburger-line-top-bottom"
                            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                        ></path>
                        <path className="TLI-H-M-Main-Course-TLI-Common-Header-hamburger-line" d="M7 16 27 16"></path>
                    </svg>
                </label>
            </div>
        </header>
            <div className="Main-Course-Overlay" ref={formRef} style={{ display: "none" }}></div>
            <CourseRegistrationForm
                overlayRef={overlayRef}
                visible={formVisibility}
                fields={formFields}
                heading={heading}
                buttonLabel={buttonLabel}
                hidePopupForm={hidePopupForm}
                pageName="Header - Enquiry"
                onSuccess={(data) => {
                    //console.log("Success!", data);
                    handleUserDetailsSubmissionStatus(true);
                    if (formSuccessCallback) {
                        formSuccessCallback(data); // ← This must be triggered here
                        setFormSuccessCallback(null); // reset after call
                    }
                }}
            ></CourseRegistrationForm>
            {detailsSubmitted && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted}></AlreadySubmitted></>}

        </>
    );
};

export default Header;
