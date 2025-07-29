import Categories from "./Categories";
import Counts from "./Counts";
import TopCourses from "./TopCourses";
import { useRouter } from 'next/router';
import { useLoader } from "../../contexts/LoaderContext";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import httpService from "../../services/httpService";
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling

const Hero = React.memo(() => {
    const router = useRouter();
    const { setLoading } = useLoader();
    /*useEffect(() => {
        const handleRouteChangeComplete = () => setLoading(false);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeComplete);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeComplete);
        };
    }, [router, setLoading]);*/

    const openCourse = (slug) => {
        if (slug) {
            setLoading(true);
            router.push(`/${slug}`);
            setLoading(false);
        } else {
            console.warn("Invalid slug provided!");
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState("");

    // Debounce logic: update debouncedTerm after 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        // Cleanup timer if user types before 300ms
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Call API when debouncedTerm changes
    useEffect(() => {
        if (debouncedTerm) {
            fetchSearchResults(debouncedTerm);
        }
    }, [debouncedTerm]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await httpService.get(`courses/searchCourses?q=${encodeURIComponent(query)}`);
            if (response?.data ?? false) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSelectedCourse = useCallback((course) => {
        //console.log(course);
        setSearchTerm(prev => course?.basic?.title);
        setSelectedSlug(course?.basic?.slug);
        openCourse(course?.basic?.slug);
        suggestionRef.current.classList.add("hide");
    }, []);

    const redirecToSelectedCourse = useCallback(() => {
        openCourse(selectedSlug);
    }, [selectedSlug]);

    const suggestionRef = useRef(null);

    useEffect(() => {
        if (suggestionRef.current) {
            if (!searchTerm.trim()) {
                suggestionRef.current.classList.add("hide");
            } else if (searchTerm.trim()) {
                if (!selectedSlug) {
                    suggestionRef.current.classList.remove("hide");
                } else {
                    suggestionRef.current.classList.add("hide");
                }
            }
        }
    }, [searchTerm]);

    return (
        <section className="Main-Course-Home-Page-Section">
            <section className="Main-Course-Home-Page-Hero-Section">
                <div className="Main-Course-Home-Page-Hero-Section-Content">
                    <div className="Main-Course-HP-Hero-Section-Content-Text">
                        <h2 className="Main-Course-HP-Hero-Section-Heading">Accelerate Your Career with Expert-Led <span
                            className="Main-Course-HP-Hero-Section-Span-Heading"> Oracle Fusion Training <img
                                src="/images/home/Main-Course-HP-Verified-Icon.svg"
                                className="Main-Course-HP-Verified-Icon" alt="Main-Course-HP-Verified-Icon" /></span>
                        </h2>
                        <p className="Main-Course-HP-Hero-Section-Para">Real-time projects, hands-on learning, and
                            globally
                            recognized certifications—learn at your own pace!</p>

                        <div className="Main-Course-HP-WTL-search-wrapper">
                            <div className="Main-Course-HP-WTL-search-box">
                                <div className="Main-Course-HP-WTL-search-top">
                                    <input type="text" className="Main-Course-HP-WTL-search-input" value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="What do you want to learn" />
                                    <button className="Main-Course-HP-WTL-search-button" onClick={redirecToSelectedCourse}>
                                        <i className="fas fa-search"></i> Search
                                    </button>
                                </div>
                                <div className="Main-Course-HP-WTL-suggestions hide" ref={suggestionRef}>
                                    {
                                        courses?.length > 0 ? courses?.map((course, courseIndex) => (
                                            <div className="Main-Course-HP-WTL-suggestion-item" onClick={() => { handleSelectedCourse(course) }} key={courseIndex}>{course?.basic?.title}
                                            </div>
                                        ))
                                            :
                                            <div className="Main-Course-HP-WTL-suggestion-item" key="no_course_found" style={{ color: "red" }}>No course found
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="Main-Course-HP-Hero-Section-Popular-Courses-Container">
                            <p className="Main-Course-HP-Hero-Section-Popular-Courses-Para">Popular Courses:</p>
                            <span className="Main-Course-HP-Hero-Section-Popular-Courses" onClick={(e) => openCourse('oracle-fusion-scm-online-training-course')}>Oracle Fusion SCM</span>
                            <span className="Main-Course-HP-Hero-Section-Popular-Courses" onClick={(e) => openCourse('oracle-fusion-hcm-online-training-course')}>Oracle Fusion HCM</span>
                            <span className="Main-Course-HP-Hero-Section-Popular-Courses" onClick={(e) => openCourse('oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course')}>Oracle Fusion
                                Financials</span>
                            <span className="Main-Course-HP-Hero-Section-Popular-Courses" onClick={(e) => openCourse('oracle-fusion-technical-training-course')}>Oracle Fusion Technical +
                                OIC</span>
                        </div>
                        <div className="Main-Course-HP-Hero-Section-OS-img-section">
                            <Image priority={true} height={48} width={48} src="/images/home/Main-Course-HP-Hero-Section-OS-1.webp"
                                alt="Main-Course-HP-Hero-Section-OS-1" className="Main-Course-HP-Hero-Section-OS-img" />
                            <Image priority={true} height={48} width={48} src="/images/home/Main-Course-HP-Hero-Section-OS-2.webp"
                                alt="Main-Course-HP-Hero-Section-OS-2" className="Main-Course-HP-Hero-Section-OS-img" />
                            <Image priority={true} height={48} width={48} src="/images/home/Main-Course-HP-Hero-Section-OS-3.webp"
                                alt="Main-Course-HP-Hero-Section-OS-3" className="Main-Course-HP-Hero-Section-OS-img" />
                            <Image priority={true} height={48} width={48} src="/images/home/Main-Course-HP-Hero-Section-OS-4.webp"
                                alt="Main-Course-HP-Hero-Section-OS-4" className="Main-Course-HP-Hero-Section-OS-img" />
                            <Image priority={true} height={48} width={48} src="/images/home/Main-Course-HP-Hero-Section-OS-5.webp"
                                alt="Main-Course-HP-Hero-Section-OS-5" className="Main-Course-HP-Hero-Section-OS-img" />
                        </div>
                        <p className="Main-Course-HP-Hero-Section-Student">23K+ Students</p>
                        <p className="Main-Course-HP-Hero-Section-Student-para">Over 23,000+ Learners Elevating Their
                            Careers!
                        </p>
                    </div>
                    <div className="Main-Course-HP-Hero-Section-Side-Image-div">
                        <div className="Main-Course-HP-Hero-Section-Side-Image">
                            <a href="https://g.co/kgs/hN1zAky" target="_blank" rel="noopener noreferrer">

                                <Image priority={true} height={42} width={42} src="/images/home/Main-Course-HP-Google-Icon.svg"
                                    alt="Main-Course-HP-Google-Icon"
                                    className="Main-Course-HP-Hero-Section-Small-Icon-1" />
                            </a>
                            <a href="https://www.trustpilot.com/review/techleadsit.com" target="_blank"
                                rel="noopener noreferrer">
                                <Image priority={true} height={42} width={42} src="/images/home/Main-Course-HP-TrustPilot-Icon.svg"
                                    alt="Main-Course-HP-TrustPilot-Icon"
                                    className="Main-Course-HP-Hero-Section-Small-Icon-2" />
                            </a>
                            <a href="https://www.justdial.com/Hyderabad/Tech-Leads-IT-Near-Sr-NagarOpposite-Bahar-Cafe-Near-Police-Station-Sanjeeva-Reddy-Nagar/040PXX40-XX40-130607180326-Q8F9_BZDET?auto=1&trkid=2801546655&term=tech%20leads%20it"
                                target="_blank" rel="noopener noreferrer">
                                <Image priority={true} height={42} width={42} src="/images/home/Main-Course-HP-JustDial-Icon.svg"
                                    alt="Main-Course-HP-JustDial-Icon"
                                    className="Main-Course-HP-Hero-Section-Small-Icon-3" />
                            </a>
                            <Image src="/images/home/Main-Course-Home-Page-Hero-Section-img.webp"
                                alt="home-page-side-img" className="Main-Course-Home-Page-Hero-Section-Side-Image"
                                width="378" height="478"
                                style={{ "color": "transparent", "maxWidth": "100%" }} />
                        </div>
                    </div>

                </div>
            </section>

            <Counts></Counts>

            <Categories></Categories>

            <TopCourses></TopCourses>
        </section>
    )
});

export default Hero;