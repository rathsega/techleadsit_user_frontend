import React, { useEffect, useState, useRef, act } from "react";
import httpService from "../../../services/httpService";
import HappyStudentsCarousel from "./HappyStudentsCarousel";
import SocialButtons from "./SocialButtons";
import Image from "next/image";
import AlignMeTwo from "./AlignMeTwo";
import AlignMeFour from "./AlignMeFour";
import AlignMeSix from "./AlignMeSix";
import AlignMeThree from "./AlignMeThree";

const SummaryContainer = ({ details, keywords, advertisement, viewsCount, currentBlogId, likeCount, categories, topBlogsList, toggleSocialSharePopup, handleSummaryScroll, category }) => {
    const [summaryIndex, setSummaryIndex] = useState([]);
    const [activeIndex, setActiveindex] = useState(0);
    const [happyStudents, setHappyStudents] = useState([]);
    const [hsIndex, setHsIndex] = useState(0);
    const [summaryId, setSummaryId] = useState("");

    const refMap = useRef({}); // Store refs in an object

    // Function to get or create refs dynamically
    const getRef = (key) => {
        if (!refMap.current[key]) {
            refMap.current[key] = React.createRef();
        }
        refMap.current[key];
    };

    useEffect(() => {
        const titles = details?.map((item) => item?.title).filter(Boolean);
        setSummaryIndex(titles);
        titles?.map((item) => getRef(formatString(item?.title)))

        const fetchHappyStudents = async () => {
            try {
                const response = await httpService.get(`happy-students`);
                if (response?.data) {
                    setHappyStudents(response?.data);

                }
            } catch (error) {
                console.error("Error fetching happy students:", error);
            }
        }

        fetchHappyStudents();
    }, [details]);

    useEffect(() => {
        if (happyStudents.length === 0) return;

        const interval = setInterval(() => {
            setHsIndex((prevIndex) => (prevIndex === happyStudents.length - 1 ? 0 : prevIndex + 1));
        }, 1500);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [happyStudents]);

    // Function to format the title into an ID
    const formatString = (str) => str?.toLowerCase().replace(/\s+/g, "_");

    // Scroll to the selected section
    const handleScroll = (id, ind) => {
        const formattedId = formatString(id);
        //console.log(refMap);
        //refMap.current[formattedId]?.current?.scrollIntoView({ behavior: "smooth" });
        setSummaryId(formattedId);
        setActiveindex(ind);
    };


    const observer = useRef(null);

    // Observer setup
    useEffect(() => {
        const sections = summaryIndex.map((dTitle) => document.getElementById(formatString(dTitle)));

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sections.findIndex((section) => section.id === entry.target.id);
                        if (index !== -1) {
                            setActiveindex(index);
                        }
                    }
                });
            },
            {
                root: null, // viewport
                threshold: 0.5, // adjust as needed: 0.5 means 50% of the section is visible
            }
        );

        sections.forEach((section) => {
            if (section) observer.current.observe(section);
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [summaryIndex]);


    return (
        <div className="summary-container">
            <div className="sidebar">
                <div className="side-bar-options">
                    {summaryIndex?.map((dTitle, dIndex) => (
                        <div key={dIndex} className={`menu-item ${dIndex === activeIndex ? "active" : ""}`} onClick={() => handleScroll(formatString(dTitle), dIndex)}>{dTitle}</div>
                    ))}
                </div>
                <div id="happyStudents">
                    <HappyStudentsCarousel></HappyStudentsCarousel>
                </div>
                <SocialButtons toggleSocialSharePopup={toggleSocialSharePopup}></SocialButtons>
            </div>
            <div className="summary-content">
                <AlignMeThree details={details} summaryId={summaryId}></AlignMeThree>


                <AlignMeSix keywords={keywords} viewsCount={viewsCount} likeCount={likeCount} currentBlogId={currentBlogId}></AlignMeSix>
            </div>
            <div className="promotional-content">
                <AlignMeFour categories={categories} topBlogsList={topBlogsList}></AlignMeFour>

                <div className="new-container"></div>
                <div className="session-details">
                    <AlignMeTwo advertisement={advertisement} currentBlogId={currentBlogId} category={category}></AlignMeTwo>
                </div>
            </div>
        </div>
    )
}

export default SummaryContainer;