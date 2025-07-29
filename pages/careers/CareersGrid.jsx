import React, { useCallback, useEffect, useState, useRef } from "react";
import CareerCard from "./CareerCard";
import StartYourJourney from "./StartYourJourney";
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import UpcomingBanner from "../../components/upcoming_banner";
import NoResultsFound from "../../components/no_results_found";

const CareersGrid = ({ searchTerm, filters }) => {

    const [careers, setCareers] = useState([])
    const [totalActiveCareersCount, setTotalActiveCareersCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [careersPerPage, setCareersPerPage] = useState(4);
    const { setLoading } = useLoader();

    const filterRef = useRef(null);

    const handleScroll = () => {
        if (filterRef.current) {
            const topPosition = filterRef.current.getBoundingClientRect().top + window.pageYOffset - 100; // 100px gap
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth',
            });
        }
    };

    const getActiveJobs = useCallback(async (page = 1, location, skill, workExperience, jobType) => {
        try {
            //console.log(filters);
            // setLoading(true)
            const response = await httpService.post('careers/getAllActiveCareers', {
                pageNumber: page,
                careersPerPage,
                searchText: searchTerm, // Or use your current filters
                location: location,
                workExperience: workExperience,
                jobType: jobType,
                skill: skill
            });
            // setLoading(false)
            if (response && response.data) {
                setCareers(response.data.careers);
                setTotalActiveCareersCount(response.data.totalActiveCareersCount);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
            }
        } catch (error) {
            // setLoading(false)
            console.error("Error fetching jobs:", error);
            // alert("Failed to get jobs");
        }
    }, [careersPerPage, searchTerm]);

    useEffect(() => {
        //console.log(filters);
        getActiveJobs(currentPage, filters?.location, filters?.skill, filters?.experience, filters?.jobTypes);
    }, [filters?.location, filters?.skill, filters?.experience, filters?.jobTypes?.length, currentPage, searchTerm])

    useEffect(() => {
        handleScroll();
    }, [handleScroll, currentPage]);

    const handlePageChange = (pageNum) => {
        if (pageNum !== currentPage) {
            setCurrentPage(pageNum);
        }
    };


    return (
        <div className="Main-Course-CP-FYNJ-Right-Part-Filters" ref={filterRef}>
            <>
                {careers?.map((job, index) => (
                    <React.Fragment key={index}>
                        <CareerCard data={job} />
                        {careers.length > 2 && index === 1 && <StartYourJourney />}
                    </React.Fragment>
                ))}

                {careers?.length == 0 && <NoResultsFound />}
                {careers?.length <= 2 && <StartYourJourney />}

            </>

            {totalPages > 1 && <div className="Main-Course-CP-FYNJ-pagination-container">
                <button
                    className={`Main-Course-CP-FYNJ-scroll-btn left ${currentPage === 1 ? 'inactive_btn' : 'active_btn'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ««
                </button>

                <div className="Main-Course-CP-FYNJ-pagination-scroll">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`Main-Course-CP-FYNJ-page-item ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    className={`Main-Course-CP-FYNJ-scroll-btn right ${currentPage === totalPages ? 'inactive_btn' : 'active_btn'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    »»
                </button>
            </div>}

        </div>
    )
}

export default CareersGrid;