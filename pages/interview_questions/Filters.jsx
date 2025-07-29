import { useState, useEffect, useRef } from "react";
const Filters = ({ searchText, setSearchText, setSortByValue }) => {
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [sortBy, setSortBy] = useState("popularity")
    const [showMobileSearchbox, setShowMobileSearchBox] = useState(false);
    const sortRef = useRef(null);
    const handleShowSortPopup = (value) => {
        if (value) {
            setSortBy(value);
            setSortByValue(value);
        }
        setShowSortPopup(!showSortPopup);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the sortByPopup div
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowSortPopup(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

    }, []);

    return (
        <div className="d-flex align-items-center justify-content-between">
            <h2 className="Category-h">Categories</h2>
            <div className="d-flex align-items-center">
                <div className="blog-category-search">
                    <button className="Search-option" id="searchButton">
                        <i className="fa fa-search"></i>
                        <input className="Search-text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </button>
                    <div className="blog-Search-Box-MB">
                        { ! showMobileSearchbox && <i className="fa fa-search" onClick={() => setShowMobileSearchBox(!showMobileSearchbox)}></i>}
                        {
                            showMobileSearchbox && <div className="blog-category-box" id="searchBox">
                                <i className="fa fa-search"></i>
                                <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                <i className="fa fa-times blog-category-close" onClick={() => {setSearchText("");  setShowMobileSearchBox(!showMobileSearchbox)}} id="closeIcon"></i>
                            </div>
                        }
                    </div>
                </div>

                <div onClick={() => handleShowSortPopup("")} ref={sortRef} id="sortByPopup">
                    <img src="/images/blogs/sort-by.svg" height="22" width="20" alt="Sort-by-arrows" />
                    <span className="Sort-text">Sort by</span>
                </div>
                {showSortPopup && <div className="Sort-text-popup">
                    <ul className="mb-0 ps-0" style={{ transform: "translateX(10px)" }}>
                        <li className={`Sort-by-options mb-3 ${sortBy == "popularity" ? "list-style-type-disc" : "list-style-type-none"}`} onClick={() => handleShowSortPopup("popularity")}>Popularity</li>
                        <hr />
                        <li className={`Sort-by-options ${sortBy == "latest" ? "list-style-type-disc" : "list-style-type-none"}`} onClick={() => handleShowSortPopup("latest")}>Latest Posts</li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}
export default Filters;