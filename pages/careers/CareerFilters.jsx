import React, { useEffect, useState } from 'react';
import httpService from '../../services/httpService';

const experiences = [
    { _id: "0-3 Yrs", title: "0-3 Yrs" },
    { _id: "4-8 Yrs", title: "4-8 Yrs" },
    { _id: "9-12 Yrs", title: "9-12 Yrs" },
    { _id: "13+ Yrs", title: "13+ Yrs" }
];

const jobTypes = [
    { _id: "Full-Time", title: "Full-Time" },
    { _id: "Part-Time", title: "Part-Time" },
    { _id: "Contract", title: "Contract" },
    { _id: "Internship", title: "Internship" }
];

const CareerFilters = ({ filters, setFilters, openFilter, handleSidebar }) => {

    const [locations, setLocations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        location: '',
        experience: '',
        skill: '',
        jobTypes: []
    });

    // Fetch skills from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skills, locations] = await Promise.all([
                    httpService.get(`/careers/getActiveCareerSkills`),
                    httpService.get(`/careers/getAllLocations`),
                ]);

                setSkills(skills?.data || 0);
                setLocations(locations?.data || []);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(()=>{
        setFilters(selectedFilters)
    }, [selectedFilters?.location, selectedFilters?.skill, selectedFilters?.experience, selectedFilters?.jobTypes?.length])
    // Handlers
    const handleChange = (type, value, isCheckbox = false) => {
        //console.log(type, value, isCheckbox);
        setSelectedFilters(prev => {
            if (isCheckbox) {
                const updated = prev.jobTypes.includes(value)
                    ? prev.jobTypes.filter(v => v !== value)
                    : [...prev.jobTypes, value];
                return { ...prev, jobTypes: updated };
            }
            return { ...prev, [type]: value };
        });
    };

    return (
        <div className={`Main-Course-CP-FYNJ-Left-Part-Section sidebar-popup ${openFilter ? "open" : ""}`} id="sidebarPopup">
            <div className="Main-Course-CP-FYNJ-Left-Part-Filters sidebar-content">
                <h3 className="Main-Course-CP-FYNJ-Sidebar-Heading">Filters</h3>
                {/* Location */}
                <fieldset className="Main-Course-CP-FYNJ-Left-Part-Group">
                    <legend className="Main-Course-CP-FYNJ-Left-Part-Heading">Location</legend>
                    <label className="Main-Course-CP-FYNJ-Left-Part-Label"><input type="radio" className="Main-Course-CP-FYNJ-Left-Part-Input" name="location" onChange={() => handleChange('location', '')} checked={!selectedFilters.location} /> Any</label>
                    {locations.map(loc => (
                        <label key={loc} className="Main-Course-CP-FYNJ-Left-Part-Label">
                            <input type="radio" name="location" className="Main-Course-CP-FYNJ-Left-Part-Input" checked={selectedFilters.location === loc} onChange={() => handleChange('location', loc)} />
                            {loc}
                        </label>
                    ))}
                </fieldset>

                {/* Experience */}
                <fieldset className="Main-Course-CP-FYNJ-Left-Part-Group">
                    <legend className="Main-Course-CP-FYNJ-Left-Part-Heading">Work experience</legend>
                    <label className="Main-Course-CP-FYNJ-Left-Part-Label"><input type="radio" className="Main-Course-CP-FYNJ-Left-Part-Input" name="experience" onChange={() => handleChange('experience', '')} checked={!selectedFilters.experience} /> Any</label>
                    {experiences.map(exp => (
                        <label key={exp._id}  className="Main-Course-CP-FYNJ-Left-Part-Label">
                            <input type="radio" name="experience" className="Main-Course-CP-FYNJ-Left-Part-Input" checked={selectedFilters.experience === exp._id} onChange={() => handleChange('experience', exp._id)} />
                            {exp.title}
                        </label>
                    ))}
                </fieldset>

                {/* Skills */}
                <fieldset className="Main-Course-CP-FYNJ-Left-Part-Group">
                    <legend className="Main-Course-CP-FYNJ-Left-Part-Heading">Skills</legend>
                    <label className="Main-Course-CP-FYNJ-Left-Part-Label"><input type="radio" className="Main-Course-CP-FYNJ-Left-Part-Input" name="skill" onChange={() => handleChange('skill', '')} checked={!selectedFilters.skill} /> All</label>
                    {skills.map((skill, index) => (
                        <label key={index} className="Main-Course-CP-FYNJ-Left-Part-Label">
                            <input type="radio" name="skill" className="Main-Course-CP-FYNJ-Left-Part-Input" checked={selectedFilters.skill === skill?._id} onChange={() => handleChange('skill', skill?._id)} />
                            {skill?.title}
                        </label>
                    ))}
                </fieldset>

                {/* Job Types */}
                <fieldset className="Main-Course-CP-FYNJ-Left-Part-Group">
                    <legend className="Main-Course-CP-FYNJ-Left-Part-Heading">Job Type</legend>
                    {jobTypes.map(job => (
                        <label key={job._id} className="Main-Course-CP-FYNJ-Left-Part-Label">
                            <input type="checkbox" className="Main-Course-CP-FYNJ-Left-Part-Input" checked={selectedFilters.jobTypes.includes(job._id)} onChange={() => handleChange('jobTypes', job._id, true)} />
                            {job.title}
                        </label>
                    ))}
                </fieldset>

                {/* Buttons */}
                <div className="d-flex align-items-center justify-content-between">
                    <button className="Main-Course-CP-FYNJ-Close-Button" onClick={() => {setSelectedFilters({ location: '', experience: '', skill: '', jobTypes: [] }); handleSidebar()}}>Clear</button>
                    <button className="Main-Course-CP-FYNJ-Apply-Button" onClick={handleSidebar}>Apply</button>
                </div>

            </div>
        </div>
    )
}

export default CareerFilters;