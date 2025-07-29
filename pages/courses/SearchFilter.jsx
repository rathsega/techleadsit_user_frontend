import { useState, useEffect } from "react";

const SearchFilter = ({ searchText, setSearchText, setSortByValue, totalCoursesCount }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 820;
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [sortBy, setSortBy] = useState("popularity")
    const handleShowSortPopup = (value) => {
        setShowSortPopup(!showSortPopup);
        if (value) {
            setSortByValue(value);
            setSortBy(value);
        }
    }

    // Optional: Update on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 820) {
                setIsSearchOpen(false); // reset if desktop
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSearch = () => {
        if (window.innerWidth < 820) {
            setIsSearchOpen(true);
        }
    };

    const closeSearch = () => {
        if (window.innerWidth < 820) {
            setIsSearchOpen(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-between">
            <h2 className="All-category-h">{totalCoursesCount} {totalCoursesCount == 1 ? " Course" : " Courses"}</h2>
            <div className="All-category-search-box">
                <div className="All-category-search">
                    {!isSearchOpen && (<button type="input" className="All-category-Search-option" aria-label="searchBox" onClick={toggleSearch} id="searchButton">
                        <i className="fa fa-search"></i>
                        <input className="All-category-Search-text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </button>)}
                    {isSearchOpen && (<div className="All-category-box" id="searchBox">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <i className="fa fa-times All-category-close" onClick={closeSearch} id="closeIcon"></i>
                    </div>)}
                </div>

                <div id="sortButton" onClick={() => handleShowSortPopup("")}>
                    <img src="/images/courses/sort-by.png" height="22" width="20" alt="Sort-by-arrows" />
                    <span className="All-category-Sort-text">Sort by</span>
                </div>
                {showSortPopup && <div className="All-category-Sort-text-popup" id="sortPopup">
                    <ul className="mb-0 ps-0">
                        <li className={`All-category-Sort-by-options mb-3 ${sortBy == "popularity" ? "list-style-type-disc" : "list-style-type-none"}`} onClick={() => handleShowSortPopup("popularity")}>Popularity</li>
                        <hr />
                        <li className={`All-category-Sort-by-options ${sortBy == "latest" ? "list-style-type-disc" : "list-style-type-none"}`} onClick={() => handleShowSortPopup("latest")}>Latest Courses</li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default SearchFilter;