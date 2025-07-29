'use client';

import React, { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import httpService from "../../services/httpService";
import { useSearchParams } from 'next/navigation';
import LiveChatButton from "../../components/LiveChatButton";

const SideFilters = ({ openForm, setCategory, setSubCategory, setSkillLevel, setCourseType, setCourseTracks, setCategoryName, setSubCategoryName, category, categoryName, clearSideFilterFlag }) => {
    const [filters, setFilters] = useState(null);
    const searchParams = useSearchParams();
  const subCategoryId = searchParams.get('subCategoryId');
  const subCategoryName = searchParams.get('subCategoryName');

    useEffect(() => {
        const fetchFilters = async () => {
            const response = await httpService.get("courses/getFilters");
            //console.log(response.data.filters);
            setFilters(response.data.filters);
        };
        fetchFilters();
    }, []);

    useEffect(()=>{
        setSubCategoryName(subCategoryName);
        setSubCategory(subCategoryId);
    }, [subCategoryId, subCategoryName])

    useEffect(() => {
            setCategory("");
            setSubCategory("");
            setCategoryName("");
            setSubCategoryName("");
        }, [clearSideFilterFlag]);

    const handleCategorySelect = (categoryId, categoryName) => {
        setCategory(categoryId);
        setCategoryName(categoryName);
        setSubCategoryName("");
        setSubCategory("");
        //console.log("Selected Category:", categoryId, categoryName);
    };

    const handleSubCategorySelect = (categoryId, subCategoryName) => {
        setSubCategory(categoryId);
        setSubCategoryName(subCategoryName);
        setCategory("");
        setCategoryName("");
        //console.log("Selected Category:", categoryId, subCategoryName);
    };

    const [isSkillLevelOpen, setIsSkillLevelOpen] = useState(false);
    const [isCourseTypeOpen, setIsCourseTypeOpen] = useState(false);
    const [isCourseTrackOpen, setIsCourseTrackOpen] = useState(false);

    const [selectedSkillLevel, setSelectedSkillLevel] = useState(null);
    const [selectedCourseType, setSelectedCourseType] = useState(null);
    const [selectedCourseTrack, setSelectedCourseTrack] = useState(null);

    const handleSelect = (value, type) => {
        if (type === "skillLevel") setSkillLevel(value);
        if (type === "courseType") setCourseType(value);
        if (type === "courseTrack") setCourseTracks(value);

        onSelect(value, type);
    };

    const toggleSkillLevelDropdown = () => {
        setIsSkillLevelOpen(!isSkillLevelOpen);
    };

    const toggleSCourseTypeDropdown = () => {
        setIsCourseTypeOpen(!isCourseTypeOpen);
    };

    const toggleCourseTrackDropdown = () => {
        setIsCourseTrackOpen(!isCourseTrackOpen);
    };

    const onSelect = (value, key) => {
        
    }

    return (
        <aside className="Sidebar-adj">
            <div className="Course-AC-sidebar">
                <CategoryFilter categories={filters?.categories} onSelect={handleCategorySelect} handleSubCategorySelect={handleSubCategorySelect} category={category} clearSideFilterFlag={clearSideFilterFlag}></CategoryFilter>

                <div className="Course-AC-dropdown-container">
                    <div className="Course-AC-dropdown">
                        <div className={`Course-AC-dropdown-toggle ${isSkillLevelOpen ? "open" : ""}`} onClick={toggleSkillLevelDropdown}>
                            Skill Level
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        {isSkillLevelOpen && (
                            <ul className="Course-AC-dropdown-menu open">
                                {filters?.skillLevels?.map((level) => (
                                    <li key={level} className={selectedSkillLevel === level ? "selected" : ""}>
                                        <input
                                            type="radio"
                                            name="skillLevel"
                                            id={level}
                                            value={level}
                                            onChange={() => handleSelect(level, 'skillLevel')}
                                        />
                                        <label htmlFor={level}>{level}</label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="Course-AC-dropdown-container">
                    <div className="Course-AC-dropdown">
                        <div className={`Course-AC-dropdown-toggle ${isCourseTypeOpen ? "open" : ""}`} onClick={toggleSCourseTypeDropdown}>
                            Course Type
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        {isCourseTypeOpen && (
                            <ul className="Course-AC-dropdown-menu open">
                                {filters?.courseTypes?.map((type) => (
                                    <li key={type} className={selectedCourseType === type ? "selected" : ""}>
                                        <input
                                            type="radio"
                                            name="courseType"
                                            id={type}
                                            value={type}
                                            onChange={() => handleSelect(type, 'courseType')}
                                        />
                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="Course-AC-dropdown-container">
                    <div className="Course-AC-dropdown">
                        <div className={`Course-AC-dropdown-toggle ${isCourseTrackOpen ? "open" : ""}`} onClick={toggleCourseTrackDropdown}>
                            Course Tracks
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        {isCourseTrackOpen && (
                            <ul className="Course-AC-dropdown-menu open">
                                {filters?.courseTracks?.map((track) => (
                                    <li key={track} className={selectedCourseTrack === track ? "selected" : ""}>
                                        <input
                                            type="radio"
                                            name="courseTracks"
                                            id={track}
                                            value={track}
                                            onChange={() => handleSelect(track, 'courseTrack')}
                                        />
                                        <label htmlFor={track}>{track}</label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="AC-have-que-section">
                    <h2 className="AC-have-que-heading">
                        Feeling Stuck ?
                    </h2>
                    <h2 className="blog-category-have-que-subheading">We are here to help You</h2>
                    <img src="/images/courses/AC-sidebar-enquiry-img.svg" loading="lazy" alt="have-questions-img"
                        className="img-fluid" width="300" height="188"
                        style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                    <LiveChatButton className="AC-live-chat"></LiveChatButton>
                    <button className="AC-request-a-call" onClick={() => {
                        openForm("Request A Call Back");
                    }}>Request a Call Back</button>
                </div>
            </div>
        </aside>
    )
}

export default SideFilters;